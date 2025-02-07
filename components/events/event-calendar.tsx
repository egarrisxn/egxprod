'use client'
import * as React from 'react'
import {Loader2, Plus, Edit, Trash2} from 'lucide-react'
import {getEvents, addEvent, updateEvent, deleteEvent} from '@/app/actions/event'
import {formatCalendarDate} from '@/lib/helpers'
import {Card, CardContent, CardHeader, CardTitle} from '../ui/card'
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from '../ui/dialog'
import {Calendar} from '../ui/calendar'
import {Button} from '../ui/button'
import {Input} from '../ui/input'
import {Label} from '../ui/label'

interface Event {
  id: number
  user_id: string
  title: string
  description: string
  time: string
  date: string
}

function EventForm({
  event,
  selectedDate,
  onEventSaved,
  onCancel,
}: {
  event?: Event
  selectedDate: Date
  onEventSaved: () => void
  onCancel: () => void
}) {
  const [title, setTitle] = React.useState(event?.title || '')
  const [description, setDescription] = React.useState(event?.description || '')
  const [time, setTime] = React.useState(event?.time || '12:00')
  const [isLoading, setIsLoading] = React.useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (title && description && time) {
      setIsLoading(true)
      try {
        if (event) {
          await updateEvent(event.id, title, description, time)
        } else {
          await addEvent(title, description, time, selectedDate.toISOString().split('T')[0])
        }
        onEventSaved()
      } catch (error) {
        console.error('Error saving event:', error)
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <div className='space-y-2'>
        <Label htmlFor='title'>Title</Label>
        <Input
          id='title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder='Event title'
          required
        />
      </div>
      <div className='space-y-2'>
        <Label htmlFor='time'>Time</Label>
        <Input
          id='time'
          type='time'
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />
      </div>
      <div className='space-y-2'>
        <Label htmlFor='description'>Description</Label>
        <Input
          id='description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder='Event description'
        />
      </div>
      <div className='flex justify-end space-x-2'>
        <Button type='button' variant='outline' onClick={onCancel} disabled={isLoading}>
          Cancel
        </Button>
        <Button type='submit' disabled={isLoading}>
          {isLoading ? 'Saving' : event ? 'Update Event' : 'Save Event'}
        </Button>
      </div>
    </form>
  )
}

function EventItem({
  event,
  onEdit,
  onDelete,
}: {
  event: Event
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
  events: Event[]
  // eslint-disable-next-line no-unused-vars
  onEditEvent: (event: Event) => void
  // eslint-disable-next-line no-unused-vars
  onDeleteEvent: (event: Event) => void
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
  const [events, setEvents] = React.useState<Event[]>([])
  const [date, setDate] = React.useState<Date>(new Date())
  const [isLoading, setIsLoading] = React.useState(false)
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)
  const [selectedEvent, setSelectedEvent] = React.useState<Event | undefined>(undefined)

  const fetchEvents = React.useCallback(async (selectedDate: Date) => {
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

  React.useEffect(() => {
    fetchEvents(date)
  }, [date, fetchEvents])

  const handleEventSaved = () => {
    setIsDialogOpen(false)
    setSelectedEvent(undefined)
    fetchEvents(date)
  }

  const handleEditEvent = (event: Event) => {
    setSelectedEvent(event)
    setIsDialogOpen(true)
  }

  const handleDeleteEvent = async (event: Event) => {
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
