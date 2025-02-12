"use server";
import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";

import type { Note } from "@/utils/types";

//!? Auth user utility
async function getUserData() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("User not authenticated");
  return user;
}

//! Get notes
export async function getNotes(): Promise<Note[]> {
  const user = await getUserData();
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("notes")
    .select("*")
    .eq("user_id", user.id);

  if (error) throw new Error(`Error fetching notes: ${error.message}`);
  return data || [];
}

//! Add note
export async function addNote(formData: FormData) {
  const user = await getUserData();
  const supabase = await createClient();
  const { error } = await supabase
    .from("notes")
    .insert([
      {
        user_id: user.id,
        thought: formData.get("thought") as string,
        inserted_at: new Date(),
      },
    ])
    .select();

  if (error) throw new Error(`Error adding note: ${error.message}`);
  revalidatePath("/private/dashboard");
}

//! Edit note
export async function editNote(note: Note) {
  const user = await getUserData();
  const supabase = await createClient();
  const { error } = await supabase
    .from("notes")
    .update({ thought: note.thought })
    .eq("id", note.id)
    .eq("user_id", user.id)
    .select();

  if (error) throw new Error(`Error editing note: ${error.message}`);
}

//! Delete note
export async function deleteNote(id: number) {
  const supabase = await createClient();
  const { error } = await supabase.from("notes").delete().eq("id", id);

  if (error) throw new Error(`Error deleting note: ${error.message}`);
  revalidatePath("/private/dashboard");
}
