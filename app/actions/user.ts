import {createClient} from '@/lib/supabase/server'

export async function fetchAvatarUrl(uid: string) {
  const supabase = await createClient()

  const {data, error} = await supabase.from('profiles').select('avatar_url').eq('id', uid).single()

  if (error || !data?.avatar_url) {
    return {error: 'Avatar not found or failed to load.'}
  }

  const {data: publicUrlData} = supabase.storage.from('avatars').getPublicUrl(data.avatar_url)

  if (!publicUrlData?.publicUrl) {
    return {error: 'Failed to retrieve public URL.'}
  }

  return {publicUrl: publicUrlData.publicUrl}
}
