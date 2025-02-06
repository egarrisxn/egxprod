import Link from 'next/link'
import Image from 'next/image'
import {redirect} from 'next/navigation'
import {ArrowRight, Quote as QuoteIcon} from 'lucide-react'
import {SupabaseClient} from '@supabase/supabase-js'
import {createClient} from '@/lib/supabase/server'
import {Button} from '../ui/button'
import {Card, CardContent} from '../ui/card'
import quotes from '@/lib/xquotes.json'

export async function ProfileCard() {
  const supabase = await createClient()

  const {
    data: {user},
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/signin')
  }

  async function fetchAvatarUrl(supabase: SupabaseClient, uid: string) {
    const {data, error} = await supabase
      .from('profiles')
      .select('avatar_url')
      .eq('id', uid)
      .single()

    if (error || !data?.avatar_url) {
      return {error: 'Avatar not found or failed to load.'}
    }

    const {data: publicUrlData} = supabase.storage.from('avatars').getPublicUrl(data.avatar_url)

    if (!publicUrlData?.publicUrl) {
      return {error: 'Failed to retrieve public URL.'}
    }

    return {publicUrl: publicUrlData.publicUrl}
  }

  async function AvatarDisplay({supabase, uid}: {supabase: SupabaseClient; uid: string}) {
    const {publicUrl, error} = await fetchAvatarUrl(supabase, uid)

    if (error || !publicUrl) {
      return <p>{error || 'Avatar not found or failed to load.'}</p>
    }

    return (
      <div>
        <Image
          src={publicUrl}
          alt='User Avatar'
          width={160}
          height={160}
          className='rounded-full object-cover'
        />
      </div>
    )
  }

  // Fetch a random quote
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]

  return (
    <div className='mx-auto mb-16 flex max-w-4xl flex-col items-center justify-center gap-8 px-2 sm:rounded-lg sm:border sm:bg-card sm:px-8 sm:py-12 sm:shadow-lg dark:border-foreground'>
      <AvatarDisplay supabase={supabase} uid={user.id} />
      <div className='space-y-4 text-center'>
        <h1 className='text-2xl font-semibold sm:text-5xl'>
          Welcome back,{' '}
          <span className='bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent'>
            {user.email?.split('@')[0] || 'User'}
          </span>
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
        <Link href='/protected/dashboard'>
          <Button
            size='lg'
            className='bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600'
          >
            Go to Dashboard
            <ArrowRight className='ml-2 size-4' />
          </Button>
        </Link>
        <Button asChild variant='outline' size='lg'>
          <Link href='/protected/profile/edit'>Edit Profile</Link>
        </Button>
      </div>
    </div>
  )
}
