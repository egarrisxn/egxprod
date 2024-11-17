'use client'
import {useRef} from 'react'
import {addTodo} from '@/app/_actions'
import {Button} from '../ui/button'
import {Input} from '../ui/input'
import PlusIcon from '../icons/plus'

export default function AddTodo() {
  const ref = useRef<HTMLFormElement>(null)

  return (
    <form
      className='flex items-center gap-2 outline-none'
      ref={ref}
      action={async (formData) => {
        await addTodo(formData)
        ref.current?.reset()
      }}
    >
      <Button className='h-5 min-w-5 rounded-sm p-0'>
        <PlusIcon className='h-4 w-4' />
      </Button>
      <Input
        id='task'
        className='border-none p-0 focus-visible:ring-transparent'
        name='task'
        placeholder='Add new task'
        required
      />
    </form>
  )
}
