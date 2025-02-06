'use client'
import {useRef} from 'react'
import {addNote} from '@/app/actions'
import {Button} from '../ui/button'
import {Input} from '../ui/input'
import PlusIcon from '../plus-icon'

export function AddNote() {
  const ref = useRef<HTMLFormElement>(null)

  return (
    <form
      className='flex items-center gap-2 outline-none'
      ref={ref}
      action={async (formData) => {
        await addNote(formData)
        ref.current?.reset()
      }}
    >
      <Button className='h-5 min-w-5 rounded-sm bg-gradient-to-r from-indigo-500 to-purple-500 p-0 hover:from-indigo-600 hover:to-purple-600'>
        <PlusIcon className='size-4' />
      </Button>
      <Input
        type='text'
        id='thought'
        name='thought'
        className='border-none p-0 focus-visible:ring-transparent'
        placeholder='Add new thought'
        required
      />
    </form>
  )
}
