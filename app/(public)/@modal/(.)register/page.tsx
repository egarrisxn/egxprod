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
import {RegisterForm} from '@/components/auth/register-form'
import {useRouter} from 'next/navigation'

export default function RegisterModal() {
  const router = useRouter()
  return (
    <Dialog defaultOpen onOpenChange={() => router.back()}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Welcome in</DialogTitle>
          <DialogDescription>Register your account to continue</DialogDescription>
        </DialogHeader>
        <RegisterForm />
        <DialogFooter>
          <Button type='submit'>Create Account</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
