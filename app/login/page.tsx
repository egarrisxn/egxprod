import {LoginForm} from './login-form'

export default function LoginPage() {
  return (
    <section className='bg-secondary'>
      <div className='container mx-auto flex h-full items-center justify-center px-6 py-12'>
        <div className='rounded-sm border-2 bg-card px-8 py-10 shadow-lg md:w-8/12 lg:w-5/12'>
          <LoginForm />
        </div>
      </div>
    </section>
  )
}