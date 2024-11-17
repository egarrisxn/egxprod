import {createSupabaseServerClient} from '@/lib/supabase/server'
import {redirect} from 'next/navigation'
import PrivateHeader from '@/components/private-header'

export default async function ProfilePage() {
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
      <div className='mx-auto flex h-[20rem] max-w-4xl items-center justify-center rounded-md'>
        <section>
          <p className='mb-3 text-center text-5xl font-semibold'>Profile Page</p>
          <div className='mt-8'>
            <p className='mb-3'>Id: {user.id}</p>
            <p className='mb-3'>Role: {user.role}</p>
            <p className='mb-3'>Email: {user.email}</p>
            <p className='mb-3'>Provider: {user.app_metadata['provider']}</p>
            <p className='mb-3'>Created At: {user.created_at}</p>
          </div>
        </section>
      </div>
    </div>
  )
}
