import type {MetadataRoute} from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: ['/'],
    },
    sitemap: 'https://egxprod.vercel.app/sitemap.xml',
    host: 'https://egxprod.vercel.app',
  }
}
