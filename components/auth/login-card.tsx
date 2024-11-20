import {LoginForm} from './login-form'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '../ui/card'

export function LoginCard() {
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
