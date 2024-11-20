import {Button} from './ui/button'
import {HeaderAuth} from './header-auth'
import Link from 'next/link'

export default function Header() {
  return (
    <header className='fixed top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm'>
      <nav className='mx-auto flex w-full max-w-screen-3xl justify-center px-1 py-4 xs:justify-between sm:px-4 lg:px-8'>
        <Link href='/' className='hidden items-center pl-1 xs:flex lg:flex'>
          <span className='bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-xl font-bold text-transparent'>
            .prod
          </span>
        </Link>
        <div className='flex items-center sm:gap-2'>
          <Button asChild variant='link'>
            <Link href='/'>Home</Link>
          </Button>
          <HeaderAuth />
        </div>
      </nav>
    </header>
  )
}
