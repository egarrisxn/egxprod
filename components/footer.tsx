import {ThemeSwitcher} from './theme-switcher'
import {Github} from 'lucide-react'

export default function Footer() {
  return (
    <footer className='border-t'>
      <div className='mx-auto flex max-w-7xl flex-row items-center justify-between px-2 py-8 sm:px-4 lg:px-8'>
        <div className='flex flex-row items-center justify-center gap-2'>
          <p className='text-center text-muted-foreground'> EG | {new Date().getFullYear()}</p>
          <ThemeSwitcher />
        </div>
        <div className='flex'>
          <a
            href='https://github.com/egarrisxn/egxprod'
            className='text-muted-foreground hover:text-foreground'
          >
            <span className='sr-only'>GitHub</span>
            <Github className='h-6 w-6' />
          </a>
        </div>
      </div>
    </footer>
  )
}
