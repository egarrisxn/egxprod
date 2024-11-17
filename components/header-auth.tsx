import {createSupabaseServerClient} from '@/lib/supabase/server'
import {signOutUser} from '@/app/_actions'
import {Button} from './ui/button'
import Link from 'next/link'

export default async function HeaderAuth() {
  const supabase = await createSupabaseServerClient()

  const {
    data: {user},
  } = await supabase.auth.getUser()

  return user ? (
    <ul className='flex items-center gap-4'>
      <li>
        <Button asChild variant='link'>
          <Link href='/profile'>Profile</Link>
        </Button>
      </li>
      <li>
        <form action={signOutUser} className='x'>
          <Button variant='link' type='submit'>
            Logout
          </Button>
        </form>
      </li>
    </ul>
  ) : (
    <ul className='flex items-center gap-4'>
      <li>
        <Button asChild variant='link'>
          <Link href='/register' className='x'>
            Register
          </Link>
        </Button>
      </li>
      <li>
        <Button asChild variant='link'>
          <Link href='/login' className='x'>
            Login
          </Link>
        </Button>
      </li>
    </ul>
  )
}
