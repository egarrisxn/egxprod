import {editTodo} from '@/app/(actions)/todos/actions'
import TodoData from './todo-data'
import TodoCheckbox from './todo-checkbox'
import DeleteTodo from './delete-todo'

export interface Todo {
  id: number
  user_id: string
  task: string
  is_complete: boolean
  inserted_at: Date
}

export default async function Todo({todo}: {todo: Todo}) {
  return (
    <div className='flex items-center gap-2'>
      <form
        className='flex flex-1 items-center gap-2'
        action={async () => {
          'use server'

          await editTodo(todo)
        }}
      >
        <TodoCheckbox todo={todo} />
        <TodoData todo={todo} />
      </form>
      <DeleteTodo id={todo.id} />
    </div>
  )
}
