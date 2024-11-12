import type {Metadata} from 'next'
import localFont from 'next/font/local'
import {ThemeProvider} from 'next-themes'
import Navbar from '@/components/navbar'
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
  title: 'egxprod',
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
    title: 'egxprod',
    url: 'https://egxprod.vercel.app',
    locale: 'en_US',
    images: [
      {
        url: `https://egxprod.vercel.app/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: 'egxprod-og-image',
      },
    ],
  },
  icons: {
    shortcut: 'https://egxprod.vercel.app/favicon.ico',
  },
}

export default async function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang='en' className='antialiased' suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <main className='grid min-h-[100dvh] grid-rows-[auto_1fr_auto]'>
            <Navbar />
            {children}
            <Footer />
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}
