'use client'
import {deleteTodo} from '@/app/actions/todo'
import {Trash2} from 'lucide-react'
import {Button} from '../ui/button'

export function DeleteTodo({id}: {id: number}) {
  return (
    <Button
      variant='ghost'
      size='icon'
      className='size-4'
      onClick={async () => {
        await deleteTodo(id)
      }}
    >
      <Trash2 className='size-3' />
      <span className='sr-only'>Delete To-Do Item</span>
    </Button>
  )
}
