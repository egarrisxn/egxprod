"use server";
import { createClient } from "@/utils/supabase/server";
// import { getUrlMetadata } from '@/lib/helpers'

export async function getUrlMetadata(
  url: string,
): Promise<{ title: string; favicon: string }> {
  const fallbackFaviconUrl = `https://s2.googleusercontent.com/s2/favicons?domain_url=${url}`;
  try {
    const response = await fetch("/metadata", {
      method: "POST",
      body: JSON.stringify({ url: url }),
    });
    const { title, favicon } = await response.json();
    return { title, favicon };
  } catch (error) {
    console.error(error);
    return { title: url, favicon: fallbackFaviconUrl };
  }
}

//!? Auth user utility
async function getUserData() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("User not authenticated");
  return user;
}

//! Get bookmarks
export async function getBookmarks() {
  const user = await getUserData();
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("bookmarks")
    .select()
    .eq("user_id", user?.id)
    .order("inserted_at", { ascending: false });
  if (error) {
    console.error("Error fetching bookmarks:", error);
    return [];
  }
  return data || [];
}

//! Add bookmark
export async function addBookmark(url: string) {
  const user = await getUserData();
  const supabase = await createClient();
  const { title, favicon } = await getUrlMetadata(url);
  const newBookmark = {
    title,
    url,
    image_url: favicon,
    user_id: user.id,
    inserted_at: new Date(),
  };
  const { data, error } = await supabase
    .from("bookmarks")
    .insert(newBookmark)
    .select();
  if (error) {
    console.error("Error adding bookmark:", error);
    throw new Error(error.message);
  }
  return data || [];
}

//! Update bookmark
export async function updateBookmark(id: number, title: string, url: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("bookmarks")
    .update({ title, url })
    .eq("id", id);
  if (error) {
    console.error("Error updating bookmark:", error);
    throw new Error(error.message);
  }
  return { success: true };
}

//! Delete bookmark
export async function deleteBookmark(id: number) {
  const supabase = await createClient();
  const { error } = await supabase.from("bookmarks").delete().eq("id", id);
  if (error) {
    console.error("Error deleting bookmark:", error);
    throw new Error(error.message);
  }
  return { success: true };
}
