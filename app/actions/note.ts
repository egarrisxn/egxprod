'use server'
import {revalidatePath} from 'next/cache'
import {createClient} from '@/lib/supabase/server'

import type {Note} from '@/lib/types'

export async function getNotes(): Promise<Note[]> {
  const supabase = await createClient()
  const {
    data: {user},
  } = await supabase.auth.getUser()
  const {data, error} = await supabase.from('notes').select('*').eq('user_id', user?.id)
  if (error) {
    throw new Error(error.message)
  }
  return data || []
}

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
  revalidatePath('/private/dashboard')
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
  revalidatePath('/private/dashboard')
}
