'use client'
import * as React from 'react'
import Link from 'next/link'
import {Plus, Pencil, Trash2, Copy} from 'lucide-react'
import {motion, Reorder} from 'motion/react'
import {toast} from 'react-hot-toast'
import {addBookmark, updateBookmark, deleteBookmark} from '@/app/actions/bookmark'
import {copyToClipboard} from '@/lib/helpers'

interface Bookmark {
  id: number
  user_id: string
  title: string
  url: string
  image_url: string
  inserted_at: Date
}

interface BookmarkRowProps {
  bookmark: Bookmark
  // eslint-disable-next-line no-unused-vars
  copyLink: (link: string) => void
  // eslint-disable-next-line no-unused-vars
  editBookmark: (id: number, newTitle: string, newUrl: string) => void
  // eslint-disable-next-line no-unused-vars
  deleteBookmark: (id: number) => void
}

interface BookmarksListProps {
  defaultBookmarks: Bookmark[]
}

export function BookmarkRow({bookmark, copyLink, editBookmark, deleteBookmark}: BookmarkRowProps) {
  const handleEdit = () => {
    const newTitle = window.prompt('Enter new title', bookmark.title)
    const newUrl = window.prompt('Enter new URL', bookmark.url)

    if (newTitle && newUrl) {
      editBookmark(bookmark.id, newTitle, newUrl)
    }
  }

  const handleDelete = () => {
    deleteBookmark(bookmark.id)
  }

  return (
    <div className='group -mx-2 flex items-center rounded p-1'>
      <Link
        target='_blank'
        href={bookmark.url}
        className='my-0 flex items-center gap-1 truncate p-1 text-sm text-slate-700 hover:text-slate-900'
      >
        {bookmark.image_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={bookmark.image_url} alt={bookmark.title} className='w-4' />
        )}
        <span>{bookmark.title}</span>
      </Link>
      <div className='ml-auto flex items-center gap-2'>
        <div className='hidden group-hover:flex'>
          <button
            className='rounded p-1 text-slate-400 hover:bg-slate-200 hover:text-slate-600'
            onClick={() => copyLink(bookmark.url)}
          >
            <Copy size={16} />
          </button>
          <button
            className='rounded p-1 text-slate-400 hover:bg-slate-200 hover:text-slate-600'
            onClick={handleEdit}
          >
            <Pencil size={16} />
          </button>
          <button
            className='rounded p-1 text-red-400 hover:bg-red-100 hover:text-red-600'
            onClick={handleDelete}
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default function BookmarkList({defaultBookmarks}: BookmarksListProps) {
  const [bookmarks, setBookmarks] = React.useState<Bookmark[]>(defaultBookmarks || [])
  const [url, setUrl] = React.useState('')

  const addNewBookmark = async (e: React.KeyboardEvent) => {
    if (e.key !== 'Enter' || url.length === 0) return

    try {
      const newBookmarks = await addBookmark(url)
      setBookmarks((prevBookmarks) => [...newBookmarks, ...prevBookmarks])
      setUrl('')
      toast.success('Bookmark added!')
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message || 'Failed to add bookmark')
      } else {
        toast.error('Failed to add bookmark')
      }
    }
  }

  const handleEdit = async (id: number, newTitle: string, newUrl: string) => {
    try {
      await updateBookmark(id, newTitle, newUrl)
      setBookmarks((prevBookmarks) =>
        prevBookmarks.map((bookmark) =>
          bookmark.id === id ? {...bookmark, title: newTitle, url: newUrl} : bookmark,
        ),
      )
      toast.success('Bookmark updated!')
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message || 'Failed to update bookmark')
      } else {
        toast.error('Failed to update bookmark')
      }
    }
  }

  const handleDelete = async (id: number) => {
    try {
      await deleteBookmark(id)
      setBookmarks((prevBookmarks) => prevBookmarks.filter((bookmark) => bookmark.id !== id))
      toast.success('Bookmark deleted!')
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message || 'Failed to delete bookmark')
      } else {
        toast.error('Failed to delete bookmark')
      }
    }
  }

  return (
    <section className='flex justify-center text-slate-700'>
      <motion.div className='mx-auto mt-20 w-[500px] md:mt-40'>
        <h1 className='mb-3 font-semibold text-slate-700'>Bookmarks</h1>
        <div className='group relative flex items-center'>
          <Plus
            size={16}
            className='absolute left-3 z-10 text-slate-400 group-hover:text-slate-700'
          />
          <input
            type='text'
            value={url}
            className='relative w-full rounded bg-slate-200/80 py-2.5 pl-8 pr-3 text-sm text-slate-700 focus:outline-none'
            placeholder='Insert link...'
            onChange={(e) => setUrl(e.target.value)}
            onKeyUp={addNewBookmark}
          />
        </div>
        <div className='flex w-full select-none flex-col font-[450]'>
          <Reorder.Group axis='y' values={bookmarks} onReorder={setBookmarks}>
            {bookmarks.map((bookmark) => (
              <BookmarkRow
                key={bookmark.id}
                bookmark={bookmark}
                copyLink={copyToClipboard}
                editBookmark={handleEdit}
                deleteBookmark={handleDelete}
              />
            ))}
          </Reorder.Group>
        </div>
      </motion.div>
    </section>
  )
}
