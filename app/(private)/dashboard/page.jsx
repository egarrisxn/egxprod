import {List, Files, Calendar, Clock} from 'lucide-react'
import {NoteList} from '@/components/notes/note-list'
import {TodoList} from '@/components/todos/todo-list'
import {EventCalendar} from '@/components/events/event-calendar'
import {PomodoroTimer} from '@/components/timer/pomodoro-timer'

export default function DashboardPage() {
  return (
    <div className='mx-auto mb-24 flex flex-col gap-4 px-2 sm:px-6 xl:flex-row'>
      {/* Todo List & Notes Section */}
      <div className='flex flex-col gap-4 sm:min-w-96'>
        {/* Todo List */}
        <section className='max-w-2xl p-2'>
          <div className='flex flex-col rounded-lg border bg-card p-4 shadow-lg dark:border-foreground'>
            <div className='flex items-center gap-4 pb-4'>
              <List className='size-8 text-gray-500 dark:text-gray-400' />
              <h1 className='text-2xl font-semibold'>To-Do List</h1>
            </div>
            <TodoList />
          </div>
        </section>

        {/* Notes */}
        <section className='max-w-2xl p-2'>
          <div className='flex flex-col rounded-lg border bg-card p-4 shadow-lg dark:border-foreground'>
            <div className='flex items-center gap-4 pb-4'>
              <Files className='size-8 text-gray-500 dark:text-gray-400' />
              <h1 className='text-2xl font-semibold'>Notes</h1>
            </div>
            <NoteList />
          </div>
        </section>
      </div>

      {/* Timer & History Section */}
      <div className='flex sm:min-w-96'>
        {/* Pomodoro Timer */}
        <section className='max-w-2xl p-2'>
          <div className='flex flex-col rounded-lg border bg-card p-4 shadow-lg dark:border-foreground'>
            <div className='flex items-center gap-4 pb-4'>
              <Clock className='size-8 text-gray-500 dark:text-gray-400' />
              <h1 className='text-2xl font-semibold'>Pomodoro Timer</h1>
            </div>
            <PomodoroTimer />
          </div>
        </section>
      </div>

      {/* Calendar & Event Section */}
      <div className='flex'>
        {/* Event Calendar */}
        <section className='max-w-4xl p-2'>
          <div className='flex flex-col rounded-lg border bg-card p-4 shadow-lg dark:border-foreground'>
            <div className='flex items-center gap-4 pb-4'>
              <Calendar className='size-8 text-gray-500 dark:text-gray-400' />
              <h1 className='text-2xl font-semibold'>Calendar</h1>
            </div>
            <EventCalendar />
          </div>
        </section>
      </div>
    </div>
  )
}
