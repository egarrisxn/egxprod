import React from 'react'
import PrivateHeader from '@/components/private-header'

export default function SecureLayout({children}: {children: React.ReactNode}) {
  return (
    <section className='mt-24 flex min-h-screen flex-col gap-16'>
      <div className='absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80'>
        <div className='relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]' />
      </div>
      <PrivateHeader />
      {children}
    </section>
  )
}
