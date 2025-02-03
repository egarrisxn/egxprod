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

export interface Event {
  id: number
  user_id: string
  title: string
  description: string
  time: string
  date: string
}

export interface EventFormProps {
  event?: Event
  selectedDate: Date
  onEventSaved: () => void
  onCancel: () => void
}

export interface EventItemProps {
  event: Event
  onEdit: () => void
  onDelete: () => void
}

export interface EventListProps {
  events: Event[]
  onEditEvent: (event: Event) => void
  onDeleteEvent: (event: Event) => void
}

export interface Quote {
  content: string
  author: string
}

export interface TimerSession {
  id: number
  mode: 'work' | 'shortBreak' | 'longBreak'
  duration: number
  started_at: string
  completed: boolean
}

export type TimerSessionProps = {
  timerSession: TimerSession
  onDelete: (sessionId: number) => void
}

export type TimerSessionListProps = {
  timerSessions: TimerSession[]
  onDeleteSession: (sessionId: number) => void
}
