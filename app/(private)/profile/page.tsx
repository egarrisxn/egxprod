import {createClient} from '@/lib/supabase/server'
import {redirect} from 'next/navigation'
import {Button} from '@/components/ui/button'
import {Card, CardContent} from '@/components/ui/card'
import {ArrowRight, Quote as QuoteIcon} from 'lucide-react'
// import PrivateHeader from '@/components/private-header'
import quotes from '@/lib/quotes.json'
import Link from 'next/link'

export default async function ProfilePage() {
  const supabase = await createClient()

  const {
    data: {user},
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect('/login')
  }

  // Fetch a random quote
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]

  return (
    <section className='flex min-h-screen flex-col gap-16 pt-24'>
      {/* <div className='absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80'>
        <div className='relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]' />
      </div>
      <PrivateHeader /> */}
      <div className='mx-auto flex max-w-4xl flex-col items-center justify-center gap-8 rounded-lg border bg-card p-8 shadow-lg dark:border-foreground'>
        <div className='space-y-4 text-center'>
          <h1 className='text-center text-2xl font-semibold sm:text-5xl'>
            Welcome back,{' '}
            <span className='bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent'>
              {user.email?.split('@')[0] || 'User'}
            </span>
          </h1>

          <p className='text-muted-foreground sm:text-lg'>
            Ready to boost your productivity today?
          </p>
        </div>
        <Card className='border-2 border-muted'>
          <CardContent className='pt-6'>
            <div className='flex gap-4'>
              <QuoteIcon className='h-8 w-8 flex-shrink-0 text-indigo-500' />
              <div className='space-y-2'>
                <p className='text-lg italic'>{randomQuote.content}</p>
                <p className='text-sm text-muted-foreground'>― {randomQuote.author}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <div className='flex justify-center gap-4'>
          <Link href='/dashboard'>
            <Button
              size='lg'
              className='bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600'
            >
              Go to Dashboard
              <ArrowRight className='ml-2 h-4 w-4' />
            </Button>
          </Link>

          <Button asChild variant='outline' size='lg'>
            <Link href='/profile/edit'>Edit Profile</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
