import Link from 'next/link'
import HeaderAuth from './header-auth'

export default function Navbar() {
  return (
    <nav className='h-16 w-full border-b border-b-foreground/10'>
      <div className='mx-auto flex w-full max-w-5xl items-center justify-between p-4 text-sm'>
        <div className='flex items-center gap-5 font-semibold'>
          <Link href='/'>egxproductivity</Link>
        </div>
        <HeaderAuth />
      </div>
    </nav>
  )
}
