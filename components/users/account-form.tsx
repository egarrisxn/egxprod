'use client'
import {useCallback, useEffect, useState} from 'react'
import {useRouter} from 'next/navigation'
import {createClient} from '@/lib/supabase/client'
import UserAvatar from './avatar'
import toast from 'react-hot-toast'
import {Input} from '../ui/input'
import {Label} from '../ui/label'
import {type User} from '@supabase/supabase-js'

export default function AccountForm({user}: {user: User | null}) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [fullname, setFullname] = useState<string | null>(null)
  const [username, setUsername] = useState<string | null>(null)
  const [website, setWebsite] = useState<string | null>(null)
  const [avatar_url, setAvatarUrl] = useState<string | null>(null)
  const supabase = createClient()

  const getProfile = useCallback(async () => {
    try {
      setLoading(true)
      const {data, error, status} = await supabase
        .from('profiles')
        .select(`full_name, username, website, avatar_url`)
        .eq('id', user?.id)
        .single()

      if (error && status !== 406) {
        console.log(error)
        throw error
      }

      if (data) {
        setFullname(data.full_name)
        setUsername(data.username)
        setWebsite(data.website)
        setAvatarUrl(data.avatar_url)
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      alert('Error loading user data!')
    } finally {
      setLoading(false)
    }
  }, [user, supabase])

  useEffect(() => {
    getProfile()
  }, [user, getProfile])

  async function updateProfile({
    username,
    website,
    avatar_url,
  }: {
    username: string | null
    fullname: string | null
    website: string | null
    avatar_url: string | null
  }) {
    try {
      setLoading(true)

      const {error} = await supabase.from('profiles').upsert({
        id: user?.id as string,
        full_name: fullname,
        username,
        website,
        avatar_url,
        updated_at: new Date().toISOString(),
      })
      if (error) throw error
      toast.success('Successfully updated profile.')
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error('Error updating profile.')
    } finally {
      setLoading(false)
      router.push('/profile')
    }
  }

  return (
    <form className='mx-auto flex min-w-64 flex-col items-center justify-center gap-4'>
      <UserAvatar
        uid={user?.id ?? null}
        url={avatar_url}
        size={150}
        onUpload={(url) => {
          setAvatarUrl(url)
          updateProfile({fullname, username, website, avatar_url: url})
        }}
      />
      <div className='mt-8 flex flex-col gap-2 [&>input]:mb-3'>
        <Label htmlFor='email'>Email</Label>
        <Input id='email' type='text' value={user?.email} disabled />

        <Label htmlFor='fullName'>Full Name</Label>
        <Input
          id='fullName'
          type='text'
          value={fullname || ''}
          onChange={(e) => setFullname(e.target.value)}
        />

        <Label htmlFor='username'>Username</Label>
        <Input
          id='username'
          type='text'
          value={username || ''}
          onChange={(e) => setUsername(e.target.value)}
        />

        <Label htmlFor='website'>Website</Label>
        <Input
          id='website'
          type='url'
          value={website || ''}
          onChange={(e) => setWebsite(e.target.value)}
        />

        <button
          className='inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'
          onClick={() => updateProfile({fullname, username, website, avatar_url})}
          disabled={loading}
        >
          {loading ? 'Loading ...' : 'Update'}
        </button>
      </div>
    </form>
  )
}
