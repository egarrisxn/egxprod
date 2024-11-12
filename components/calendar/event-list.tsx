'use client'
import {EventItem} from './event-item'

export interface Event {
  id: number
  user_id: string
  title: string
  description: string
  time: string
  date: string
}

export interface EventListProps {
  events: Event[]
  onEditEvent: (event: Event) => void
  onDeleteEvent: (event: Event) => void
}

export function EventList({events, onEditEvent, onDeleteEvent}: EventListProps) {
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
