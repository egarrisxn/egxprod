import {ArrowRight, Quote as QuoteIcon} from 'lucide-react'
import {Button} from '../ui/button'
import {Card, CardContent} from '../ui/card'
import Link from 'next/link'
import quotes from '@/lib/quotes.json'
import {UserAvatar} from './user-avatar'
import {UserName} from './user-name'

export function ProfileCard() {
  // Fetch a random quote
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]

  return (
    <div className='mx-auto mb-16 flex max-w-4xl flex-col items-center justify-center gap-8 px-2 dark:border-foreground sm:rounded-lg sm:border sm:bg-card sm:px-8 sm:py-12 sm:shadow-lg'>
      <UserAvatar />
      <div className='space-y-4 text-center'>
        <h1 className='text-2xl font-semibold sm:text-5xl'>
          Welcome back, <UserName />
        </h1>
        <p className='text-muted-foreground sm:text-lg'>Ready to boost your productivity today?</p>
      </div>
      <Card className='border-2 border-muted'>
        <CardContent className='pt-5 sm:pt-6'>
          <div className='flex gap-3 sm:gap-4'>
            <QuoteIcon className='size-6 flex-shrink-0 text-indigo-500 sm:size-8' />
            <div className='space-y-1 sm:space-y-2'>
              <p className='italic sm:text-lg'>{randomQuote.content}</p>
              <p className='text-sm text-muted-foreground'>― {randomQuote.author}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className='flex justify-center gap-3 sm:gap-4'>
        <Link href='/dashboard'>
          <Button
            size='lg'
            className='bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600'
          >
            Go to Dashboard
            <ArrowRight className='ml-2 size-4' />
          </Button>
        </Link>
        <Button asChild variant='outline' size='lg'>
          <Link href='/profile/edit'>Edit Profile</Link>
        </Button>
      </div>
    </div>
  )
}
