import {fetchTodos} from '@/app/_actions'
import Todo from './todo'
import AddTodo from './add-todo'
import ClearActions from './clear-actions'

export default async function TodoList() {
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
      <ClearActions />
    </div>
  )
}
