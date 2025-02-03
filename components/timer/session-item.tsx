import {Trash2} from 'lucide-react'
import {Button} from '../ui/button'

import type {SessionItemProps} from '@/lib/types'

export function SessionItem({session, onDelete}: SessionItemProps) {
  const formatSessionTime = (duration: number) => {
    const minutes = Math.floor(duration / 60)
    const seconds = duration % 60
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <li className='flex flex-row items-center gap-2'>
      <div className='flex pt-1'>
        <div
          className={`text-sm font-medium ${
            session.mode === 'work'
              ? 'text-[#ff6961]'
              : session.mode === 'shortBreak'
                ? 'text-[#80ef80]'
                : 'text-[#a2bffe]'
          }`}
        >
          {session.mode === 'work'
            ? 'Work'
            : session.mode === 'shortBreak'
              ? 'Short Break'
              : 'Long Break'}
        </div>
      </div>
      <div className='flex flex-1 flex-col border-l pl-2'>
        <div className='text-sm text-muted-foreground'>
          {formatSessionTime(session.duration)} | {new Date(session.started_at).toLocaleString()}
        </div>
      </div>
      <div className='flex space-x-2'>
        <Button variant='ghost' size='icon' className='size-4' onClick={onDelete}>
          <Trash2 className='size-3' />
          <span className='sr-only'>Delete Timer Session</span>
        </Button>
      </div>
    </li>
  )
}
