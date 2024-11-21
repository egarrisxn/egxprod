'use client'
import React, {useEffect, useState} from 'react'
import {createClient} from '@/lib/supabase/client'
import Image from 'next/image'

export function UploadAvatar({
  uid,
  url,
  size,
  onUpload,
}: {
  uid: string | null
  url: string | null
  size: number
  onUpload: (url: string) => void
}) {
  const supabase = createClient()
  const [avatarUrl, setAvatarUrl] = useState<string | null>(url)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
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
