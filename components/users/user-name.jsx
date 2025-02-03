import {getUser} from '@/app/actions/auth'

export async function UserName() {
  const user = await getUser()
  return (
    <span className='bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent'>
      {user.email?.split('@')[0] || 'User'}
    </span>
  )
}
