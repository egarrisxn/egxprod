import Link from 'next/link'
import {Button} from '@/components/ui/button'

export default function AuthErrorPage() {
  return (
    <section className='container flex h-screen flex-col items-center justify-center'>
      <div className='mx-auto text-center'>
        <h2 className='mb-5 text-2xl font-semibold text-black md:text-4xl dark:text-white'>
          There seems to be a problem.
        </h2>
        <Button asChild>
          <Link href='/'>Go Home</Link>
        </Button>
      </div>
    </section>
  )
}
