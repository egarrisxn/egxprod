import {fetchAvatarUrl} from '@/app/actions/user'
import Image from 'next/image'

export async function AvatarDisplay({uid}: {uid: string}) {
  const {publicUrl, error} = await fetchAvatarUrl(uid)

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
