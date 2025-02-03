'use client'
import {SessionItem} from './session-item'

import type {SessionListProps} from '@/lib/types'

export function SessionList({sessions, onDeleteSession}: SessionListProps) {
  return sessions.length > 0 ? (
    <ul className='space-y-2'>
      {sessions.map((session) => (
        <SessionItem key={session.id} session={session} onDelete={() => onDeleteSession(session)} />
      ))}
    </ul>
  ) : (
    <p className='text-muted-foreground'>No Pomodoro sessions yet.</p>
  )
}
