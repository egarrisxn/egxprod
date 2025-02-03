import type {NextConfig} from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ilguvbltlgafvgxgpdbl.supabase.co',
      },
    ],
  },
  eslint: {
    // we have added a lint command to the package.json build script
    // which is why we disable the default next lint (during builds) here
    ignoreDuringBuilds: true,
  },
}

export default nextConfig
