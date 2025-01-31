import type {MetadataRoute} from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: ['/'],
    },
    sitemap: 'https://xprod.vercel.app/sitemap.xml',
    host: 'https://xprod.vercel.app',
  }
}
