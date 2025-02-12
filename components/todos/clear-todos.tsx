"use client";
import { deleteCompletedTodos, deleteAllTodos } from "@/app/actions/todo";
import { Button } from "../ui/button";

export function ClearTodos() {
  return (
    <div className="flex items-center gap-2 border-t pt-2">
      <Button
        onClick={async () => {
          await deleteCompletedTodos();
        }}
        size="sm"
        variant="outline"
      >
        Clear Completed
      </Button>
      <Button
        onClick={async () => {
          await deleteAllTodos();
        }}
        className="ml-auto bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
        size="sm"
      >
        Clear All
      </Button>
    </div>
  );
}
