import {Button} from './ui/button'
import {HeaderAuth} from './header-auth'
import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
  return (
    <header className='fixed top-0 z-50 w-full border-b bg-background/80 backdrop-blur-lg'>
      <nav className='mx-auto flex w-full max-w-screen-3xl justify-center px-2 py-4 xs:justify-between sm:px-4 lg:px-8'>
        <Link href='/' className='hidden items-center pl-1 xs:flex'>
          <Image src='/favicon-32x32.png' alt='nav-icon' width={32} height={32} />
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
