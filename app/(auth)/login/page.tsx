import type {Metadata} from 'next'
import Link from 'next/link'
import UserAuth from '@/components/user-auth'
import BackButton from '@/components/back-button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {Button} from '@/components/ui/button'
import generateMetadata from '@/utils/seo'

export const metadata: Metadata = generateMetadata({
  path: '/login',
  title: 'Log In | xprod',
  description: 'Log in and get started with xprod.',
})

export default function LogInPage() {
  return (
    <section className='container flex h-screen flex-col items-center justify-center'>
      <BackButton />
      <Card className='w-full max-w-sm shadow-lg'>
        <CardHeader className='space-y-1 text-center'>
          <CardTitle className='text-2xl font-bold tracking-tight'>Welcome back</CardTitle>
          <CardDescription>Log in to your account to continue</CardDescription>
        </CardHeader>
        <CardContent>
          <UserAuth formType='login' />
        </CardContent>
        <CardFooter className='flex justify-center'>
          <Button asChild variant='link'>
            <Link href='/register'>Don&apos;t have an account? Register here!</Link>
          </Button>
        </CardFooter>
      </Card>
    </section>
  )
}
