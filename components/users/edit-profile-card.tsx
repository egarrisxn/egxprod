import {redirect} from 'next/navigation'
import {createClient} from '@/utils/supabase/server'
import AccountForm from './account-form'

export default async function EditProfileCard() {
  const supabase = await createClient()

  const {
    data: {user},
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect('/signin')
  }

  return (
    <div className='mx-auto mb-16 flex max-w-4xl flex-col items-center justify-center gap-4 px-2 sm:rounded-lg sm:border sm:bg-card sm:px-12 sm:py-8 sm:shadow-lg dark:border-foreground'>
      <h1 className='text-center text-2xl font-bold'>Edit Profile</h1>
      <AccountForm user={user} />
    </div>
  )
}
