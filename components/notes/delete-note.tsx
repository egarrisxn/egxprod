'use client'
import {deleteNote} from '@/app/(actions)/notes/actions'
import {Button} from '../ui/button'

export default function DeleteNote({id}: {id: number}) {
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
