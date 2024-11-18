import {createClient} from '@/lib/supabase/server'
import {signOutUser} from '@/app/_actions'
import {Button} from './ui/button'
import Link from 'next/link'

export default async function HeaderAuth() {
  const supabase = await createClient()

  const {
    data: {user},
  } = await supabase.auth.getUser()

  return user ? (
    <ul className='flex items-center gap-1 sm:gap-2'>
      <li>
        <Button asChild variant='link'>
          <Link href='/profile'>Profile</Link>
        </Button>
      </li>
      <li>
        <form action={signOutUser}>
          <Button variant='link' type='submit'>
            Logout
          </Button>
        </form>
      </li>
    </ul>
  ) : (
    <ul className='flex items-center gap-1 sm:gap-2'>
      <li>
        <Button asChild variant='link'>
          <Link href='/register'>Register</Link>
        </Button>
      </li>
      <li>
        <Button asChild variant='link'>
          <Link href='/login'>Login</Link>
        </Button>
      </li>
    </ul>
  )
}
