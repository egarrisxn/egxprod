import {login} from '@/app/actions'
import {Input} from '@/components/ui/input'
import {Label} from '@/components/ui/label'
// import {Button} from '@/components/ui/button'
// import Link from 'next/link'

export default function LoginPage() {
  return (
    <div className='mx-auto flex max-w-7xl flex-col items-center justify-center gap-12'>
      <form className='flex min-w-64 flex-col gap-2'>
        <Label htmlFor='email'>Email:</Label>
        <Input id='email' name='email' type='email' required />
        <Label htmlFor='password'>Password:</Label>
        <Input id='password' name='password' type='password' required />
        <button formAction={login}>Log in</button>
      </form>
    </div>
  )
}
