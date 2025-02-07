'React.use client'
import * as React from 'react'
import {editTodo} from '@/app/actions/todo'
import {Input} from '../ui/input'

interface Todo {
  id: number
  user_id: string
  task: string
  is_complete: boolean
  inserted_at: Date
}

export function TodoInput({todo}: {todo: Todo}) {
  const [description, setDescription] = React.useState(todo.task)
  // eslint-disable-next-line no-undef
  const [typingTimeout, setTypingTimeout] = React.useState<NodeJS.Timeout | null>(null)

  React.useEffect(() => {
    setDescription(todo.task)
  }, [todo.task])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setDescription(newValue)

    if (typingTimeout) {
      clearTimeout(typingTimeout)
    }

    setTypingTimeout(
      setTimeout(async () => {
        await editTodo({...todo, task: e.target.value})
      }, 2000),
    )
  }

  return (
    <Input
      className='border-none p-0 focus-visible:ring-transparent'
      value={description}
      onChange={handleInputChange}
    />
  )
}
