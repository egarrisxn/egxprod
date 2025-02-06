import {ProfileCard} from '@/components/users/profile-card'

import {Metadata} from 'next'

export const metadata: Metadata = {
  title: 'Profile',
}

export default function ProfilePage() {
  return <ProfileCard />
}
