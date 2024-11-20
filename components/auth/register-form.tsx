'use client'
import {useTransition} from 'react'
import {useRouter} from 'next/navigation'
import {zodResolver} from '@hookform/resolvers/zod'
import {SubmitHandler, useForm} from 'react-hook-form'
import {CreateUserInput, createUserSchema} from '@/lib/user-schema'
import {signUpUser} from '@/app/actions/auth'
import {Input} from '../ui/input'
import {Label} from '../ui/label'
import {Button} from '../ui/button'
import toast from 'react-hot-toast'

export function RegisterForm() {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const methods = useForm<CreateUserInput>({
    resolver: zodResolver(createUserSchema),
  })

  const {
    reset,
    handleSubmit,
    register,
    formState: {errors},
  } = methods

  const onSubmitHandler: SubmitHandler<CreateUserInput> = (values) => {
    startTransition(async () => {
      const result = await signUpUser({
        data: values,
        emailRedirectTo: `${location.origin}/auth/callback`,
      })
      const {error} = JSON.parse(result)
      if (error?.message) {
        toast.error(error.message)
        console.log('Error message', error.message)
        reset({password: ''})
        return
      }

      toast.success('registered successfully')
      router.push('/login')
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className='space-y-4'>
      <div className='space-y-2'>
        <Label htmlFor='name'>Name</Label>
        <Input {...register('name')} placeholder='Name' className='w-full' />
        {errors['name'] && (
          <span className='block pt-1 text-xs text-destructive'>
            {errors['name']?.message as string}
          </span>
        )}
      </div>
      <div className='space-y-2'>
        <Label htmlFor='email'>Email</Label>
        <Input type='email' {...register('email')} placeholder='Email address' className='w-full' />
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
          placeholder='Password'
          className='w-full'
        />
        {errors['password'] && (
          <span className='block pt-1 text-xs text-destructive'>
            {errors['password']?.message as string}
          </span>
        )}
      </div>
      <div className='space-y-2'>
        <Label htmlFor='passwordConfirm'>Confirm Password</Label>
        <Input
          type='password'
          {...register('passwordConfirm')}
          placeholder='Confirm Password'
          className='w-full'
        />
        {errors['passwordConfirm'] && (
          <span className='block pt-1 text-xs text-destructive'>
            {errors['passwordConfirm']?.message as string}
          </span>
        )}
      </div>
      <Button
        type='submit'
        className='w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600'
        disabled={isPending}
      >
        {isPending ? 'loading...' : 'Sign Up'}
      </Button>
    </form>
  )
}
