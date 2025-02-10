import * as React from 'react'
import generateMetadata from '@/lib/seo'
import type {Metadata} from 'next'

export const metadata: Metadata = generateMetadata({
  path: '/protected/profile',
  title: 'Profile | xprod',
  description: 'Your protected profile page.',
})

export default function ProfilePage() {
  return <div className='mx-auto flex w-full flex-col'>Profile Page</div>
}

// import * as React from 'react'
// import ProfileCard from '@/components/users/profile-card'
// import generateMetadata from '@/lib/seo'

// import type {Metadata} from 'next'

// export const metadata: Metadata = generateMetadata({
//   path: '/protected/profile',
//   title: 'Profile | xprod',
//   description: 'Your protected profile page.',
// })

// export default function ProfilePage() {
//   return <ProfileCard />
// }
