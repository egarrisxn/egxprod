import {SessionTimer} from './session-timer'
import {SessionHistory} from './session-history'

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
