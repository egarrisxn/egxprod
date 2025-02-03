// 'use client'
// import {useEffect, useState} from 'react'
// import {getTimerSessions, deleteTimerSession} from '@/app/actions/timer'
// import {Card, CardContent, CardHeader, CardTitle} from '../ui/card'
// import {SessionList} from './session-list'

// import {TimerSession} from '@/lib/types'

// export function SessionHistory() {
//   const [sessions, setSessions] = useState<TimerSession[]>([])

//   useEffect(() => {
//     async function fetchData() {
//       const data = await getTimerSessions()
//       setSessions(data)
//     }
//     fetchData()
//   }, [])

//   const handleDeleteSession = async (sessionId: number) => {
//     const success = await deleteTimerSession(sessionId)
//     if (success) {
//       setSessions((prevSessions) => prevSessions.filter((session) => session.id !== sessionId))
//     } else {
//       alert('Failed to delete session')
//     }
//   }

//   return (
//     <Card className='w-full'>
//       <CardHeader>
//         <CardTitle>Recent Sessions</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <SessionList timerSessions={sessions} onDeleteSession={handleDeleteSession} />
//       </CardContent>
//     </Card>
//   )
// }
