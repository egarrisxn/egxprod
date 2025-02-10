import * as React from 'react'
import generateMetadata from '@/lib/seo'
import type {Metadata} from 'next'

export const metadata: Metadata = generateMetadata({
  path: '/protected',
  title: 'xprod',
  description: 'All-In-One Productivity Application.',
})

export default function ProtectedHomePage() {
  return <div className='mx-auto flex w-full flex-col'>Protected Home Page</div>
}

// import * as React from 'react'
// import {Hero} from '@/components/landing/hero'
// import {Features} from '@/components/landing/features'
// import {Examples} from '@/components/landing/examples'
// import {CallToAction} from '@/components/landing/call-to-action'
// import generateMetadata from '@/lib/seo'

// import type {Metadata} from 'next'

// export const metadata: Metadata = generateMetadata({
//   path: '/protected',
//   title: 'xprod',
//   description: 'All-In-One Productivity Application.',
// })

// export default function ProtectedHomePage() {
//   return (
//     <div className='mx-auto flex w-full flex-col'>
//       <Hero />
//       <Features />
//       <Examples />
//       <CallToAction />
//     </div>
//   )
// }
