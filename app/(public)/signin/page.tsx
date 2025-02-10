import * as React from 'react'
// import LoginForm from '@/components/login-form'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card'

import generateMetadata from '@/lib/seo'
import type {Metadata} from 'next'

export const metadata: Metadata = generateMetadata({
  path: '/signin',
  title: 'Sign In | xprod',
  description: 'Sign in and get started with xprod.',
})

export default function SignInPage() {
  return (
    <div className='flex w-full items-center justify-center'>
      <Card className='w-full max-w-lg shadow-lg'>
        <CardHeader className='space-y-1 text-center'>
          <CardTitle className='text-2xl font-bold tracking-tight'>Welcome back</CardTitle>
          <CardDescription>Sign in to your account to continue</CardDescription>
        </CardHeader>
        <CardContent>
          BRB
          {/* <LoginForm /> */}
        </CardContent>
      </Card>
    </div>
  )
}
