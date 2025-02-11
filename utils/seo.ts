import type {Metadata} from 'next'

interface MetadataArgs {
  path: string
  title: string
  description: string
  image?: string
}

const baseUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : 'http://localhost:3000'

const generateMetadata = ({path, title, description, image}: MetadataArgs): Metadata => {
  const metaTitle = title
  const metaDescription = description
  const appName = 'xprod'
  const myName = 'Ethan Garrison'
  const mySite = 'https://egxo.dev'
  const ogImage = image ?? `${baseUrl}/opengraph-image.png`
  const twitterImage = image ?? `${baseUrl}/twitter-image.png`
  const socialHandle = '@eg__xo'

  const metadata: Metadata = {
    metadataBase: new URL(`${baseUrl}`),
    title: metaTitle,
    description: metaDescription,
    referrer: 'origin-when-cross-origin',
    applicationName: appName,
    authors: [{name: myName, url: mySite}],
    creator: myName,
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
      follow: false,
      nocache: true,
      googleBot: {
        index: true,
        follow: false,
        noimageindex: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    icons: {
      icon: [
        {url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon'},
        {url: '/icon.png', sizes: '96x96', type: 'image/png'},
        {url: '/icon.svg', type: 'image/svg+xml'},
      ],
      apple: [{url: '/apple-icon.png', sizes: '180x180', type: 'image/png'}],
      shortcut: [{url: '/shortcut-icon.png', sizes: '512x512', type: 'image/png'}],
    },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: `${baseUrl}${path}`,
      siteName: appName,
      images: ogImage,
      type: 'website',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      site: socialHandle,
      creator: socialHandle,
      title: metaTitle,
      description: metaDescription,
      images: twitterImage,
    },
    appleWebApp: {
      capable: true,
      title: metaTitle,
      startupImage: ogImage,
      statusBarStyle: 'black-translucent',
    },
    formatDetection: {
      telephone: true,
      date: true,
      address: true,
      email: true,
      url: true,
    },
    appLinks: {},
  }
  return metadata
}

export default generateMetadata
