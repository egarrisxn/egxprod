'use client'
import * as React from 'react'
import {Trash2} from 'lucide-react'
import {getSessions, deleteSession} from '@/app/actions/timer'
import {formatSessionHistory} from '@/utils/helpers'
import {Card, CardContent, CardHeader, CardTitle} from '../ui/card'
import {Button} from '../ui/button'

interface Timer {
  id: number
  user_id: string
  mode: 'work' | 'shortBreak' | 'longBreak'
  duration: number
  started_at: string
  completed: boolean
}

export function SessionHistory() {
  const [sessions, setSessions] = React.useState<Timer[]>([])
  const [loading, setLoading] = React.useState<boolean>(false)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    async function fetchData() {
      setLoading(true)
      try {
        const data = await getSessions()
        setSessions(data)
        setError(null)
      } catch (err) {
        console.error(err)
        setError('Failed to load sessions.')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleDeleteSession = async (sessionId: number) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await deleteSession(sessionId)
        setSessions((prev) => prev.filter((s) => s.id !== sessionId))
      } catch (error) {
        console.error('Error deleting session:', error)
      }
    }
  }

  return (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle>Recent Sessions</CardTitle>
      </CardHeader>
      <CardContent>
        {loading && <p>Loading sessions...</p>}
        {error && <p className='text-red-500'>{error}</p>}
        {!loading && !error && sessions.length === 0 && <p>No sessions available.</p>}

        {sessions.length > 0 ? (
          <ul className='space-y-2'>
            {sessions.map((session) => (
              <li key={session.id} className='flex items-center gap-2'>
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
                <div className='flex flex-1 flex-col border-l pl-2'>
                  <div className='text-sm text-muted-foreground'>
                    {formatSessionHistory(session.duration)} |{' '}
                    {new Date(session.started_at).toLocaleString()}
                  </div>
                </div>
                <div className='flex space-x-2'>
                  <Button
                    variant='ghost'
                    size='icon'
                    className='size-4 text-red-400'
                    onClick={() => handleDeleteSession(session.id)}
                  >
                    <Trash2 className='size-3' />
                    <span className='sr-only'>Delete Timer Session</span>
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        ) : null}
      </CardContent>
    </Card>
  )
}
