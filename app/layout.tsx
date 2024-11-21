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

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: '.prod',
  description: 'The All-In-One Productivity App!',
  referrer: 'origin-when-cross-origin',
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
    siteName: 'egxprod.vercel.app',
    title: '.prod',
    url: 'https://egxprod.vercel.app',
    locale: 'en_US',
    images: [
      {
        url: `https://egxprod.vercel.app/opengraph-image.png`,
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Your App Title',
    description: 'A brief description of your app.',
    images: [
      {
        url: `https://egxprod.vercel.app/twitter-image.png`,
        width: 1200,
        height: 630,
      },
    ],
  },
  icons: {
    shortcut: 'https://egxprod.vercel.app/favicon.ico',
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
