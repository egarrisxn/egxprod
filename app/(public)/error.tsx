'use client'
import * as React from 'react'
import {Button} from '@/components/ui/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & {digest?: string}
  reset: () => void
}) {
  React.useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className='mx-auto text-center'>
      <h2 className='mb-5 text-2xl font-semibold text-black md:text-4xl dark:text-white'>
        There seems to be a problem.
      </h2>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  )
}
