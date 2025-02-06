'use client'
import {onCheckChange} from '@/app/actions'
import {Checkbox} from '../ui/checkbox'

import type {Todo} from '@/lib/types'

export function TodoCheckbox({todo}: {todo: Todo}) {
  return (
    <Checkbox
      className='mt-0.5 size-5'
      id={todo?.id as unknown as string}
      checked={todo?.is_complete}
      onCheckedChange={() => onCheckChange(todo)}
    />
  )
}
