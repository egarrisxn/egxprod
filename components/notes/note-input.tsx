"use client";
import * as React from "react";
import { editNote } from "@/app/actions/note";
import { Input } from "../ui/input";

interface Note {
  id: number;
  user_id: string;
  thought: string;
  inserted_at: Date;
}

export function NoteInput({ note }: { note: Note }) {
  const [description, setDescription] = React.useState(note.thought);

  const [typingTimeout, setTypingTimeout] =
    React.useState<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
    setDescription(note.thought);
  }, [note.thought]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setDescription(newValue);

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    setTypingTimeout(
      setTimeout(async () => {
        await editNote({ ...note, thought: e.target.value });
      }, 2000),
    );
  };

  return (
    <Input
      className="border-none p-0 focus-visible:ring-transparent"
      value={description}
      onChange={handleInputChange}
    />
  );
}
