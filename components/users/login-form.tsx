'use client'
import {useState, useTransition} from 'react'
import {useRouter} from 'next/navigation'
import {zodResolver} from '@hookform/resolvers/zod'
import {SubmitHandler, useForm} from 'react-hook-form'
import {LoginUserInput, loginUserSchema} from '@/lib/user-schema'
import {createClient} from '@/lib/supabase/client'
import {signInUser} from '@/app/_actions'
import {Input} from '@/components/ui/input'
import {Label} from '@/components/ui/label'
import {Button} from '@/components/ui/button'
import {Separator} from '@/components/ui/separator'
import Image from 'next/image'
import toast from 'react-hot-toast'

export function LoginForm() {
  const router = useRouter()
  const [error, setError] = useState('')
  const [isPending, startTransition] = useTransition()
  const supabase = createClient()

  const methods = useForm<LoginUserInput>({
    resolver: zodResolver(loginUserSchema),
  })

  const {
    reset,
    handleSubmit,
    register,
    formState: {errors},
  } = methods

  const onSubmitHandler: SubmitHandler<LoginUserInput> = async (values) => {
    startTransition(async () => {
      const result = await signInUser(values)

      const {error} = JSON.parse(result)
      if (error?.message) {
        setError(error.message)
        toast.error(error.message)
        console.log('Error message', error.message)
        reset({password: ''})
        return
      }

      setError('')
      toast.success('successfully logged in')
      router.push('/profile')
    })
  }

  const loginWithGitHub = () => {
    supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    })
  }

  const loginWithGoogle = () => {
    supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className='space-y-4'>
      {error && <p className='mb-6 rounded bg-destructive/80 py-4 text-center'>{error}</p>}
      <div className='space-y-2'>
        <Label htmlFor='email'>Email</Label>
        <Input
          type='email'
          {...register('email')}
          placeholder='name@example.com'
          className='w-full'
        />
        {errors['email'] && (
          <span className='block pt-1 text-xs text-destructive'>
            {errors['email']?.message as string}
          </span>
        )}
      </div>
      <div className='space-y-2'>
        <Label htmlFor='password'>Password</Label>
        <Input
          type='password'
          {...register('password')}
          placeholder='••••••••'
          className='w-full'
        />
        {errors['password'] && (
          <span className='block pt-1 text-xs text-destructive'>
            {errors['password']?.message as string}
          </span>
        )}
      </div>
      <Button
        type='submit'
        className='w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600'
        disabled={isPending}
      >
        {isPending ? 'Signing in...' : 'Sign in'}
      </Button>
      <div className='relative'>
        <div className='absolute inset-0 flex items-center'>
          <Separator />
        </div>
        <div className='relative flex justify-center text-xs uppercase'>
          <span className='bg-background px-2 text-muted-foreground'>Or continue with</span>
        </div>
      </div>

      <div className='grid gap-2'>
        <Button type='button' variant='outline' onClick={loginWithGoogle} className='w-full'>
          <Image src='/images/google.svg' alt='Google' width={20} height={20} className='mr-2' />
          Google
        </Button>

        <Button type='button' variant='outline' onClick={loginWithGitHub} className='w-full'>
          <Image src='/images/github.svg' alt='GitHub' width={20} height={20} className='mr-2' />
          GitHub
        </Button>
      </div>
    </form>
  )
}
