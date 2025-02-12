"use client";
import * as React from "react";
import { Plus } from "lucide-react";
import { addTodo } from "@/app/actions/todo";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export function AddTodo() {
  const ref = React.useRef<HTMLFormElement>(null);

  return (
    <form
      className="flex items-center gap-2 outline-none"
      ref={ref}
      action={async (formData) => {
        await addTodo(formData);
        ref.current?.reset();
      }}
    >
      <Button className="h-5 min-w-5 rounded-sm bg-gradient-to-r from-indigo-500 to-purple-500 p-0 hover:from-indigo-600 hover:to-purple-600">
        <Plus className="size-4" />
      </Button>
      <Input
        id="task"
        className="border-none p-0 focus-visible:ring-transparent"
        name="task"
        placeholder="Add new task"
        required
      />
    </form>
  );
}
