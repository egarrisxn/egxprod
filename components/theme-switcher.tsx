'use client'
import {useEffect, useState} from 'react'
import {useTheme} from 'next-themes'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import {Button} from './ui/button'
import {Laptop, Moon, Sun} from 'lucide-react'

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const {theme, setTheme} = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='icon'>
          {theme === 'light' ? (
            <Sun key='light' size={16} className={'text-muted-foreground'} />
          ) : theme === 'dark' ? (
            <Moon key='dark' size={16} className={'text-muted-foreground'} />
          ) : (
            <Laptop key='system' size={16} className={'text-muted-foreground'} />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-content' align='start'>
        <DropdownMenuRadioGroup value={theme} onValueChange={(e) => setTheme(e)}>
          <DropdownMenuRadioItem className='flex gap-2' value='light'>
            <Sun size={16} className='text-muted-foreground' /> <span>Light</span>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem className='flex gap-2' value='dark'>
            <Moon size={16} className='text-muted-foreground' /> <span>Dark</span>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem className='flex gap-2' value='system'>
            <Laptop size={16} className='text-muted-foreground' /> <span>System</span>
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
