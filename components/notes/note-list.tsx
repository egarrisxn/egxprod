import {fetchNotes} from '@/app/actions/note'
import {Note} from './note'
import {AddNote} from './add-note'

export async function NoteList() {
  const notes = await fetchNotes()

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
