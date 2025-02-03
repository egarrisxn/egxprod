import {Trash2} from 'lucide-react'
import {Button} from '../ui/button'

import type {TimerSessionProps} from '@/lib/types'

export function SessionItem({timerSession, onDelete}: TimerSessionProps) {
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
            timerSession.mode === 'work'
              ? 'text-[#ff6961]'
              : timerSession.mode === 'shortBreak'
                ? 'text-[#80ef80]'
                : 'text-[#a2bffe]'
          }`}
        >
          {timerSession.mode === 'work'
            ? 'Work'
            : timerSession.mode === 'shortBreak'
              ? 'Short Break'
              : 'Long Break'}
        </div>
      </div>
      <div className='flex flex-1 flex-col border-l pl-2'>
        <div className='text-sm text-muted-foreground'>
          {formatSessionTime(timerSession.duration)} |{' '}
          {new Date(timerSession.started_at).toLocaleString()}
        </div>
      </div>
      <div className='flex space-x-2'>
        <Button
          variant='ghost'
          size='icon'
          className='size-4'
          onClick={() => onDelete(timerSession.id)}
        >
          <Trash2 className='size-3' />
          <span className='sr-only'>Delete Timer Session</span>
        </Button>
      </div>
    </li>
  )
}
