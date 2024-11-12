export default function ForgotPassword() {
  return (
    <div>
      <h1>Forgot Password</h1>
    </div>
  )
}

// import {forgotPassword} from '@/app/(actions)/user/actions'
// import {Input} from '@/components/ui/input'
// import {Label} from '@/components/ui/label'
// import Link from 'next/link'

// export default async function ForgotPassword() {
//   return (
//     <div className='mx-auto flex max-w-7xl flex-col items-center justify-center gap-12'>
//       <form className='mx-auto flex w-full min-w-64 max-w-64 flex-col gap-2 text-foreground [&>input]:mb-6'>
//         <div>
//           <h1 className='text-2xl font-medium'>Reset Password</h1>
//           <p className='text-sm text-secondary-foreground'>
//             Already have an account?{' '}
//             <Link className='text-primary underline' href='/login'>
//               Sign in
//             </Link>
//           </p>
//         </div>
//         <div className='mt-8 flex flex-col gap-2 [&>input]:mb-3'>
//           <Label htmlFor='email'>Email</Label>
//           <Input name='email' placeholder='you@example.com' required />
//           <button formAction={forgotPassword}>Reset Password</button>
//         </div>
//       </form>
//     </div>
//   )
// }
