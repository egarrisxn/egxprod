'use server'
import {createClient} from '@/utils/supabase/server'
import {revalidatePath} from 'next/cache'

export interface Note {
  id: number
  user_id: string
  thought: string
  inserted_at: Date
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
