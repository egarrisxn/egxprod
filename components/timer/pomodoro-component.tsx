'use client'
import {useState, useEffect, useCallback} from 'react'
import {Trash2} from 'lucide-react'
import {addSession, completeSession, getSessions, deleteSession} from '@/app/actions/timer'
import {Card, CardContent, CardHeader, CardTitle, CardFooter} from '../ui/card'
import {Button} from '../ui/button'

export interface PomodoroSession {
  id: number
  mode: 'work' | 'shortBreak' | 'longBreak'
  duration: number
  started_at: string
  completed: boolean
}

export type SessionItemProps = {
  session: PomodoroSession
  onDelete: () => void
}

export type SessionListProps = {
  sessions: PomodoroSession[]
  // eslint-disable-next-line no-unused-vars
  onDeleteSession: (session: PomodoroSession) => void
}

const WORK_TIME = 25 * 60
const SHORT_BREAK = 5 * 60
const LONG_BREAK = 15 * 60
const CYCLES_BEFORE_LONG_BREAK = 4

export function SessionItem({session, onDelete}: SessionItemProps) {
  const formatSessionTime = (duration: number) => {
    return new Date(duration * 1000).toISOString().substring(14, 19)
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

export function SessionHistory() {
  const [sessions, setSessions] = useState<PomodoroSession[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
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

  const handleDeleteSession = async (session: PomodoroSession) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await deleteSession(session.id)
        setSessions((prev) => prev.filter((s) => s.id !== session.id))
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
        <SessionList sessions={sessions} onDeleteSession={handleDeleteSession} />
      </CardContent>
    </Card>
  )
}

export function SessionTimer() {
  const [timeLeft, setTimeLeft] = useState(WORK_TIME)
  const [isRunning, setIsRunning] = useState(false)
  const [mode, setMode] = useState<'work' | 'shortBreak' | 'longBreak'>('work')
  const [cycleCount, setCycleCount] = useState(0)
  const [sessionId, setSessionId] = useState<number | null>(null)

  const handleSessionEnd = useCallback(async () => {
    setIsRunning(false)
    if (sessionId) await completeSession(sessionId)
    if (mode === 'work') {
      if ((cycleCount + 1) % CYCLES_BEFORE_LONG_BREAK === 0) {
        setMode('longBreak')
        setTimeLeft(LONG_BREAK)
      } else {
        setMode('shortBreak')
        setTimeLeft(SHORT_BREAK)
      }
      setCycleCount((prev) => prev + 1)
    } else {
      setMode('work')
      setTimeLeft(WORK_TIME)
    }
  }, [mode, cycleCount, sessionId])

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000)
    } else if (timeLeft === 0) {
      handleSessionEnd()
    }
    return () => clearInterval(timer)
  }, [isRunning, timeLeft, handleSessionEnd])

  const startSession = async () => {
    setIsRunning(true)
    const session = await addSession(mode, timeLeft)
    if (session) setSessionId(session.id)
  }

  const resetTimer = () => {
    setIsRunning(false)
    setCycleCount(0)
    setMode('work')
    setTimeLeft(WORK_TIME)
    setSessionId(null)
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${minutes}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <Card className='w-full max-w-md text-center'>
      <CardHeader>
        <CardTitle
          className={`text-3xl font-bold ${mode === 'work' ? 'text-[#ff6961]' : mode === 'shortBreak' ? 'text-[#80ef80]' : 'text-[#a2bffe]'}`}
        >
          {mode === 'work' ? 'Work Session' : mode === 'shortBreak' ? 'Short Break' : 'Long Break'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='text-5xl font-semibold'>{formatTime(timeLeft)}</div>
        <div className='mt-6 flex justify-center gap-4'>
          <Button
            className='bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600'
            onClick={isRunning ? () => setIsRunning(false) : startSession}
          >
            {isRunning ? 'Pause Time' : 'Start Time'}
          </Button>
          <Button variant='outline' onClick={resetTimer}>
            Reset Time
          </Button>
        </div>
      </CardContent>
      <CardFooter>
        <p className='mx-auto max-w-80 text-wrap p-0.5 text-sm text-muted-foreground'>
          <span className='text-foreground'>Routine: </span> You will do 25 minutes on and 5 minutes
          off for three sessions, then 25 minutes on and 15 minutes off for one session.
        </p>
      </CardFooter>
    </Card>
  )
}

export function PomodoroTimer() {
  return (
    <div className='flex flex-col gap-6'>
      <section className='flex justify-center'>
        <SessionTimer />
      </section>

      <section className='flex justify-center'>
        <SessionHistory />
      </section>
    </div>
  )
}
