import {Github} from 'lucide-react'
import {TimeDisplay} from './time-display'
import {ModeToggle} from './mode-toggle'

export default function Footer() {
  return (
    <footer className='w-full border-t'>
      <div className='container mx-auto flex items-center justify-between p-4 sm:p-6 lg:p-8'>
        <div className='flex flex-row items-center gap-2'>
          <a
            href='https://github.com/egarrisxn/xprod'
            className='text-muted-foreground hover:text-foreground'
          >
            <span className='sr-only'>GitHub</span>
            <Github className='size-5' />
          </a>
          <p className='text-muted-foreground'> EG | {new Date().getFullYear()}</p>
        </div>

        <div className='flex flex-row items-center gap-2 text-muted-foreground'>
          <TimeDisplay />
          <ModeToggle />
        </div>
      </div>
    </footer>
  )
}

;<div className='mx-auto flex max-w-7xl flex-row items-center justify-between px-3 py-6 sm:px-4 md:py-8 lg:px-8'></div>
