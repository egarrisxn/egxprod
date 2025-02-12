"use client";
import { Trash2 } from "lucide-react";
import { deleteTodo } from "@/app/actions/todo";
import { Button } from "../ui/button";

export function DeleteTodo({ id }: { id: number }) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="size-4 text-red-400"
      onClick={async () => {
        await deleteTodo(id);
      }}
    >
      <Trash2 className="size-3" />
      <span className="sr-only">Delete To-Do Item</span>
    </Button>
  );
}
