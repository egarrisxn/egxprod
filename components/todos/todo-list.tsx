import {fetchTodos} from '@/app/actions/todo'
import {Todo} from './todo'
import {AddTodo} from './add-todo'
import {ClearTodos} from './clear-todos'

export async function TodoList() {
  const todos = await fetchTodos()

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
