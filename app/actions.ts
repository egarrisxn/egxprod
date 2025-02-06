'use server'
import {redirect} from 'next/navigation'
import {revalidatePath} from 'next/cache'
import {createClient} from '@/lib/supabase/server'
import {CreateUserInput, LoginUserInput} from '@/lib/user-schema'
import {calculateStreak} from '@/lib/helpers'

import type {Todo, Note} from '@/lib/types'

// Utility function for fetching the authenticated user
async function getUserData() {
  const supabase = await createClient()
  const {
    data: {user},
  } = await supabase.auth.getUser()
  if (!user) throw new Error('User not authenticated')
  return user
}

// Sign up user
export async function signUpUser({
  data,
  emailRedirectTo,
}: {
  data: CreateUserInput
  emailRedirectTo?: string
}) {
  const supabase = await createClient()
  const {error} = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {emailRedirectTo},
  })
  if (error) throw new Error(`Error signing up: ${error.message}`)
  return redirect('/signin')
}

// Sign in user
export async function signInUser(data: LoginUserInput) {
  const supabase = await createClient()
  const {error} = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  })
  if (error) throw new Error(`Error signing in: ${error.message}`)
  return redirect('/protected/dashboard')
}

// Sign out user
export async function signOutUser() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  return redirect('/')
}

// Get user sessions
export async function getSessions() {
  const user = await getUserData()
  const supabase = await createClient()
  const {data, error} = await supabase
    .from('timer')
    .select('*')
    .eq('user_id', user.id)
    .order('started_at', {ascending: false})

  if (error) throw new Error(`Error fetching sessions: ${error.message}`)
  return data || []
}

// Add a new session
export async function addSession(mode: 'work' | 'shortBreak' | 'longBreak', duration: number) {
  const user = await getUserData()
  const supabase = await createClient()
  const {data, error} = await supabase
    .from('timer')
    .insert([{user_id: user.id, mode, duration, started_at: new Date(), completed: false}])
    .select()

  if (error) {
    console.error('Error adding session:', error)
    return null
  }
  return data ? data[0] : null
}

// Complete a session
export async function completeSession(id: number) {
  const user = await getUserData()
  const supabase = await createClient()
  const {error} = await supabase
    .from('timer')
    .update({completed: true})
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) {
    console.error('Error completing session:', error)
    return false
  }
  return true
}

// Delete a session
export async function deleteSession(id: number) {
  const user = await getUserData()
  const supabase = await createClient()
  const {error} = await supabase.from('timer').delete().eq('id', id).eq('user_id', user.id)

  if (error) {
    console.error('Error deleting session:', error)
    return false
  }
  return true
}

// Get todos
export async function getTodos(): Promise<Todo[]> {
  const user = await getUserData()
  const supabase = await createClient()
  const {data, error} = await supabase.from('todos').select('*').eq('user_id', user.id)

  if (error) throw new Error(`Error fetching todos: ${error.message}`)
  return data || []
}

// Add a new todo
export async function addTodo(formData: FormData) {
  const user = await getUserData()
  const supabase = await createClient()
  const {error} = await supabase
    .from('todos')
    .insert([
      {
        user_id: user.id,
        task: formData.get('task') as string,
        is_complete: false,
        inserted_at: new Date(),
      },
    ])
    .select()

  if (error) throw new Error(`Error adding todo: ${error.message}`)
  revalidatePath('/private/dashboard')
}

// Edit an existing todo
export async function editTodo(todo: Todo) {
  const user = await getUserData()
  const supabase = await createClient()
  const {error} = await supabase
    .from('todos')
    .update({task: todo.task})
    .eq('id', todo.id)
    .eq('user_id', user.id)
    .select()

  if (error) throw new Error(`Error editing todo: ${error.message}`)
}

// Delete a todo
export async function deleteTodo(id: number) {
  const supabase = await createClient()
  const {error} = await supabase.from('todos').delete().eq('id', id)
  if (error) throw new Error(`Error deleting todo: ${error.message}`)
  revalidatePath('/private/dashboard')
}

// Delete completed todos
export async function deleteCompletedTodos() {
  const supabase = await createClient()
  const {error} = await supabase.from('todos').delete().eq('is_complete', true)

  if (error) throw new Error(`Error deleting completed todos: ${error.message}`)
  revalidatePath('/private/dashboard')
}

// Delete all todos
export async function deleteAllTodos() {
  const user = await getUserData()
  const supabase = await createClient()
  const {error} = await supabase.from('todos').delete().eq('user_id', user.id)

  if (error) throw new Error(`Error deleting all todos: ${error.message}`)
  revalidatePath('/private/dashboard')
}

// Mark todo as complete/incomplete
export async function onCheckChange(todo: Todo) {
  const supabase = await createClient()
  const {error} = await supabase
    .from('todos')
    .update({is_complete: !todo.is_complete})
    .eq('id', todo.id)
    .select()

  if (error) throw new Error(`Error changing todo status: ${error.message}`)
  revalidatePath('/private/dashboard')
}

