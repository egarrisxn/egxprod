'use client'
import * as React from 'react'
import {addSession, completeSession} from '@/app/actions/timer'
import {formatSessionTimer} from '@/lib/helpers'
import {Card, CardContent, CardHeader, CardTitle, CardFooter} from '../ui/card'
import {Button} from '../ui/button'

const WORK_TIME = 25 * 60
const SHORT_BREAK = 5 * 60
const LONG_BREAK = 15 * 60
const CYCLES_BEFORE_LONG_BREAK = 4

export function SessionTimer() {
  const [timeLeft, setTimeLeft] = React.useState(WORK_TIME)
  const [isRunning, setIsRunning] = React.useState(false)
  const [mode, setMode] = React.useState<'work' | 'shortBreak' | 'longBreak'>('work')
  const [cycleCount, setCycleCount] = React.useState(0)
  const [sessionId, setSessionId] = React.useState<number | null>(null)

  const handleSessionEnd = React.useCallback(async () => {
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

  React.useEffect(() => {
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
        <div className='text-5xl font-semibold'>{formatSessionTimer(timeLeft)}</div>
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
