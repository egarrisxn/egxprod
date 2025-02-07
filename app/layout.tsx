import * as React from 'react'
import {Geist, Geist_Mono} from 'next/font/google'
import {ThemeProvider} from 'next-themes'
import {Toaster} from 'react-hot-toast'
import Footer from '@/components/footer'
import './globals.css'

// import type {Metadata} from 'next'

const geistSans = Geist({
  display: 'swap',
  variable: '--font-geist-sans',
  subsets: ['latin'],
})
const geistMono = Geist_Mono({
  display: 'swap',
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

// const defaultUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
//   ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
//   : 'http://localhost:3000'

// export const metadata: Metadata = {
//   metadataBase: new URL(defaultUrl),
//   title: {
//     template: 'xprod | %s',
//     default: 'xprod | All-In-One',
//   },
//   description: 'The All-In-One Productivity App!',
//   referrer: 'origin-when-cross-origin',
//   creator: 'https://egxo.dev.',
//   keywords: [
//     'Next.js',
//     'React',
//     'TypeScript',
//     'Supabase',
//     'PostgreSQL',
//     'TailwindCSS',
//     'shadcn-ui',
//     'productivity',
//   ],
//   robots: {
//     index: true,
//     follow: false,
//     nocache: true,
//     googleBot: {
//       index: true,
//       follow: false,
//       noimageindex: true,
//       'max-video-preview': -1,
//       'max-image-preview': 'large',
//       'max-snippet': -1,
//     },
//   },
//   openGraph: {
//     title: 'xprod',
//     description: 'The All-In-One Productivity App!',
//     url: 'https://xprod.vercel.app',
//     siteName: 'xprod',
//     images: [
//       {
//         url: '/opengraph-image.png',
//         width: 1200,
//         height: 630,
//         alt: 'xprod 2024 opengraph image',
//       },
//     ],
//     type: 'website',
//     locale: 'en_US',
//   },
//   twitter: {
//     card: 'summary_large_image',
//     title: 'xprod',
//     description: 'The All-In-One Productivity App!',
//     creator: '@eg__xo',
//     site: '@eg__xo',
//     images: [
//       {
//         url: '/twitter-image.png',
//         width: 1200,
//         height: 630,
//         alt: 'xprod 2024 twitter image',
//       },
//     ],
//   },
//   icons: {
//     icon: [
//       {url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon'},
//       {url: '/icon.png', sizes: '96x96', type: 'image/png'},
//       {url: '/icon.svg', type: 'image/svg+xml'},
//     ],
//     apple: [{url: '/apple-icon.png', sizes: '180x180', type: 'image/png'}],
//   },
// }

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <main className='grid font-sans'>
            {children}
            <Footer />
          </main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
