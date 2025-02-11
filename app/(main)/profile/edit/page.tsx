import * as React from 'react'
import generateMetadata from '@/utils/seo'
import type {Metadata} from 'next'

export const metadata: Metadata = generateMetadata({
  path: '/protected/profile/edit',
  title: 'Edit Profile | xprod',
  description: 'Edit your protected profile page.',
})

export default function EditProfilePage() {
  return (
    <div className='mx-auto mb-24 flex flex-col gap-4 px-2 sm:px-6 xl:flex-row'>
      Edit Profile Page
    </div>
  )
}

// import * as React from 'react'
// import EditProfileCard from '@/components/users/edit-profile-card'
// import generateMetadata from '@/utils/seo'

// import type {Metadata} from 'next'

// export const metadata: Metadata = generateMetadata({
//   path: '/protected/profile/edit',
//   title: 'Edit Profile | xprod',
//   description: 'Edit your protected profile page.',
// })

// export default function EditProfilePage() {
//   return <EditProfileCard />
// }
