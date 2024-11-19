'use client'
import {useRef} from 'react'
import {addNote} from '@/app/_actions'
import {Button} from '../ui/button'
import {Input} from '../ui/input'
import PlusIcon from '../icons/plus'

export default function AddNote() {
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
        <PlusIcon className='h-4 w-4' />
      </Button>
      <Input
        id='thought'
        className='border-none p-0 focus-visible:ring-transparent'
        name='thought'
        placeholder='Add new thought'
        required
      />
    </form>
  )
}
