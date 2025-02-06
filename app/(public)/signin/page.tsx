import {LoginForm} from '@/components/login-form'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card'

import {Metadata} from 'next'

export const metadata: Metadata = {
  title: 'Sign In',
}

export default function SignInPage() {
  return (
    <Card className='w-full max-w-md shadow-lg'>
      <CardHeader className='space-y-1 text-center'>
        <CardTitle className='text-2xl font-bold tracking-tight'>Welcome back</CardTitle>
        <CardDescription>Sign in to your account to continue</CardDescription>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
    </Card>
  )
}
