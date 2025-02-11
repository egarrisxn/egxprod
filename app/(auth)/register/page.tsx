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
  path: '/register',
  title: 'Register | xprod',
  description: 'Register and get started with xprod.',
})

export default function RegisterPage() {
  return (
    <section className='container flex h-screen flex-col items-center justify-center'>
      <BackButton />
      <Card className='w-full max-w-sm shadow-lg'>
        <CardHeader className='space-y-1 text-center'>
          <CardTitle className='text-2xl font-bold tracking-tight'>Welcome in</CardTitle>
          <CardDescription>Register your account to continue</CardDescription>
        </CardHeader>
        <CardContent>
          <UserAuth formType='register' />
        </CardContent>
        <CardFooter className='flex justify-center'>
          <Button asChild variant='link'>
            <Link href='/login'>Already have an account? Login here!</Link>
          </Button>
        </CardFooter>
      </Card>
    </section>
  )
}
