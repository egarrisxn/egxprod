'use server'
import {createClient} from '@/lib/supabase/server'
import {CreateUserInput, LoginUserInput} from '@/lib/user-schema'
import {redirect} from 'next/navigation'

//! AUTHENTICATION

export async function signUpUser({
  data,
  emailRedirectTo,
}: {
  data: CreateUserInput
  emailRedirectTo?: string
}) {
  const supabase = await createClient()
  const result = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      emailRedirectTo,
    },
  })
  return JSON.stringify(result)
}

export async function signInUser(data: LoginUserInput) {
  const supabase = await createClient()
  const result = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  })
  return JSON.stringify(result)
}

export async function signOutUser() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  return redirect('/')
}
