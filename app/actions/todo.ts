"use server";
import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";

import type { Todo } from "@/utils/types";

//!? Auth user utility
async function getUserData() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("User not authenticated");
  return user;
}

//! Get to-dos
export async function getTodos(): Promise<Todo[]> {
  const user = await getUserData();
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("todos")
    .select("*")
    .eq("user_id", user.id);

  if (error) throw new Error(`Error fetching todos: ${error.message}`);
  return data || [];
}

//! Add new to-do item
export async function addTodo(formData: FormData) {
  const user = await getUserData();
  const supabase = await createClient();
  const { error } = await supabase
    .from("todos")
    .insert([
      {
        user_id: user.id,
        task: formData.get("task") as string,
        is_complete: false,
        inserted_at: new Date(),
      },
    ])
    .select();

  if (error) throw new Error(`Error adding todo: ${error.message}`);
  revalidatePath("/private/dashboard");
}

//! Edit to-do item
export async function editTodo(todo: Todo) {
  const user = await getUserData();
  const supabase = await createClient();
  const { error } = await supabase
    .from("todos")
    .update({ task: todo.task })
    .eq("id", todo.id)
    .eq("user_id", user.id)
    .select();

  if (error) throw new Error(`Error editing todo: ${error.message}`);
}

//! Delete to-do item
export async function deleteTodo(id: number) {
  const supabase = await createClient();
  const { error } = await supabase.from("todos").delete().eq("id", id);
  if (error) throw new Error(`Error deleting todo: ${error.message}`);
  revalidatePath("/private/dashboard");
}

//! Delete completed to-do items
export async function deleteCompletedTodos() {
  const supabase = await createClient();
  const { error } = await supabase
    .from("todos")
    .delete()
    .eq("is_complete", true);

  if (error)
    throw new Error(`Error deleting completed todos: ${error.message}`);
  revalidatePath("/private/dashboard");
}

//! Delete all to-do items
export async function deleteAllTodos() {
  const user = await getUserData();
  const supabase = await createClient();
  const { error } = await supabase
    .from("todos")
    .delete()
    .eq("user_id", user.id);

  if (error) throw new Error(`Error deleting all todos: ${error.message}`);
  revalidatePath("/private/dashboard");
}

//! Mark to-do item as complete/incomplete
export async function onCheckChange(todo: Todo) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("todos")
    .update({ is_complete: !todo.is_complete })
    .eq("id", todo.id)
    .select();

  if (error) throw new Error(`Error changing todo status: ${error.message}`);
  revalidatePath("/private/dashboard");
}
