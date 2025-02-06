'use client'
import {useState, useEffect, useMemo} from 'react'
import {Trash2} from 'lucide-react'
import {deleteHabit, getHabits, logHabitDay, unlogHabitDay} from '@/app/actions'
import {getLast365Days, getToday, groupDaysByMonth, calculateStreak} from '@/lib/helpers'
import {Card, CardContent, CardHeader, CardTitle} from '../ui/card'
import {Badge} from '../ui/badge'
import {Button} from '../ui/button'

import {HabitTracker} from '@/lib/types'

export function HabitCard() {
  const [habits, setHabits] = useState<HabitTracker[]>([])
  const last365Days = useMemo(() => getLast365Days(), [])
  const groupedDays = useMemo(() => groupDaysByMonth(last365Days), [last365Days])

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getHabits()
        if (Array.isArray(data)) {
          const habitsWithStreaks = data.map((habit) => ({
            ...habit,
            completed: habit.completed || [],
            streak: habit.streak || 0,
          }))
          setHabits(habitsWithStreaks)
        } else {
          console.error('Unexpected data structure from getHabits:', data)
        }
      } catch (error) {
        console.error('Error fetching habits:', error)
      }
    }
    fetchData()
  }, [])

  const toggleDay = async (habitId: number, day: string) => {
    setHabits((prev) =>
      prev.map((habit) => {
        if (habit.id === habitId) {
          const isCompleted = habit.completed.includes(day)
          const updatedCompleted = isCompleted
            ? habit.completed.filter((d) => d !== day)
            : [...habit.completed, day]

          const newStreak = calculateStreak(updatedCompleted)

          return {...habit, completed: updatedCompleted, streak: newStreak}
        }
        return habit
      }),
    )

    try {
      const isCompleted = habits.find((h) => h.id === habitId)?.completed.includes(day)
      if (isCompleted) {
        await unlogHabitDay(habitId, day)
      } else {
        await logHabitDay(habitId, day)
      }
    } catch (error) {
      console.error('Error updating habit log:', error)
    }
  }

  return (
    <div className='grid grid-cols-1 gap-6'>
      {habits.map((habit) => (
        <Card key={habit.id}>
          <CardHeader className='pb-5'>
            <div className='flex items-center justify-between gap-2 sm:gap-0'>
              <div className='flex flex-row flex-wrap items-center gap-1.5'>
                <CardTitle>{habit.name}</CardTitle>
                <Badge className='rounded-md border-none px-1.5 tracking-tighter'>
                  {habit.streak} DAY STREAK
                </Badge>
              </div>
              <Button
                variant='ghost'
                size='icon'
                className='size-4 text-red-400'
                onClick={async () => {
                  await deleteHabit(habit.id)
                  setHabits((prev) => prev.filter((h) => h.id !== habit.id))
                }}
              >
                <Trash2 className='size-3' />
              </Button>
            </div>
          </CardHeader>
          <CardContent className='w-full'>
            {Object.entries(groupedDays).map(([month, days]) => (
              <div key={month} className='flex flex-row flex-wrap items-center gap-1'>
                <div className='w-full max-w-12 text-sm font-medium tracking-tighter'>{month}</div>
                <div className='flex flex-row flex-wrap gap-1'>
                  {days.map((day) => (
                    <div
                      key={day}
                      className={`size-4 cursor-pointer rounded ${
                        habit.completed.includes(day)
                          ? 'bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600'
                          : 'bg-slate-600'
                      } ${getToday(day) ? 'border border-foreground' : ''}`}
                      onClick={() => toggleDay(habit.id, day)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
