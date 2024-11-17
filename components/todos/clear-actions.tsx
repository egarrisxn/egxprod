'use client'
import {deleteCompletedTodos, deleteAllTodos} from '@/app/_actions'
import {Button} from '../ui/button'

export default function ClearActions() {
  return (
    <div className='flex items-center gap-2 border-t pt-2'>
      <Button
        onClick={async () => {
          await deleteCompletedTodos()
        }}
        size='sm'
        variant='outline'
      >
        Clear Completed
      </Button>
      <Button
        onClick={async () => {
          await deleteAllTodos()
        }}
        className='ml-auto'
        size='sm'
      >
        Clear All
      </Button>
    </div>
  )
}
