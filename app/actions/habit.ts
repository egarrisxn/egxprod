"use server";
import { createClient } from "@/utils/supabase/server";
// import {calculateStreak} from '@/lib/helpers'

//!? Helper
const calculateStreak = (completedDays: string[]): number => {
  if (!completedDays.length) return 0;
  const sortedDays = [...completedDays].sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime(),
  );
  let streak = 0;
  let prevDate = new Date(sortedDays[0]);
  for (const day of sortedDays) {
    const currentDate = new Date(day);
    const difference =
      (prevDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24);
    if (difference === 1) {
      streak++;
    } else if (difference > 1) {
      break;
    }
    prevDate = currentDate;
  }
  return streak + 1;
};

//!? Auth user utility
async function getUserData() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("User not authenticated");
  return user;
}

//! Get habits
export async function getHabits() {
  const user = await getUserData();
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("habits")
    .select("*")
    .eq("user_id", user?.id);
  if (error) {
    console.error("Error fetching habits:", error);
    throw new Error(error.message);
  }
  return data || [];
}

//! Add habit
export async function addHabit(name: string) {
  const user = await getUserData();
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("habits")
    .insert([{ user_id: user.id, name, created_at: new Date().toISOString() }])
    .select();
  if (error) {
    console.error("Error adding habit:", error);
    return null;
  }
  return data[0];
}

//! Delete habit
export async function deleteHabit(id: number) {
  const user = await getUserData();
  const supabase = await createClient();
  const { error } = await supabase
    .from("habits")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);
  if (error) {
    console.error("Error deleting habit:", error);
    return false;
  }
  return true;
}

// //! Log a habit day
// export async function logHabitDay(id: number, date: string) {
//   const supabase = await createClient()
//   const {data: habit, error: fetchError} = await supabase
//     .from('habits')
//     .select('completed')
//     .eq('id', id)
//     .single()
//   if (fetchError || !habit) {
//     console.error('Error fetching habit:', fetchError)
//     return null
//   }
//   const updatedCompleted = [...new Set([...habit.completed, date])]
//   const newStreak = calculateStreak(updatedCompleted)
//   const {error} = await supabase
//     .from('habits')
//     .update({completed: updatedCompleted, streak: newStreak})
//     .eq('id', id)
//   if (error) {
//     console.error('Error logging habit:', error)
//     return null
//   }
//   return updatedCompleted
// }

// //! Unlog a habit day
// export async function unlogHabitDay(id: number, date: string) {
//   const supabase = await createClient()
//   const {data: habit, error: fetchError} = await supabase
//     .from('habits')
//     .select('completed')
//     .eq('id', id)
//     .single()
//   if (fetchError || !habit) {
//     console.error('Error fetching habit:', fetchError)
//     return null
//   }
//   const updatedCompleted = habit.completed.filter((d: string) => d !== date)
//   const {error} = await supabase.from('habits').update({completed: updatedCompleted}).eq('id', id)
//   if (error) {
//     console.error('Error unlogging habit:', error)
//     return null
//   }
//   return updatedCompleted
// }

//! Log a habit day
export async function logHabitDay(
  id: number,
  date: string,
): Promise<string[] | null> {
  const supabase = await createClient();
  const { data: habit, error: fetchError } = await supabase
    .from("habits")
    .select("completed")
    .eq("id", id)
    .single();

  if (fetchError || !habit) {
    console.error("Error fetching habit:", fetchError);
    return null;
  }

  const updatedCompleted = [...new Set([...habit.completed, date])];
  const newStreak = calculateStreak(updatedCompleted);

  const { error } = await supabase
    .from("habits")
    .update({ completed: updatedCompleted, streak: newStreak })
    .eq("id", id);

  if (error) {
    console.error("Error logging habit:", error);
    return null;
  }

  return updatedCompleted;
}

//! Unlog a habit day
export async function unlogHabitDay(
  id: number,
  date: string,
): Promise<string[] | null> {
  const supabase = await createClient();
  const { data: habit, error: fetchError } = await supabase
    .from("habits")
    .select("completed")
    .eq("id", id)
    .single();

  if (fetchError || !habit) {
    console.error("Error fetching habit:", fetchError);
    return null;
  }

  const updatedCompleted = habit.completed.filter((d: string) => d !== date);

  const { error } = await supabase
    .from("habits")
    .update({ completed: updatedCompleted })
    .eq("id", id);

  if (error) {
    console.error("Error unlogging habit:", error);
    return null;
  }

  return updatedCompleted;
}
