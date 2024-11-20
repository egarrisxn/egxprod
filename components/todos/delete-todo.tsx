'use client'
import {deleteTodo} from '@/app/actions/todo'
import {Button} from '../ui/button'

export function DeleteTodo({id}: {id: number}) {
  return (
    <Button
      variant='ghost'
      size='icon'
      className='h-4 w-4'
      onClick={async () => {
        await deleteTodo(id)
      }}
    >
      X
    </Button>
  )
}
