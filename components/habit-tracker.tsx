'use client'
import * as React from 'react'
import {Activity, Trash2} from 'lucide-react'
import {addHabit, getHabits, deleteHabit, logHabitDay, unlogHabitDay} from '@/app/actions/habit'
import {getLast365Days, getToday, groupDaysByMonth, calculateStreak} from '@/utils/helpers'
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter} from './ui/dialog'
import {Card, CardContent, CardHeader, CardTitle} from './ui/card'
import {Input} from './ui/input'
import {Badge} from './ui/badge'
import {Button} from './ui/button'

interface Habit {
  id: number
  user_id: string
  mode: 'filled' | 'empty'
  name: string
  created_at: string
  completed: string[]
  streak?: number
}

interface HabitTrackerProps {
  defaultHabits: Habit[]
}

function CreateHabit() {
  const [habitName, setHabitName] = React.useState('')
  const [error, setError] = React.useState<string | null>(null)
  const [open, setOpen] = React.useState(false)

  const handleCreateHabit = async () => {
    if (!habitName) return
    try {
      await addHabit(habitName)
      setHabitName('')
      setOpen(false)
    } catch (err) {
      setError('Failed to create habit')
      console.error(err)
    }
  }

  return (
    <div>
      <Button
        className='bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600'
        onClick={() => setOpen(true)}
      >
        Create Habit
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a New Habit</DialogTitle>
          </DialogHeader>
          <Input
            type='text'
            id='habit'
            name='habit'
            value={habitName}
            onChange={(e) => setHabitName(e.target.value)}
            className='w-full rounded-md border p-2'
            placeholder='Enter habit name'
            required
          />
          {error && <p className='text-red-500'>{error}</p>}
          <DialogFooter>
            <Button onClick={handleCreateHabit}>Save Habit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function HabitCard({habits: initialHabits}: {habits: Habit[]}) {
  const [habits, setHabits] = React.useState<Habit[]>(initialHabits)
  const last365Days = React.useMemo(() => getLast365Days(), [])
  const groupedDays = React.useMemo(() => groupDaysByMonth(last365Days), [last365Days])

  const toggleDay = async (habitId: number, day: string) => {
    try {
      const habit = habits.find((h) => h.id === habitId)
      if (!habit) return

      const isCompleted = habit.completed.includes(day)
      const updatedCompleted = isCompleted
        ? await unlogHabitDay(habitId, day)
        : await logHabitDay(habitId, day)

      if (updatedCompleted) {
        const streak = calculateStreak(updatedCompleted)
        setHabits((prevHabits) =>
          prevHabits.map((h: Habit) =>
            h.id === habitId ? {...h, completed: updatedCompleted, streak} : h,
          ),
        )
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

export default function HabitTracker({defaultHabits}: HabitTrackerProps) {
  const [habits, setHabits] = React.useState<Habit[]>(defaultHabits)

  React.useEffect(() => {
    async function fetchHabits() {
      try {
        const data = await getHabits()
        if (Array.isArray(data)) {
          setHabits(data)
        } else {
          console.error('Unexpected data structure from getHabits:', data)
        }
      } catch (error) {
        console.error('Error fetching habits:', error)
      }
    }
    if (defaultHabits.length === 0) {
      fetchHabits()
    }
  }, [defaultHabits])

  return (
    <section className='w-full max-w-4xl p-2'>
      <div className='flex w-full flex-col rounded-lg border bg-card p-4 shadow-lg dark:border-foreground'>
        <div className='flex items-center justify-between pb-4'>
          <div className='flex items-center gap-4'>
            <Activity className='size-8 text-gray-500 dark:text-gray-400' />
            <h1 className='text-2xl font-semibold'>Habit Tracker</h1>
          </div>
          <CreateHabit />
        </div>
        <HabitCard habits={habits} />
      </div>
    </section>
  )
}
