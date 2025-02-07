import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {Button} from '@/components/ui/button'

export default function PublicLayout({children}: {children: React.ReactNode}) {
  return (
    <>
      <header className='fixed top-0 z-50 w-full border-b bg-background/80 backdrop-blur-lg'>
        <nav className='mx-auto flex w-full max-w-screen-3xl justify-center px-2 py-4 xs:justify-between sm:px-4 lg:px-8'>
          <Link href='/' className='hidden items-center pl-1 xs:flex'>
            <Image src='/prod-logo.png' alt='nav-icon' width={32} height={32} />
          </Link>
          <div className='flex items-center sm:gap-2'>
            <Button asChild variant='link'>
              <Link href='/'>Home</Link>
            </Button>
            <Button asChild variant='link'>
              <Link href='/signin'>Sign In</Link>
            </Button>
            <Button
              asChild
              className='bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600'
            >
              <Link href='/signup'>Sign Up</Link>
            </Button>
          </div>
        </nav>
      </header>

      <section className='grid min-h-screen w-full grid-cols-1 p-4 lg:p-0'>
        <div className='absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80'>
          <div className='relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]' />
        </div>
        {children}
      </section>
    </>
  )
}
