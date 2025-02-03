'use server'
import {createClient} from '@/lib/supabase/server'
import {getUser} from '../actions/auth'

export async function getEvents(date: string) {
  const supabase = await createClient()
  const user = await getUser()

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
  const user = await getUser()

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
  const user = await getUser()

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
  const user = await getUser()

  const {error} = await supabase.from('events').delete().eq('id', id).eq('user_id', user?.id)

  if (error) {
    console.error('Error deleting event:', error)
    return false
  }
  return true
}
