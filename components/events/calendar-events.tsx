import {Calendar} from 'lucide-react'
import {EventCalendar} from './event-calendar'

export default function CalendarEvents() {
  return (
    <section className='max-w-4xl p-2'>
      <div className='flex flex-col rounded-lg border bg-card p-4 shadow-lg dark:border-foreground'>
        <div className='flex items-center gap-4 pb-4'>
          <Calendar className='size-8 text-gray-500 dark:text-gray-400' />
          <h1 className='text-2xl font-semibold'>Calendar Events</h1>
        </div>
        <EventCalendar />
      </div>
    </section>
  )
}
