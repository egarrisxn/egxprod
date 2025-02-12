"use server";
import { createClient } from "@/utils/supabase/server";

//!? Auth user utility
async function getUserData() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("User not authenticated");
  return user;
}

//! Get calendar events
export async function getEvents(date: string) {
  const user = await getUserData();
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("date", date)
    .eq("user_id", user.id)
    .order("time", { ascending: true });
  if (error) {
    console.error("Error fetching events:", error);
    return [];
  }
  return data;
}

//! Add calendar event
export async function addEvent(
  title: string,
  description: string,
  time: string,
  date: string,
) {
  const user = await getUserData();
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("events")
    .insert([{ user_id: user.id, title, description, time, date }])
    .select();
  if (error) {
    console.error("Error adding event:", error);
    return null;
  }
  return data[0];
}

//! Update calendar event
export async function updateEvent(
  id: number,
  title: string,
  description: string,
  time: string,
) {
  const user = await getUserData();
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("events")
    .update({ title, description, time })
    .eq("id", id)
    .eq("user_id", user.id)
    .select();
  if (error) {
    console.error("Error updating event:", error);
    return null;
  }
  return data[0];
}

//! Delete calendar event
export async function deleteEvent(id: number) {
  const user = await getUserData();
  const supabase = await createClient();
  const { error } = await supabase
    .from("events")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);
  if (error) {
    console.error("Error deleting event:", error);
    return false;
  }
  return true;
}
