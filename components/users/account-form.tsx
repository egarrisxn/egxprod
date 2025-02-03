'use client'
import {useCallback, useEffect, useState} from 'react'
import {useRouter} from 'next/navigation'
import {createClient} from '@/lib/supabase/client'
import {Button} from '../ui/button'
import {Input} from '../ui/input'
import {Label} from '../ui/label'
import {UploadAvatar} from './upload-avatar'
import {Mail, User as UserIcon, Globe, AtSign} from 'lucide-react'
import toast from 'react-hot-toast'
import {type User} from '@supabase/supabase-js'

export function AccountForm({user}: {user: User | null}) {
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
    <form className='flex w-full flex-col space-y-4'>
      <UploadAvatar
        uid={user?.id ?? null}
        url={avatar_url}
        size={160}
        onUpload={(url) => {
          setAvatarUrl(url)
          updateProfile({fullname, username, website, avatar_url: url})
        }}
      />
      <hr className='my-4' />

      <div className='space-y-4'>
        <div className='space-y-2'>
          <Label htmlFor='email' className='text-sm font-medium'>
            Email
          </Label>
          <div className='relative'>
            <Mail className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
            <Input id='email' type='text' value={user?.email} disabled className='pl-10' />{' '}
          </div>
        </div>

        <div className='space-y-2'>
          <Label htmlFor='fullName' className='text-sm font-medium'>
            Name
          </Label>
          <div className='relative'>
            <UserIcon className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
            <Input
              id='fullName'
              type='text'
              value={fullname || ''}
              onChange={(e) => setFullname(e.target.value)}
              className='pl-10'
            />{' '}
          </div>
        </div>

        <div className='space-y-2'>
          <Label htmlFor='username' className='text-sm font-medium'>
            Username
          </Label>
          <div className='relative'>
            <AtSign className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
            <Input
              id='username'
              type='text'
              value={username || ''}
              onChange={(e) => setUsername(e.target.value)}
              className='pl-10'
            />{' '}
          </div>
        </div>

        <div className='space-y-2'>
          <Label htmlFor='website' className='text-sm font-medium'>
            Website
          </Label>
          <div className='relative'>
            <Globe className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
            <Input
              id='website'
              type='url'
              value={website || ''}
              onChange={(e) => setWebsite(e.target.value)}
              className='pl-10'
            />{' '}
          </div>
        </div>

        <Button
          className='w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600'
          onClick={() => updateProfile({fullname, username, website, avatar_url})}
          disabled={loading}
        >
          {loading ? (
            <div className='flex items-center gap-2'>
              <div className='h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent' />
              Updating...
            </div>
          ) : (
            'Update Profile'
          )}
        </Button>
      </div>
    </form>
  )
}
