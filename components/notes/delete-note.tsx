'use client'
import {deleteNote} from '@/app/actions/note'
import {Button} from '../ui/button'

export function DeleteNote({id}: {id: number}) {
  return (
    <Button
      variant='ghost'
      size='icon'
      className='h-4 w-4'
      onClick={async () => {
        await deleteNote(id)
      }}
    >
      X
    </Button>
  )
}
