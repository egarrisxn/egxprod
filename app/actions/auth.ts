'use server'
import {redirect} from 'next/navigation'
import {createClient} from '@/lib/supabase/server'
import {CreateUserInput, LoginUserInput} from '@/lib/schema'

//! Sign up user
export async function signUpUser({
  data,
  emailRedirectTo,
}: {
  data: CreateUserInput
  emailRedirectTo?: string
}) {
  const supabase = await createClient()
  const {error} = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {emailRedirectTo},
  })
  if (error) throw new Error(`Error signing up: ${error.message}`)
  return redirect('/signin')
}

//! Sign in user
export async function signInUser(data: LoginUserInput) {
  const supabase = await createClient()
  const {error} = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  })
  if (error) throw new Error(`Error signing in: ${error.message}`)
  return redirect('/protected/dashboard')
}

//! Sign out user
export async function signOutUser() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  return redirect('/')
}
