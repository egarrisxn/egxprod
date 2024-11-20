import {RegisterForm} from './register-form'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '../ui/card'

export function RegisterCard() {
  return (
    <Card className='w-full max-w-md shadow-lg'>
      <CardHeader className='space-y-1 text-center'>
        <CardTitle className='text-2xl font-bold tracking-tight'>Welcome in</CardTitle>
        <CardDescription>Register your account to continue</CardDescription>
      </CardHeader>
      <CardContent>
        <RegisterForm />
      </CardContent>
    </Card>
  )
}
