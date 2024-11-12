import {InfoIcon} from 'lucide-react'
import {Button} from './ui/button'
import Link from 'next/link'

export default function PrivateHeader() {
  return (
    <div className='w-full bg-accent'>
      <div className='mx-auto flex w-full max-w-7xl items-center justify-between p-3 text-sm text-foreground sm:px-5'>
        <div className='flex gap-3'>
          <InfoIcon size='16' strokeWidth={2} />
          This is a protected page that you can only see as an authenticated user
        </div>
        <div className='flex gap-3'>
          <Button asChild variant='link' className='h-0 font-bold'>
            <Link href='/dashboard'>Dashboard</Link>
          </Button>
          <Button asChild variant='link' className='h-0 font-bold'>
            <Link href='/account'>Account</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
