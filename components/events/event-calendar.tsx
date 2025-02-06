'use client'
import {useState, useEffect, useCallback} from 'react'
import {Loader2, Plus, Edit, Trash2} from 'lucide-react'
import {getEvents, deleteEvent} from '@/app/actions'
import {formatCalendarDate} from '@/lib/helpers'
import {Card, CardContent, CardHeader, CardTitle} from '../ui/card'
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from '../ui/dialog'
import {Calendar} from '../ui/calendar'
import {Button} from '../ui/button'
import {EventForm} from './event-form'

import type {CalendarEvent} from '@/lib/types'

function EventItem({
  event,
  onEdit,
  onDelete,
}: {
  event: CalendarEvent
  onEdit: () => void
  onDelete: () => void
}) {
  return (
    <li className='flex items-center gap-2'>
      <div className='pt-1 text-sm font-medium'>{event.time}</div>
      <div className='flex flex-1 flex-col border-l pl-2'>
        <div className='truncate font-bold'>{event.title}</div>
        <div className='text-sm text-muted-foreground'>{event.description}</div>
      </div>
      <div className='flex space-x-2'>
        <Button variant='ghost' size='icon' className='size-4' onClick={onEdit}>
          <Edit className='size-3' />
          <span className='sr-only'>Edit event</span>
        </Button>
        <Button variant='ghost' size='icon' className='size-4 text-red-400' onClick={onDelete}>
          <Trash2 className='size-3' />
          <span className='sr-only'>Delete event</span>
        </Button>
      </div>
    </li>
  )
}

function EventList({
  events,
  onEditEvent,
  onDeleteEvent,
}: {
  events: CalendarEvent[]
  // eslint-disable-next-line no-unused-vars
  onEditEvent: (event: CalendarEvent) => void
  // eslint-disable-next-line no-unused-vars
  onDeleteEvent: (event: CalendarEvent) => void
}) {
  return events.length > 0 ? (
    <ul className='space-y-2'>
      {events.map((event) => (
        <EventItem
          key={event.id}
          event={event}
          onEdit={() => onEditEvent(event)}
          onDelete={() => onDeleteEvent(event)}
        />
      ))}
    </ul>
  ) : (
    <p className='text-muted-foreground'>No events scheduled for this day.</p>
  )
}

export function EventCalendar() {
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [date, setDate] = useState<Date>(new Date())
  const [isLoading, setIsLoading] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | undefined>(undefined)

  const fetchEvents = useCallback(async (selectedDate: Date) => {
    setIsLoading(true)
    try {
      const events = await getEvents(selectedDate.toISOString().split('T')[0])
      setEvents(events)
    } catch (error) {
      console.error('Error fetching events:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchEvents(date)
  }, [date, fetchEvents])

  const handleEventSaved = () => {
    setIsDialogOpen(false)
    setSelectedEvent(undefined)
    fetchEvents(date)
  }

  const handleEditEvent = (event: CalendarEvent) => {
    setSelectedEvent(event)
    setIsDialogOpen(true)
  }

  const handleDeleteEvent = async (event: CalendarEvent) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await deleteEvent(event.id)
        fetchEvents(date)
      } catch (error) {
        console.error('Error deleting event:', error)
      }
    }
  }

  return (
    <div className='grid gap-6 lg:grid-cols-[400px_1fr]'>
      <div className='space-y-4'>
        <Card className='p-4'>
          <Calendar
            mode='single'
            selected={date}
            onSelect={(newDate) => newDate && setDate(newDate)}
          />
        </Card>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className='w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600'>
              <Plus className='mr-0.5 size-4' />
              Add Event
            </Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
              <DialogTitle>{selectedEvent ? 'Edit Event' : 'Add New Event'}</DialogTitle>
            </DialogHeader>
            <EventForm
              event={selectedEvent}
              selectedDate={date}
              onEventSaved={handleEventSaved}
              onCancel={() => {
                setIsDialogOpen(false)
                setSelectedEvent(undefined)
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      <Card className='w-full max-w-md'>
        <CardHeader>
          <CardTitle>Events for {formatCalendarDate(date)}</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className='flex justify-center py-8'>
              <Loader2 className='size-6 animate-spin' />
            </div>
          ) : (
            <EventList
              events={events}
              onEditEvent={handleEditEvent}
              onDeleteEvent={handleDeleteEvent}
            />
          )}
        </CardContent>
      </Card>
    </div>
  )
}
