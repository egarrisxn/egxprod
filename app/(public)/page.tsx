import {Hero} from '@/components/landing/hero'
import {Features} from '@/components/landing/features'
import {Examples} from '@/components/landing/examples'
import {CallToAction} from '@/components/landing/call-to-action'

export default function HomePage() {
  return (
    <div>
      <Hero />
      <Features />
      <Examples />
      <CallToAction />
    </div>
  )
}
