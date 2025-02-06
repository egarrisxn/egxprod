import {EditProfileCard} from '@/components/users/edit-profile-card'

import {Metadata} from 'next'

export const metadata: Metadata = {
  title: 'Edit Profile',
}

export default function EditProfilePage() {
  return <EditProfileCard />
}
