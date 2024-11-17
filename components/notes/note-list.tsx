import {createSupabaseServerClient} from '@/lib/supabase/server'
import Note from './note'
import AddNote from './add-note'

export default async function NoteList() {
  const supabase = await createSupabaseServerClient()

  const {data: notes, error} = await supabase.from('notes').select('*')

  if (error) {
    throw new Error(error.message)
  }

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
