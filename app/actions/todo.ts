'use server'
import {revalidatePath} from 'next/cache'
import {createClient} from '@/lib/supabase/server'

import type {Todo} from '@/lib/types'

export async function getTodos(): Promise<Todo[]> {
  const supabase = await createClient()
  const {
    data: {user},
  } = await supabase.auth.getUser()

  const {data, error} = await supabase.from('todos').select('*').eq('user_id', user?.id)

  if (error) {
    throw new Error(error.message)
  }
  return data || []
}

export async function addTodo(formData: FormData) {
  const supabase = await createClient()
  const {
    data: {user},
  } = await supabase.auth.getUser()

  const {error} = await supabase
    .from('todos')
    .insert([
      {
        user_id: user?.id,
        task: formData.get('task') as string,
        is_complete: false,
        inserted_at: new Date(),
      },
    ])
    .select()

  if (error) {
    throw new Error(error.message)
  }
  revalidatePath('/')
}

export async function editTodo(todo: Todo) {
  const supabase = await createClient()
  const {
    data: {user},
  } = await supabase.auth.getUser()

  const {error} = await supabase
    .from('todos')
    .update({task: todo.task})
    .eq('id', todo.id)
    .eq('user_id', user?.id)
    .select()

  if (error) {
    throw new Error(error.message)
  }
}

export async function deleteTodo(id: number) {
  const supabase = await createClient()

  const {error} = await supabase.from('todos').delete().eq('id', id)

  if (error) {
    throw new Error(error.message)
  }
  revalidatePath('/')
}

export async function deleteCompletedTodos() {
  const supabase = await createClient()

  const {error} = await supabase.from('todos').delete().eq('is_complete', true)

  if (error) {
    throw new Error(error.message)
  }
  revalidatePath('/')
}

export async function deleteAllTodos() {
  const supabase = await createClient()
  const {
    data: {user},
  } = await supabase.auth.getUser()

  const {error} = await supabase.from('todos').delete().eq('user_id', user?.id)

  if (error) {
    throw new Error(error.message)
  }
  revalidatePath('/')
}

export async function onCheckChange(todo: Todo) {
  const supabase = await createClient()

  const {error} = await supabase
    .from('todos')
    .update({is_complete: !todo?.is_complete})
    .eq('id', todo?.id)
    .select()

  if (error) {
    throw new Error(error.message)
  }
  revalidatePath('/')
}