// Get notes
export async function getNotes(): Promise<Note[]> {
  const user = await getUserData()
  const supabase = await createClient()
  const {data, error} = await supabase.from('notes').select('*').eq('user_id', user.id)

  if (error) throw new Error(`Error fetching notes: ${error.message}`)
  return data || []
}

// Add a new note
export async function addNote(formData: FormData) {
  const user = await getUserData()
  const supabase = await createClient()
  const {error} = await supabase
    .from('notes')
    .insert([
      {user_id: user.id, thought: formData.get('thought') as string, inserted_at: new Date()},
    ])
    .select()

  if (error) throw new Error(`Error adding note: ${error.message}`)
  revalidatePath('/private/dashboard')
}

// Edit an existing note
export async function editNote(note: Note) {
  const user = await getUserData()
  const supabase = await createClient()
  const {error} = await supabase
    .from('notes')
    .update({thought: note.thought})
    .eq('id', note.id)
    .eq('user_id', user.id)
    .select()

  if (error) throw new Error(`Error editing note: ${error.message}`)
}

// Delete a note
export async function deleteNote(id: number) {
  const supabase = await createClient()
  const {error} = await supabase.from('notes').delete().eq('id', id)

  if (error) throw new Error(`Error deleting note: ${error.message}`)
  revalidatePath('/private/dashboard')
}

// Get events
export async function getEvents(date: string) {
  const user = await getUserData()
  const supabase = await createClient()
  const {data, error} = await supabase
    .from('events')
    .select('*')
    .eq('date', date)
    .eq('user_id', user.id)
    .order('time', {ascending: true})

  if (error) {
    console.error('Error fetching events:', error)
    return []
  }
  return data
}

// Add a new event
export async function addEvent(title: string, description: string, time: string, date: string) {
  const user = await getUserData()
  const supabase = await createClient()
  const {data, error} = await supabase
    .from('events')
    .insert([{user_id: user.id, title, description, time, date}])
    .select()

  if (error) {
    console.error('Error adding event:', error)
    return null
  }
  return data[0]
}

// Update an existing event
export async function updateEvent(id: number, title: string, description: string, time: string) {
  const user = await getUserData()
  const supabase = await createClient()
  const {data, error} = await supabase
    .from('events')
    .update({title, description, time})
    .eq('id', id)
    .eq('user_id', user.id)
    .select()

  if (error) {
    console.error('Error updating event:', error)
    return null
  }
  return data[0]
}

// Delete an event
export async function deleteEvent(id: number) {
  const user = await getUserData()
  const supabase = await createClient()
  const {error} = await supabase.from('events').delete().eq('id', id).eq('user_id', user.id)

  if (error) {
    console.error('Error deleting event:', error)
    return false
  }
  return true
}

// Get habits
export async function getHabits() {
  const user = await getUserData()
  const supabase = await createClient()
  const {data, error} = await supabase.from('habits').select('*').eq('user_id', user?.id)

  if (error) {
    console.error('Error fetching habits:', error)
    throw new Error(error.message)
  }
  return data || []
}

// Add a new habit
export async function addHabit(name: string) {
  const user = await getUserData()
  const supabase = await createClient()
  const {data, error} = await supabase
    .from('habits')
    .insert([{user_id: user.id, name, created_at: new Date().toISOString()}])
    .select()

  if (error) {
    console.error('Error adding habit:', error)
    return null
  }
  return data[0]
}

// Delete a habit
export async function deleteHabit(id: number) {
  const user = await getUserData()
  const supabase = await createClient()
  const {error} = await supabase.from('habits').delete().eq('id', id).eq('user_id', user.id)

  if (error) {
    console.error('Error deleting habit:', error)
    return false
  }
  return true
}

// Log a habit day
export async function logHabitDay(id: number, date: string) {
  const supabase = await createClient()
  const {data: habit, error: fetchError} = await supabase
    .from('habits')
    .select('completed')
    .eq('id', id)
    .single()

  if (fetchError || !habit) {
    console.error('Error fetching habit:', fetchError)
    return null
  }

  const updatedCompleted = [...new Set([...habit.completed, date])]
  const newStreak = calculateStreak(updatedCompleted)

  const {error} = await supabase
    .from('habits')
    .update({completed: updatedCompleted, streak: newStreak})
    .eq('id', id)

  if (error) {
    console.error('Error logging habit:', error)
    return null
  }
  return updatedCompleted
}

// Unlog a habit day
export async function unlogHabitDay(id: number, date: string) {
  const supabase = await createClient()
  const {data: habit, error: fetchError} = await supabase
    .from('habits')
    .select('completed')
    .eq('id', id)
    .single()

  if (fetchError || !habit) {
    console.error('Error fetching habit:', fetchError)
    return null
  }

  const updatedCompleted = habit.completed.filter((d: string) => d !== date)
  const {error} = await supabase.from('habits').update({completed: updatedCompleted}).eq('id', id)

  if (error) {
    console.error('Error unlogging habit:', error)
    return null
  }
  return updatedCompleted
}
