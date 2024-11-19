import {Button} from './ui/button'
import Link from 'next/link'
import HeaderAuth from './header-auth'

export default function Header() {
  return (
    <nav className='fixed top-0 z-50 flex w-full items-center justify-between border-b bg-background/80 px-2 py-4 backdrop-blur-sm sm:px-4 lg:px-8'>
      <Link href='/' className='flex items-center'>
        <span className='bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-xl font-bold text-transparent'>
          egxprod
        </span>
      </Link>
      <div className='flex items-center sm:gap-2'>
        <Button asChild variant='link'>
          <Link href='/' className='x'>
            Home
          </Link>
        </Button>
        <HeaderAuth />
      </div>
    </nav>
  )
}
