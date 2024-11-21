import {getTodos, editTodo} from '@/app/actions/todo'
import {AddTodo} from './add-todo'
import {ClearTodos} from './clear-todos'
import {TodoInput} from './todo-input'
import {TodoCheckbox} from './todo-checkbox'
import {DeleteTodo} from './delete-todo'
import type {Todo} from '@/lib/types'

async function Todo({todo}: {todo: Todo}) {
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

export async function TodoList() {
  const todos = await getTodos()

  return (
    <div className='flex-1 overflow-auto'>
      <div className='flex flex-col'>
        {todos &&
          todos
            .filter((todo) => !todo.is_complete)
            .map((todo) => <Todo key={todo.id} todo={todo} />)}
        {todos &&
          todos
            .filter((todo) => todo.is_complete)
            .map((todo) => <Todo key={todo.id} todo={todo} />)}
        <AddTodo />
      </div>
      <ClearTodos />
    </div>
  )
}
