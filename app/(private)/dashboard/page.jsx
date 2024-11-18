import {createClient} from '@/lib/supabase/server'
import {redirect} from 'next/navigation'
import {List, Files, Calendar} from 'lucide-react'
import PrivateHeader from '@/components/private-header'
import TodoList from '@/components/todos/todo-list'
import NoteList from '@/components/notes/note-list'
import CalendarView from '@/components/calendar/calendar-view'

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: {user},
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect('/login')
  }

  return (
    <div className='flex flex-col gap-8'>
      <section className='w-full'>
        <PrivateHeader />
      </section>
      <div className='mx-auto flex flex-col gap-4 lg:flex-row'>
        <div className='flex flex-col sm:min-w-96'>
          <section className='max-w-2xl p-2'>
            <div className='flex flex-col rounded-lg border p-4 shadow-lg'>
              <div className='flex items-center gap-4 pb-4'>
                <Files className='size-8 text-gray-500 dark:text-gray-400' />
                <h1 className='text-2xl font-semibold'>Notes</h1>
              </div>
              <NoteList />
            </div>
          </section>
          <section className='max-w-2xl p-2'>
            <div className='flex flex-col rounded-lg border p-4 shadow-lg'>
              <div className='flex items-center gap-4 pb-4'>
                <List className='size-8 text-gray-500 dark:text-gray-400' />
                <h1 className='text-2xl font-semibold'>To-Do List</h1>
              </div>
              <TodoList />
            </div>
          </section>
        </div>
        <div className='flex flex-1'>
          <section className='max-w-4xl p-2'>
            <div className='flex flex-col rounded-lg border p-4 shadow-lg'>
              <div className='flex items-center gap-4 pb-4'>
                <Calendar className='size-8 text-gray-500 dark:text-gray-400' />
                <h1 className='text-2xl font-semibold'>Calendar</h1>
              </div>
              <CalendarView />
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
