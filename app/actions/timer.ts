'use server'
import {createClient} from '@/lib/supabase/server'

export async function getSessions() {
  const supabase = await createClient()
  const {
    data: {user},
  } = await supabase.auth.getUser()

  const {data, error} = await supabase
    .from('timer')
    .select('*')
    .eq('user_id', user?.id)
    .order('started_at', {ascending: false})

  if (error) {
    throw new Error(error.message)
  }
  return data || []
}

export async function addSession(mode: 'work' | 'shortBreak' | 'longBreak', duration: number) {
  const supabase = await createClient()
  const {
    data: {user},
  } = await supabase.auth.getUser()

  const {data, error} = await supabase
    .from('timer')
    .insert([
      {
        user_id: user?.id,
        mode,
        duration,
        started_at: new Date(),
        completed: false,
      },
    ])
    .select()

  if (error) {
    console.error('Error adding timer session:', error)
    return null
  }
  return data[0]
}

export async function completeSession(id: number) {
  const supabase = await createClient()
  const {
    data: {user},
  } = await supabase.auth.getUser()

  const {error} = await supabase
    .from('timer')
    .update({completed: true})
    .eq('id', id)
    .eq('user_id', user?.id)

  if (error) {
    throw new Error(error.message)
  }
  return true
}

export async function deleteSession(id: number) {
  const supabase = await createClient()

  const {error} = await supabase.from('timer').delete().eq('id', id)

  if (error) {
    throw new Error(error.message)
  }
  return true
}
