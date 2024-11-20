import {editTodo} from '@/app/actions/todo'
import {TodoInput} from './todo-input'
import {TodoCheckbox} from './todo-checkbox'
import {DeleteTodo} from './delete-todo'
import type {Todo} from '@/lib/types'

export async function Todo({todo}: {todo: Todo}) {
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
        <TodoInput todo={todo} />
      </form>
      <DeleteTodo id={todo.id} />
    </div>
  )
}
