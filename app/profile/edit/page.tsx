import {createSupabaseServerClient} from '@/lib/supabase/server'
import {redirect} from 'next/navigation'
import AccountForm from '@/components/account-form'
import PrivateHeader from '@/components/private-header'

export default async function EditProfilePage() {
  const supabase = await createSupabaseServerClient()

  const {
    data: {user},
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect('/login')
  }

  return (
    <div className='flex flex-col gap-8'>
      <section className='w-full'>
        <PrivateHeader />
      </section>
      <div className='mx-auto mb-8 flex w-full max-w-4xl items-center justify-center rounded border-2 bg-card py-8 shadow-lg'>
        <div>
          <p className='mb-3 text-center text-5xl font-semibold'>Edit Your Profile</p>
          <div className='mt-8'>
            <AccountForm user={user} />
          </div>
        </div>
      </div>
    </div>
  )
}
