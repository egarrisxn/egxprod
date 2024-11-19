import {InfoIcon} from 'lucide-react'
import {Button} from './ui/button'
import Link from 'next/link'

export default function PrivateHeader() {
  return (
    <div className='w-full bg-muted'>
      <div className='mx-auto flex w-full flex-col items-center justify-center gap-1 p-3 text-xs sm:flex-row sm:justify-between md:gap-0 md:px-5 md:py-4 md:text-sm'>
        <div className='flex items-center gap-2'>
          <InfoIcon size='16' strokeWidth={2} />
          This is a protected page that you can only see as an authenticated user
        </div>
        <div className='flex'>
          <Button asChild variant='link' className='text-xs font-bold md:text-sm'>
            <Link href='/dashboard'>Dashboard</Link>
          </Button>
          <Button asChild variant='link' className='text-xs font-bold md:text-sm'>
            <Link href='/profile/edit'>Edit Profile</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
