import {RegisterForm} from '@/components/register-form'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card'

import {Metadata} from 'next'

export const metadata: Metadata = {
  title: 'Sign Up',
}

export default function SignUpPage() {
  return (
    <div>
      <Card className='w-full max-w-md shadow-lg'>
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
