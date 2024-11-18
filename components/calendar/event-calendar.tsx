'use client'
import {useState, useEffect, useCallback} from 'react'
import {getEvents, deleteEvent} from '@/app/_actions'
import {Calendar} from '../ui/calendar'
import {Button} from '../ui/button'
import {Card, CardContent, CardHeader, CardTitle} from '../ui/card'
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from '../ui/dialog'
import {Loader2, Plus} from 'lucide-react'
import {format} from 'date-fns'
import {EventForm} from './event-form'
import {EventList} from './event-list'
import type {Event} from '@/lib/types'

export default function EventCalendar() {
  const [date, setDate] = useState<Date>(new Date())
  const [events, setEvents] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<Event | undefined>(undefined)

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
            className='rounded-md border'
          />
        </Card>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className='w-full'>
              <Plus className='mr-2 h-4 w-4' />
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
          <CardTitle>Events for {format(date, 'MMMM d, yyyy')}</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className='flex justify-center py-8'>
              <Loader2 className='h-6 w-6 animate-spin' />
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
