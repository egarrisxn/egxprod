import {Button} from '@/components/ui/button'
import Link from 'next/link'

export function Hero() {
  return (
    <section className='relative isolate pt-14 xl:pt-24'>
      <div className='absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80'>
        <div className='relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]' />
      </div>
      <div className='mx-auto max-w-7xl px-6 pb-16 pt-28 lg:pb-20 lg:pt-24'>
        <div className='mx-auto max-w-2xl text-center'>
          <h1 className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text py-1 text-6xl font-bold tracking-tight text-transparent sm:text-6xl lg:text-8xl'>
            The Ultimate Productivity Companion
          </h1>
          <p className='mt-6 text-lg leading-8 text-muted-foreground'>
            Streamline your workflow with our all-in-one productivity solution. Manage your
            calendar, tasks, and notes in one beautiful interface.
          </p>
          <div className='mt-10 flex items-center justify-center gap-4 lg:gap-6'>
            <Button
              asChild
              size='lg'
              className='bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600'
            >
              <Link href='/signup'>Get Started </Link>
            </Button>

            <Button asChild variant='ghost' size='lg'>
              <Link href='#features'>
                Learn more <span aria-hidden='true'>→</span>{' '}
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className='absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]'>
        <div className='relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]' />
      </div>
    </section>
  )
}
