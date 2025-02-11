import Link from 'next/link'
import {Button} from '@/components/ui/button'

import type {Metadata} from 'next'

export const metadata: Metadata = {
  title: 'Not Found',
}

export default function NotFoundPage() {
  return (
    <section className='flex min-h-screen items-center justify-center p-4 lg:p-0'>
      <div className='mx-auto text-center'>
        <h2 className='mb-5 text-2xl font-semibold text-black md:text-4xl dark:text-white'>
          This Page Does Not Exist
        </h2>
        <Button asChild>
          <Link href='/'>Return Home</Link>
        </Button>
      </div>
    </section>
  )
}
