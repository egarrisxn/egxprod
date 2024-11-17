'use client'
import {deleteTodo} from '@/app/_actions'
import {Button} from '../ui/button'

export default function DeleteTodo({id}: {id: number}) {
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
