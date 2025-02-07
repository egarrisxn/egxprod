'use server'
import {createClient} from '@/lib/supabase/server'

//!? Auth user utility
async function getUserData() {
  const supabase = await createClient()
  const {
    data: {user},
  } = await supabase.auth.getUser()
  if (!user) throw new Error('User not authenticated')
  return user
}

//! Get pomodoro timer sessions
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

//! Add pomodoro timer session
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

//! Complete pomodoro timer session
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

//! Delete pomodoro timer session
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
