import Image from 'next/image'

export function Examples() {
  return (
    <section className='relative isolate pt-14 xl:pt-24'>
      <div className='absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80'>
        <div className='relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]' />
      </div>
      <div className='mx-auto max-w-7xl px-6 py-24 sm:py-40 lg:px-8'>
        <div className='mx-auto max-w-2xl lg:text-center'>
          <p className='text-base font-semibold leading-7 text-indigo-500'>Here&apos;s A Glipse</p>
          <p className='mt-2 text-3xl font-bold tracking-tight sm:text-4xl'>
            Into your brand new favorite application
          </p>
          <p className='mt-6 text-lg leading-8 text-muted-foreground'>
            Dark mode theme is just one of the many great features we have to offer.
          </p>
        </div>
        <div className='mx-auto mt-16 flex flex-col gap-4 sm:mt-20 sm:gap-8 lg:mt-24'>
          <Image
            src='/images/example-1.png'
            alt='example-1'
            width={1700}
            height={730}
            className='rounded-lg border border-foreground shadow-lg'
          />

          <Image
            src='/images/example-2.png'
            alt='example-1'
            width={1700}
            height={730}
            className='rounded-lg border border-foreground shadow-lg'
          />
        </div>
      </div>
      <div className='absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]'>
        <div className='relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]' />
      </div>
    </section>
  )
}
