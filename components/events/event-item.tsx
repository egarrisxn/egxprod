'use client'
import {Button} from '../ui/button'
import {format, parse} from 'date-fns'
import {Edit, Trash2} from 'lucide-react'
import type {EventItemProps} from '@/lib/types'

export function EventItem({event, onEdit, onDelete}: EventItemProps) {
  const formatEventTime = (time: string) => {
    const date = parse(time, 'HH:mm:ss', new Date())
    return format(date, 'h:mm a')
  }

  return (
    <li className='flex flex-row items-center gap-2'>
      <div className='flex pt-1'>
        <div className='text-sm font-medium'>{formatEventTime(event.time)}</div>
      </div>
      <div className='flex flex-1 flex-col border-l pl-2'>
        <div className='flex-1 truncate font-bold'>{event.title}</div>
        <div className='text-sm text-muted-foreground'>{event.description}</div>
      </div>
      <div className='flex space-x-2'>
        <Button variant='ghost' size='icon' onClick={onEdit}>
          <Edit className='h-4 w-4' />
          <span className='sr-only'>Edit event</span>
        </Button>
        <Button variant='ghost' size='icon' onClick={onDelete}>
          <Trash2 className='h-4 w-4' />
          <span className='sr-only'>Delete event</span>
        </Button>
      </div>
    </li>
  )
}
