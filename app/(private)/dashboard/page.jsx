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
    <div className='flex min-h-screen flex-col gap-16 pt-24'>
      <div className='absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80'>
        <div className='relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]' />
      </div>
      <PrivateHeader />
      <div className='mx-auto flex flex-col gap-4 px-6 pb-24 pt-4 sm:pb-40 lg:px-8 xl:flex-row 2xl:pb-24'>
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
              <CalendarView />
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
