import type {MetadataRoute} from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'xprod',
    short_name: 'xprod',
    description: 'The All-In-One Productivity App!',
    start_url: '/',
    display: 'standalone',
    background_color: '#eaeaea',
    theme_color: '#eaeaea',
    icons: [
      {
        src: '/favicon.ico',
        sizes: '48x48',
        type: 'image/x-icon',
      },
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
