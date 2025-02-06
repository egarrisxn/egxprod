'use server'
import {createClient} from '@/lib/supabase/server'
import {calculateStreak} from '@/lib/helpers'

export async function getHabits() {
  const supabase = await createClient()
  const {
    data: {user},
  } = await supabase.auth.getUser()
  const {data, error} = await supabase.from('habits').select('*').eq('user_id', user?.id)
  if (error) {
    console.error('Error fetching habits:', error)
    return []
  }
  return data
}

export async function addHabit(name: string) {
  const supabase = await createClient()
  const {
    data: {user},
  } = await supabase.auth.getUser()
  const {data, error} = await supabase
    .from('habits')
    .insert([
      {
        user_id: user?.id,
        name,
        created_at: new Date().toISOString(),
      },
    ])
    .select()
  if (error) {
    console.error('Error adding event:', error)
    return null
  }
  return data[0]
}

export async function deleteHabit(id: number) {
  const supabase = await createClient()
  const {
    data: {user},
  } = await supabase.auth.getUser()
  const {error} = await supabase.from('habits').delete().eq('id', id).eq('user_id', user?.id)
  if (error) {
    console.error('Error deleting habit:', error)
    return false
  }
  return true
}

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
