import {getNotes, editNote} from '@/app/actions/note'
import {AddNote} from './add-note'
import {NoteInput} from './note-input'
import {DeleteNote} from './delete-note'
import type {Note} from '@/lib/types'

async function Note({note}: {note: Note}) {
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

export async function NoteList() {
  const notes = await getNotes()

  return (
    <div className='flex-1 overflow-auto'>
      <div className='flex flex-col'>
        {notes &&
          notes.map((note) => {
            return <Note key={note.id} note={note} />
          })}
        <AddNote />
      </div>
    </div>
  )
}
