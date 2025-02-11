import * as React from 'react'
import generateMetadata from '@/utils/seo'
import type {Metadata} from 'next'

export const metadata: Metadata = generateMetadata({
  path: '/protected/profile',
  title: 'Profile | xprod',
  description: 'Your protected profile page.',
})

export default function ProfilePage() {
  return (
    <div className='mx-auto mb-24 flex flex-col gap-4 px-2 sm:px-6 xl:flex-row'>Profile Page</div>
  )
}

// import * as React from 'react'
// import ProfileCard from '@/components/users/profile-card'
// import generateMetadata from '@/utils/seo'

// import type {Metadata} from 'next'

// export const metadata: Metadata = generateMetadata({
//   path: '/protected/profile',
//   title: 'Profile | xprod',
//   description: 'Your protected profile page.',
// })

// export default function ProfilePage() {
//   return <ProfileCard />
// }
