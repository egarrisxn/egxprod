'use client'
import {deleteNote} from '@/app/actions/note'
import {Trash2} from 'lucide-react'
import {Button} from '../ui/button'

export function DeleteNote({id}: {id: number}) {
  return (
    <Button
      variant='ghost'
      size='icon'
      className='size-4'
      onClick={async () => {
        await deleteNote(id)
      }}
    >
      <Trash2 className='size-3' />
      <span className='sr-only'>Delete Note</span>
    </Button>
  )
}
