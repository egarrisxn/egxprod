import * as React from 'react'
import generateMetadata from '@/lib/seo'
import type {Metadata} from 'next'

export const metadata: Metadata = generateMetadata({
  path: '/protected/profile/edit',
  title: 'Edit Profile | xprod',
  description: 'Edit your protected profile page.',
})

export default function EditProfilePage() {
  return <div className='mx-auto flex w-full flex-col'>Edit Profile Page</div>
}

// import * as React from 'react'
// import EditProfileCard from '@/components/users/edit-profile-card'
// import generateMetadata from '@/lib/seo'

// import type {Metadata} from 'next'

// export const metadata: Metadata = generateMetadata({
//   path: '/protected/profile/edit',
//   title: 'Edit Profile | xprod',
//   description: 'Edit your protected profile page.',
// })

// export default function EditProfilePage() {
//   return <EditProfileCard />
// }
