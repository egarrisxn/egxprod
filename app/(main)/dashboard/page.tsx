import * as React from 'react'
import generateMetadata from '@/utils/seo'
import type {Metadata} from 'next'

export const metadata: Metadata = generateMetadata({
  path: '/protected/dashboard',
  title: 'Dashboard | xprod',
  description: 'Your protected dashboard page.',
})

export default function DashboardPage() {
  return (
    <div className='mx-auto mb-24 flex flex-col gap-4 px-2 sm:px-6 xl:flex-row'>Dashboard Page</div>
  )
}

// import * as React from 'react'
// import {getHabits} from '@/app/actions/habit'
// import {getBookmarks} from '@/app/actions/bookmark'
// import {PomodoroTimer} from '@/components/timer/pomodoro-timer'
// import {TodoList} from '@/components/todos/todo-list'
// import {QuickNotes} from '@/components/notes/quick-notes'
// import CalendarEvents from '@/components/events/calendar-events'
// import HabitTracker from '@/components/habit-tracker'
// import BookmarkList from '@/components/bookmark-list'
// import generateMetadata from '@/utils/seo'
// import type {Metadata} from 'next'

// export const metadata: Metadata = generateMetadata({
//   path: '/protected/dashboard',
//   title: 'Dashboard | xprod',
//   description: 'Your protected dashboard page.',
// })

// export default async function DashboardPage() {
//   const habits = await getHabits()
//   const bookmarks = await getBookmarks()
//   return (
//     <div className='mx-auto mb-24 flex flex-col gap-4 px-2 sm:px-6 xl:flex-row'>
//       {/* Pomodoro Timer, Todo List, & Notes Section */}
//       <div className='flex flex-col gap-4 sm:min-w-96'>
//         <PomodoroTimer />
//         <TodoList />
//         <QuickNotes />
//       </div>

//       {/* Calendar Events, Habit Tracker Section, & Bookmark List. */}
//       <div className='flex flex-col gap-4 sm:min-w-96'>
//         <CalendarEvents />
//         <HabitTracker defaultHabits={habits} />
//         <BookmarkList defaultBookmarks={bookmarks} />
//       </div>
//     </div>
//   )
// }
