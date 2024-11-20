import {editNote} from '@/app/actions/note'
import {NoteInput} from './note-input'
import {DeleteNote} from './delete-note'
import type {Note} from '@/lib/types'

export async function Note({note}: {note: Note}) {
  return (
    <div className='flex items-center gap-2'>
      <form
        className='flex flex-1 items-center gap-2'
        action={async () => {
          'use server'
          await editNote(note)
        }}
      >
        <NoteInput note={note} />
      </form>
      <DeleteNote id={note.id} />
    </div>
  )
}
