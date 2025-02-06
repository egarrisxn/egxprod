import {Activity} from 'lucide-react'
import {CreateHabit} from './create-habit'
import {HabitCard} from './habit-card'

export function HabitTracker() {
  return (
    <section className='max-w-4xl p-2'>
      <div className='flex w-full flex-col rounded-lg border bg-card p-4 shadow-lg dark:border-foreground'>
        <div className='flex items-center justify-between pb-4'>
          <div className='flex items-center gap-4'>
            <Activity className='size-8 text-gray-500 dark:text-gray-400' />
            <h1 className='text-2xl font-semibold'>Habit Tracker</h1>
          </div>
          <CreateHabit />
        </div>
        <HabitCard />
      </div>
    </section>
  )
}
