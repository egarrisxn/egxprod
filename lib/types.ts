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

export interface EventFormProps {
  event?: CalendarEvent
  selectedDate: Date
  onEventSaved: () => void
  onCancel: () => void
}

export interface EventItemProps {
  event: CalendarEvent
  onEdit: () => void
  onDelete: () => void
}

export interface EventListProps {
  events: CalendarEvent[]
  // eslint-disable-next-line no-unused-vars
  onEditEvent: (event: CalendarEvent) => void
  // eslint-disable-next-line no-unused-vars
  onDeleteEvent: (event: CalendarEvent) => void
}

export interface PomodoroSession {
  id: number
  mode: 'work' | 'shortBreak' | 'longBreak'
  duration: number
  started_at: string
  completed: boolean
}

export interface SessionItemProps {
  session: PomodoroSession
  onDelete: () => void
}

export interface SessionListProps {
  sessions: PomodoroSession[]
  // eslint-disable-next-line no-unused-vars
  onDeleteSession: (session: PomodoroSession) => void
}
