import React from 'react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

export default function PublicLayout({children}: {children: React.ReactNode}) {
  return (
    <>
      <Navbar />
      <main className='grid min-h-screen w-full grid-cols-1 p-4 lg:p-0'>{children}</main>
      <Footer />
    </>
  )
}
