import {Clock} from 'lucide-react'
import {SessionTimer} from './session-timer'
import {SessionHistory} from './session-history'

export function PomodoroTimer() {
  return (
    <section className='max-w-2xl p-2'>
      <div className='flex flex-col rounded-lg border bg-card p-4 shadow-lg dark:border-foreground'>
        <div className='flex items-center gap-4 pb-4'>
          <Clock className='size-8 text-gray-500 dark:text-gray-400' />
          <h1 className='text-2xl font-semibold'>Pomodoro Timer</h1>
        </div>
        <div className='flex flex-col gap-6'>
          <div className='flex justify-center'>
            <SessionTimer />
          </div>
          <div className='flex justify-center'>
            <SessionHistory />
          </div>
        </div>
      </div>
    </section>
  )
}
