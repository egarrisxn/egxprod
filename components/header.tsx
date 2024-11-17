import {Button} from './ui/button'
import Link from 'next/link'
import HeaderAuth from './header-auth'

export default function Header() {
  return (
    <header className='h-20 w-full border-b border-b-foreground/10'>
      <nav className='mx-auto flex h-full max-w-7xl items-center justify-between p-4 text-sm'>
        <div>
          <Link href='/' className='text-2xl font-semibold'>
            egxprod
          </Link>
        </div>
        <ul className='flex items-center space-x-4'>
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
