import type {Metadata} from 'next'
import localFont from 'next/font/local'
import {ThemeProvider} from 'next-themes'
import {Toaster} from 'react-hot-toast'
import Header from '@/components/header'
import Footer from '@/components/footer'
import './globals.css'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

const defaultUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : 'http://localhost:3000'

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: '.prod',
  description: 'The All-In-One Productivity App!',
  referrer: 'origin-when-cross-origin',
  creator: 'Ethan Garrison (https://github.com/egarrisxn)',
  keywords: [
    'Next.js',
    'React',
    'TypeScript',
    'Supabase',
    'PostgreSQL',
    'TailwindCSS',
    'shadcn-ui',
    'productivity',
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    url: 'https://egxprod.vercel.app',
    title: '.prod',
    description: 'The All-In-One Productivity App!',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: '.prod 2024 opengraph image',
      },
    ],
    siteName: '.prod',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: 'https://egxprod.vercel.app',
    title: '.prod',
    description: 'The All-In-One Productivity App!',
    creator: '@eg__xo',
    images: [
      {
        url: `/twitter-image.png`,
        width: 1200,
        height: 630,
        alt: '.prod 2024 twitter image',
      },
    ],
  },
  icons: {
    shortcut: '/favicon.ico',
  },
}

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
          <main className='grid min-h-[100dvh] grid-rows-[auto_1fr_auto] font-sans'>
            <Header />
            {children}
            <Footer />
          </main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
