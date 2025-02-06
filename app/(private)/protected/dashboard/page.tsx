import {PomodoroTimer} from '@/components/timer/pomodoro-timer'
import {TodoList} from '@/components/todos/todo-list'
import {QuickNotes} from '@/components/notes/quick-notes'
import {CalendarEvents} from '@/components/events/calendar-events'
import {HabitTracker} from '@/components/habits/habit-tracker'

import {Metadata} from 'next'

export const metadata: Metadata = {
  title: 'Dashboard',
}

export default function DashboardPage() {
  return (
    <div className='mx-auto mb-24 flex flex-col gap-4 px-2 sm:px-6 xl:flex-row'>
      {/* Pomodoro Timer, Todo List, & Notes Section */}
      <div className='flex flex-col gap-4 sm:min-w-96'>
        <PomodoroTimer />
        <TodoList />
        <QuickNotes />
      </div>

      {/* Calendar Events & Habit Tracker Section */}
      <div className='flex flex-col gap-4 sm:min-w-96'>
        <CalendarEvents />
        <HabitTracker />
      </div>
    </div>
  )
}
