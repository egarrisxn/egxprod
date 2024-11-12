import {signout} from '@/app/(actions)/user/actions'
import {Button} from './ui/button'
import {createClient} from '@/utils/supabase/server'
import Link from 'next/link'

export default async function AuthButton() {
  const supabase = await createClient()

  const {
    data: {user},
  } = await supabase.auth.getUser()

  return user ? (
    <div className='flex items-center gap-4'>
      Hey, {user.email}!
      <form action={signout}>
        <Button type='submit' variant={'outline'}>
          Sign out
        </Button>
      </form>
    </div>
  ) : (
    <div className='flex gap-2'>
      <Button asChild size='sm' variant={'outline'}>
        <Link href='/login'>Sign in</Link>
      </Button>
      <Button asChild size='sm' variant={'default'}>
        <Link href='/signup'>Sign up</Link>
      </Button>
    </div>
  )
}
