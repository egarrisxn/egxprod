'use client'
import {useEffect, useState} from 'react'
import {editTodo} from '@/app/actions/todo'
import {Input} from '../ui/input'

import type {Todo} from '@/lib/types'

export function TodoInput({todo}: {todo: Todo}) {
  const [description, setDescription] = useState(todo.task)
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null)

  useEffect(() => {
    setDescription(todo.task)
  }, [todo.task])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setDescription(newValue)

    // Clear previous timeout if exists
    if (typingTimeout) {
      clearTimeout(typingTimeout)
    }

    // Set a new timeout
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
