import {createClient} from '@/lib/supabase/server'
import {redirect} from 'next/navigation'
import AccountForm from '@/components/users/account-form'
import PrivateHeader from '@/components/private-header'

export default async function EditProfilePage() {
  const supabase = await createClient()

  const {
    data: {user},
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect('/login')
  }

  return (
    <section className='flex min-h-screen flex-col gap-16 pt-20'>
      <div className='absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80'>
        <div className='relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]' />
      </div>
      <PrivateHeader />
      <div className='mx-auto mb-8 flex flex-col items-center justify-center py-8 lg:mb-16'>
        <div className='rounded-lg border bg-background shadow-lg dark:dark:border-foreground'>
          <AccountForm user={user} />
        </div>
      </div>
    </section>
  )
}
