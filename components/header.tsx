import {Button} from './ui/button'
import Link from 'next/link'
import HeaderAuth from './header-auth'

export default function Header() {
  return (
    <header className='h-20 w-full border-b-2 border-b-foreground/10 shadow-xl'>
      <nav className='mx-auto flex h-full max-w-7xl items-center justify-between p-4 text-sm'>
        <div>
          <Link href='/' className='shadow-txt text-xl font-semibold sm:text-2xl'>
            egxprod
          </Link>
        </div>
        <ul className='flex items-center gap-1 sm:gap-2'>
          <li>
            <Button asChild variant='link'>
              <Link href='/' className='x'>
                Home
              </Link>
            </Button>
          </li>
          <HeaderAuth />
        </ul>
      </nav>
    </header>
  )
}
