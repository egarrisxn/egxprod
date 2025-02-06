'use client'
import {useEffect} from 'react'
import {Button} from '@/components/ui/button'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & {digest?: string}
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <html>
      <body>
        <section className='flex min-h-screen items-center justify-center p-4 lg:p-0'>
          <div className='absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80'>
            <div className='relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]' />
          </div>
          <div className='mx-auto text-center'>
            <h2 className='mb-5 text-2xl font-semibold text-black md:text-4xl dark:text-white'>
              There seems to be a problem.
            </h2>
            <Button onClick={() => reset()}>Try again</Button>
          </div>
        </section>
      </body>
    </html>
  )
}
