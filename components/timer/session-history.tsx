'use client'
import {useEffect, useState} from 'react'
import {getSessions, deleteSession} from '@/app/actions/timer'
import {Card, CardContent, CardHeader, CardTitle} from '../ui/card'
import {SessionList} from './session-list'

import {PomodoroSession} from '@/lib/types'

export function SessionHistory() {
  const [sessions, setSessions] = useState<PomodoroSession[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      try {
        const data = await getSessions()
        setSessions(data)
        setError(null)
      } catch (err) {
        console.error(err)
        setError('Failed to load sessions.')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleDeleteSession = async (session: PomodoroSession) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await deleteSession(session.id)
      } catch (error) {
        console.error('Error deleting session:', error)
      }
    }
  }

  return (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle>Recent Sessions</CardTitle>
      </CardHeader>
      <CardContent>
        {loading && <p>Loading sessions...</p>}
        {error && <p className='text-red-500'>{error}</p>}
        {!loading && !error && sessions.length === 0 && <p>No sessions available.</p>}
        <SessionList sessions={sessions} onDeleteSession={handleDeleteSession} />
      </CardContent>
    </Card>
  )
}
