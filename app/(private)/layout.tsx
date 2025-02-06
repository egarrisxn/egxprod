import React from 'react'
import {redirect} from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import {InfoIcon} from 'lucide-react'
import {createClient} from '@/lib/supabase/server'
import {signOutUser} from '@/app/actions/auth'
import {Button} from '@/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'

export default async function SecureLayout({children}: {children: React.ReactNode}) {
  const supabase = await createClient()

  const {data, error} = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/signin')
  }

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
              <Link href='/protected/dashboard'>Dashboard</Link>
            </Button>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Profile</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <Link href='/protected/profile/edit' legacyBehavior passHref>
                      <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                        <span className='pb-1 underline-offset-4 hover:underline'>
                          Edit Profile
                        </span>
                      </NavigationMenuLink>
                    </Link>
                    <Link href='/protected/profile' legacyBehavior passHref>
                      <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                        <span className='pb-1 underline-offset-4 hover:underline'>
                          View Profile
                        </span>
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <form action={signOutUser}>
              <Button variant='ghost' type='submit'>
                Sign Out
              </Button>
            </form>
          </div>
        </nav>
      </header>

      <section className='mt-24 flex min-h-screen flex-col gap-16'>
        <div className='absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80'>
          <div className='relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]' />
        </div>
        <div className='w-full'>
          <div className='container mx-auto flex items-center justify-start gap-2 p-2 text-sm font-medium sm:px-4 lg:px-10'>
            <InfoIcon size='16' strokeWidth={2} />
            This is a secure page only you can see,{' '}
            <span className='bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent'>
              {data.user.email?.split('@')[0] || 'User'}
            </span>
          </div>
        </div>
        {children}
      </section>
    </>
  )
}
