import {ThemeSwitcher} from './theme-switcher'

export default function Footer() {
  return (
    <footer className='mx-auto flex h-16 w-full items-center justify-center gap-8 border-t text-center text-sm'>
      <p>
        Powered by{' '}
        <a
          href='https://supabase.com/'
          target='_blank'
          className='font-bold hover:underline'
          rel='noreferrer'
        >
          Supabase
        </a>{' '}
        &{' '}
        <a
          href='https://nextjs.org/'
          target='_blank'
          className='font-bold hover:underline'
          rel='noreferrer'
        >
          Next.js
        </a>
      </p>
      <ThemeSwitcher />
    </footer>
  )
}
