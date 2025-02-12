import * as React from "react";
import { createClient } from "@/utils/supabase/server";
import generateMetadata from "@/utils/seo";

import type { Metadata } from "next";

export const metadata: Metadata = generateMetadata({
  path: "/dashboard",
  title: "Dashboard | xprod",
  description: "Your dashboard page.",
});

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <section className="container space-y-3">
      <h3>Dashboard Page</h3>
      <p>
        <strong>Email:</strong> {user?.email}
      </p>
    </section>
  );
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
