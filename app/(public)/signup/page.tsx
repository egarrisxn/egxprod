import * as React from 'react'
import type {Metadata} from 'next'
import RegisterForm from '@/components/register-form'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card'
import generateMetadata from '@/lib/seo'

export const metadata: Metadata = generateMetadata({
  path: '/signup',
  title: 'Sign Up | xprod',
  description: 'Sign up and get started with xprod.',
})

export default function SignUpPage() {
  return (
    <div className='flex w-full items-center justify-center'>
      <Card className='w-full max-w-lg shadow-lg'>
        <CardHeader className='space-y-1 text-center'>
          <CardTitle className='text-2xl font-bold tracking-tight'>Welcome in</CardTitle>
          <CardDescription>Register your account to continue</CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterForm />
        </CardContent>
      </Card>
    </div>
  )
}
