'use client'
import {onCheckChange} from '@/app/(actions)/todos/actions'
import {Checkbox} from '../ui/checkbox'

export interface Todo {
  id: number
  user_id: string
  task: string
  is_complete: boolean
  inserted_at: Date
}

export default function TodoCheckbox({todo}: {todo: Todo}) {
  return (
    <Checkbox
      className='mt-0.5 h-5 w-5'
      id={todo?.id as unknown as string}
      checked={todo?.is_complete}
      onCheckedChange={() => onCheckChange(todo)}
    />
  )
}
