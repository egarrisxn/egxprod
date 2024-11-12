import {editNote} from '@/app/(actions)/notes/actions'
import NoteData from './note-data'
import DeleteNote from './delete-note'

export interface Note {
  id: number
  user_id: string
  thought: string
  inserted_at: Date
}

export default async function Note({note}: {note: Note}) {
  return (
    <div className='flex items-center gap-2'>
      <form
        className='flex flex-1 items-center gap-2'
        action={async () => {
          'use server'

          await editNote(note)
        }}
      >
        <NoteData note={note} />
      </form>
      <DeleteNote id={note.id} />
    </div>
  )
}
