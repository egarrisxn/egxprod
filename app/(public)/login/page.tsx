import {LoginForm} from '@/components/users/login-form'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card'

export default function LoginPage() {
  return (
    <section className='flex min-h-screen items-center justify-center p-4'>
      <div className='absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80'>
        <div className='relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]' />
      </div>
      <Card className='w-full max-w-md shadow-lg'>
        <CardHeader className='space-y-1 text-center'>
          <CardTitle className='text-2xl font-bold tracking-tight'>Welcome back</CardTitle>
          <CardDescription>Sign in to your account to continue</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
      {/* <div className='absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]'>
        <div className='relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]' />
      </div> */}
    </section>
  )
}
