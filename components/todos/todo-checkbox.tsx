import { onCheckChange } from "@/app/actions/todo";
import { Checkbox } from "../ui/checkbox";

interface Todo {
  id: number;
  user_id: string;
  task: string;
  is_complete: boolean;
  inserted_at: Date;
}

export function TodoCheckbox({ todo }: { todo: Todo }) {
  return (
    <Checkbox
      className="mt-0.5 size-5"
      id={todo?.id as unknown as string}
      checked={todo?.is_complete}
      onCheckedChange={() => onCheckChange(todo)}
    />
  );
}
