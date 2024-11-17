export default function ResetPassword() {
  return (
    <div>
      <h1>Reset Password</h1>
    </div>
  )
}

// import {resetPassword} from '@/app/(actions)/user/actions'
// import {Input} from '@/components/ui/input'
// import {Label} from '@/components/ui/label'

// export default async function ResetPassword() {
//   return (
//     <form className='flex w-full max-w-md flex-col gap-2 p-4 [&>input]:mb-4'>
//       <h1 className='text-2xl font-medium'>Reset password</h1>
//       <p className='text-sm text-foreground/60'>Please enter your new password below.</p>
//       <Label htmlFor='password'>New password</Label>
//       <Input type='password' name='password' placeholder='New password' required />
//       <Label htmlFor='confirmPassword'>Confirm password</Label>
//       <Input type='password' name='confirmPassword' placeholder='Confirm password' required />
//       <button formAction={resetPassword}>Reset password</button>
//     </form>
//   )
// }
