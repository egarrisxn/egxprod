'use server'
import {createClient} from '@/lib/supabase/server'
import {getUser} from '../actions/auth'

export async function getTimerSessions() {
  const supabase = await createClient()
  const user = await getUser()

  const {data, error} = await supabase
    .from('timer')
    .select('*')
    .eq('user_id', user?.id)
    .order('started_at', {ascending: false})

  if (error) {
    console.error('Error fetching Timer sessions:', error)
    return []
  }
  return data
}

export async function addTimerSession(mode: 'work' | 'shortBreak' | 'longBreak', duration: number) {
  const supabase = await createClient()
  const user = await getUser()

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

export async function completeTimerSession(id: number) {
  const supabase = await createClient()
  const user = await getUser()

  const {error} = await supabase
    .from('timer')
    .update({completed: true})
    .eq('id', id)
    .eq('user_id', user?.id)

  if (error) {
    console.error('Error completing timer session:', error)
    return false
  }
  return true
}

export async function deleteTimerSession(sessionId: number) {
  const supabase = await createClient()
  const user = await getUser()

  const {error} = await supabase.from('timer').delete().eq('id', sessionId).eq('user_id', user?.id)

  if (error) {
    console.error('Error deleting timer session:', error)
    return false
  }
  return true
}
