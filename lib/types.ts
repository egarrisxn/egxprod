export interface Quote {
  content: string
  author: string
}

export interface Todo {
  id: number
  user_id: string
  task: string
  is_complete: boolean
  inserted_at: Date
}

export interface Note {
  id: number
  user_id: string
  thought: string
  inserted_at: Date
}

export interface CalendarEvent {
  id: number
  user_id: string
  title: string
  description: string
  time: string
  date: string
}

export interface PomodoroSession {
  id: number
  user_id: string
  mode: 'work' | 'shortBreak' | 'longBreak'
  duration: number
  started_at: string
  completed: boolean
}

export interface HabitTracker {
  id: number
  user_id: string
  mode: 'filled' | 'empty'
  name: string
  created_at: string
  completed: string[]
  streak?: number
}
