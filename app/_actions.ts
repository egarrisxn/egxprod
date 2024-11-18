'use server'
import {createClient} from '@/lib/supabase/server'
import {CreateUserInput, LoginUserInput} from '@/lib/user-schema'
import {redirect} from 'next/navigation'
import {revalidatePath} from 'next/cache'
import type {Todo, Note} from '@/lib/types'

//! AUTHENTICATION

export async function signUpUser({
  data,
  emailRedirectTo,
}: {
  data: CreateUserInput
  emailRedirectTo?: string
}) {
  const supabase = await createClient()
  const result = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      emailRedirectTo,
    },
  })
  return JSON.stringify(result)
}

export async function signInUser(data: LoginUserInput) {
  const supabase = await createClient()
  const result = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  })
  return JSON.stringify(result)
}

export async function signOutUser() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  return redirect('/')
}

//! TODO LIST

export async function fetchTodos(): Promise<Todo[]> {
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

//! Notes

export async function addNote(formData: FormData) {
  const supabase = await createClient()

  const {
    data: {user},
  } = await supabase.auth.getUser()

  const {error} = await supabase
    .from('notes')
    .insert([
      {
        user_id: user?.id,
        thought: formData.get('thought') as string,
        inserted_at: new Date(),
      },
    ])
    .select()

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/')
}

export async function editNote(note: Note) {
  const supabase = await createClient()

  const {
    data: {user},
  } = await supabase.auth.getUser()

  const {error} = await supabase
    .from('notes')
    .update({thought: note.thought})
    .eq('id', note.id)
    .eq('user_id', user?.id)
    .select()

  if (error) {
    throw new Error(error.message)
  }
}

export async function deleteNote(id: number) {
  const supabase = await createClient()

  const {error} = await supabase.from('notes').delete().eq('id', id)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/')
}

//! Calendar Events

export async function getEvents(date: string) {
  const supabase = await createClient()

  const {
    data: {user},
  } = await supabase.auth.getUser()

  const {data, error} = await supabase
    .from('events')
    .select('*')
    .eq('date', date)
    .eq('user_id', user?.id)
    .order('time', {ascending: true})

  if (error) {
    console.error('Error fetching events:', error)
    return []
  }

  return data
}

export async function addEvent(title: string, description: string, time: string, date: string) {
  const supabase = await createClient()

  const {
    data: {user},
  } = await supabase.auth.getUser()

  const {data, error} = await supabase
    .from('events')
    .insert({user_id: user?.id, title, description, time, date})
    .select()

  if (error) {
    console.error('Error adding event:', error)
    return null
  }

  return data[0]
}

export async function updateEvent(id: number, title: string, description: string, time: string) {
  const supabase = await createClient()

  const {
    data: {user},
  } = await supabase.auth.getUser()

  const {data, error} = await supabase
    .from('events')
    .update({title, description, time})
    .eq('id', id)
    .eq('user_id', user?.id)
    .select()

  if (error) {
    console.error('Error updating event:', error)
    return null
  }

  return data[0]
}

export async function deleteEvent(id: number) {
  const supabase = await createClient()

  const {
    data: {user},
  } = await supabase.auth.getUser()

  const {error} = await supabase.from('events').delete().eq('id', id).eq('user_id', user?.id)

  if (error) {
    console.error('Error deleting event:', error)
    return false
  }

  return true
}
