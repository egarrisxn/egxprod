import type {MetadataRoute} from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://xprod.vercel.app',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: 'https://xprod.vercel.app/signin',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: 'https://xprod.vercel.app/signup',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: 'https://xprod.vercel.app/protected/dashboard',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: 'https://xprod.vercel.app/protected/profile',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: 'https://xprod.vercel.app/protected/profile/edit',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
  ]
}
