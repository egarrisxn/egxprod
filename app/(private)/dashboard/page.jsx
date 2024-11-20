import {NoteList} from '@/components/notes/note-list'
import {TodoList} from '@/components/todos/todo-list'
import {EventCalendar} from '@/components/events/event-calendar'
import {List, Files, Calendar} from 'lucide-react'

export default function DashboardPage() {
  return (
    <div className='mx-auto mb-24 flex flex-col gap-4 px-2 sm:px-6 xl:flex-row'>
      <div className='order-1 flex flex-col gap-4 sm:min-w-96 lg:order-2 lg:flex-row lg:justify-between xl:order-1 xl:flex-col xl:justify-normal'>
        <section className='max-w-2xl flex-1 p-2'>
          <div className='flex flex-col rounded-lg border bg-card p-4 shadow-lg dark:border-foreground'>
            <div className='flex items-center gap-4 pb-4'>
              <Files className='size-8 text-gray-500 dark:text-gray-400' />
              <h1 className='text-2xl font-semibold'>Notes</h1>
            </div>
            <NoteList />
          </div>
        </section>
        <section className='max-w-2xl p-2'>
          <div className='flex flex-col rounded-lg border bg-card p-4 shadow-lg dark:border-foreground'>
            <div className='flex items-center gap-4 pb-4'>
              <List className='size-8 text-gray-500 dark:text-gray-400' />
              <h1 className='text-2xl font-semibold'>To-Do List</h1>
            </div>
            <TodoList />
          </div>
        </section>
      </div>
      <div className='order-2 flex flex-1 lg:order-1 xl:order-2'>
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
