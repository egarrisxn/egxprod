import { Files } from "lucide-react";
import { getNotes, editNote } from "@/app/actions/note";
import { AddNote } from "./add-note";
import { DeleteNote } from "./delete-note";
import { NoteInput } from "./note-input";

interface Note {
  id: number;
  user_id: string;
  thought: string;
  inserted_at: Date;
}

async function Note({ note }: { note: Note }) {
  return (
    <div className="flex items-center gap-2">
      <form
        className="flex flex-1 items-center gap-2"
        action={async () => {
          "use server";
          await editNote(note);
        }}
      >
        <NoteInput note={note} />
      </form>
      <DeleteNote id={note.id} />
    </div>
  );
}

export async function QuickNotes() {
  const notes = await getNotes();
  return (
    <section className="max-w-2xl p-2">
      <div className="flex flex-col rounded-lg border bg-card p-4 shadow-lg dark:border-foreground">
        <div className="flex items-center gap-4 pb-4">
          <Files className="size-8 text-gray-500 dark:text-gray-400" />
          <h1 className="text-2xl font-semibold">Quick Notes</h1>
        </div>
        <div className="flex-1 overflow-auto">
          <div className="flex flex-col">
            {notes &&
              notes.map((note) => {
                return <Note key={note.id} note={note} />;
              })}
            <AddNote />
          </div>
        </div>
      </div>
    </section>
  );
}
