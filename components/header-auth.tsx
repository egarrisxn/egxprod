import {createClient} from '@/lib/supabase/server'
import {signOutUser} from '@/app/actions/auth'
import {Button} from './ui/button'
import {HeaderDropdown} from '@/components/header-dropdown'
import Link from 'next/link'

export async function HeaderAuth() {
  const supabase = await createClient()

  const {
    data: {user},
  } = await supabase.auth.getUser()

  return user ? (
    <div className='flex items-center sm:gap-4'>
      <Button asChild variant='link'>
        <Link href='/dashboard'>Dashboard</Link>
      </Button>
      <HeaderDropdown />
      <form action={signOutUser}>
        <Button variant='ghost' type='submit'>
          Logout
        </Button>
      </form>
    </div>
  ) : (
    <div className='flex items-center sm:gap-4'>
      <Button asChild variant='link'>
        <Link href='/login'>Login</Link>
      </Button>
      <Button
        asChild
        className='bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600'
      >
        <Link href='/register'>Register</Link>
      </Button>
    </div>
  )
}
