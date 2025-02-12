export interface Quote {
  content: string;
  author: string;
}

export interface Todo {
  id: number;
  user_id: string;
  task: string;
  is_complete: boolean;
  inserted_at: Date;
}

export interface Note {
  id: number;
  user_id: string;
  thought: string;
  inserted_at: Date;
}

export interface Event {
  id: number;
  user_id: string;
  title: string;
  description: string;
  time: string;
  date: string;
}

export interface Timer {
  id: number;
  user_id: string;
  mode: "work" | "shortBreak" | "longBreak";
  duration: number;
  started_at: string;
  completed: boolean;
}

export interface Habit {
  id: number;
  user_id: string;
  mode: "filled" | "empty";
  name: string;
  created_at: string;
  completed: string[];
  streak?: number;
}

export interface HabitTrackerProps {
  defaultHabits: Habit[];
}

export interface Bookmark {
  id: number;
  user_id: string;
  title: string;
  url: string;
  image_url: string;
  inserted_at: Date;
}

export interface BookmarkRowProps {
  bookmark: Bookmark;

  copyLink: (link: string) => void;

  editBookmark: (id: number, newTitle: string, newUrl: string) => void;

  deleteBookmark: (id: number) => void;
}

export interface BookmarksListProps {
  defaultBookmarks: Bookmark[];
}
