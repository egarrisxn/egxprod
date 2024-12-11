'use client'
import {Button} from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {LoginForm} from '@/components/auth/login-form'
import {useRouter} from 'next/navigation'

export default function LoginModal() {
  const router = useRouter()
  return (
    <Dialog defaultOpen onOpenChange={() => router.back()}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Welcome Back</DialogTitle>
          <DialogDescription>Sign in to your account to continue</DialogDescription>
        </DialogHeader>
        <LoginForm />
        <DialogFooter>
          <Button type='submit'>Create Account</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
