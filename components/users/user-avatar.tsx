import Image from 'next/image'
import {SupabaseClient} from '@supabase/supabase-js'
import {createClient} from '@/lib/supabase/server'
import {getUser} from '@/app/actions/auth'

export async function UserAvatar() {
  const supabase = await createClient()
  const user = await getUser()

  async function fetchAvatarUrl(supabase: SupabaseClient, uid: string) {
    const {data, error} = await supabase
      .from('profiles')
      .select('avatar_url')
      .eq('id', uid)
      .single()

    if (error || !data?.avatar_url) {
      return {error: 'Avatar not found or failed to load.'}
    }

    const {data: publicUrlData} = supabase.storage.from('avatars').getPublicUrl(data.avatar_url)

    if (!publicUrlData?.publicUrl) {
      return {error: 'Failed to retrieve public URL.'}
    }

    return {publicUrl: publicUrlData.publicUrl}
  }

  async function AvatarDisplay({supabase, uid}: {supabase: SupabaseClient; uid: string}) {
    const {publicUrl, error} = await fetchAvatarUrl(supabase, uid)

    if (error || !publicUrl) {
      return <p>{error || 'Avatar not found or failed to load.'}</p>
    }

    return (
      <div>
        <Image
          src={publicUrl}
          alt='User Avatar'
          width={160}
          height={160}
          className='rounded-full object-cover'
        />
      </div>
    )
  }

  return (
    <div>
      <AvatarDisplay supabase={supabase} uid={user.id} />
    </div>
  )
}
