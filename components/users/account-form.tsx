'use client'
import * as React from 'react'
import Image from 'next/image'
import {useRouter} from 'next/navigation'
import {Mail, User as UserIcon, Globe, AtSign} from 'lucide-react'
import {createClient} from '@/utils/supabase/client'
import {Button} from '../ui/button'
import {Input} from '../ui/input'
import {Label} from '../ui/label'
import toast from 'react-hot-toast'

import type {User} from '@supabase/supabase-js'

function UploadAvatar({
  uid,
  url,
  size,
  onUpload,
}: {
  uid: string | null
  url: string | null
  size: number
  // eslint-disable-next-line no-unused-vars
  onUpload: (url: string) => void
}) {
  const supabase = createClient()
  const [avatarUrl, setAvatarUrl] = React.useState<string | null>(url)
  const [uploading, setUploading] = React.useState(false)

  React.useEffect(() => {
    async function downloadImage(path: string) {
      try {
        const {data, error} = await supabase.storage.from('avatars').download(path)
        if (error) {
          throw error
        }

        const url = URL.createObjectURL(data)
        setAvatarUrl(url)
      } catch (error) {
        console.log('Error downloading image: ', error)
      }
    }

    if (url) downloadImage(url)
  }, [url, supabase])

  const uploadAvatar: React.ChangeEventHandler<HTMLInputElement> = async (event) => {
    try {
      setUploading(true)

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.')
      }

      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
      const filePath = `${uid}-${Math.random()}.${fileExt}`

      const {error: uploadError} = await supabase.storage.from('avatars').upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      onUpload(filePath)
    } catch (error) {
      alert(error || 'Error uploading avatar!')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div>
      <div
        style={{width: size, height: size}}
        className='mx-auto max-w-40 rounded-full border-2 border-foreground bg-secondary object-cover'
      >
        {avatarUrl ? (
          <Image width={size} height={size} src={avatarUrl} alt='Avatar' className='rounded-full' />
        ) : (
          // Placeholder while loading
          <div className='h-full w-full animate-pulse rounded-full bg-gray-300' />
        )}
      </div>

      <div className='mx-auto flex flex-col text-center'>
        <label htmlFor='single' className='font-medium hover:cursor-pointer'>
          {uploading ? 'Uploading ...' : 'Upload'}
        </label>
        <input
          className='hidden'
          type='file'
          id='single'
          accept='image/*'
          onChange={uploadAvatar}
          disabled={uploading}
        />
      </div>
    </div>
  )
}

export default function AccountForm({user}: {user: User | null}) {
  const router = useRouter()
  const [loading, setLoading] = React.useState(true)
  const [fullname, setFullname] = React.useState<string | null>(null)
  const [username, setUsername] = React.useState<string | null>(null)
  const [website, setWebsite] = React.useState<string | null>(null)
  const [avatar_url, setAvatarUrl] = React.useState<string | null>(null)
  const supabase = createClient()

  const getProfile = React.useCallback(async () => {
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
    } catch (error) {
      console.error('User data loading failed:', error)
      alert('Error loading user data!')
    } finally {
      setLoading(false)
    }
  }, [user, supabase])

  React.useEffect(() => {
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
    } catch (error) {
      console.error('Profile update failed:', error)
      toast.error('Error updating profile.')
    } finally {
      setLoading(false)
      router.push('/protected/profile')
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
