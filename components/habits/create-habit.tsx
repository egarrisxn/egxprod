'use client'
import {useState} from 'react'
import {addHabit} from '@/app/actions'
import {Input} from '../ui/input'
import {Button} from '../ui/button'
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter} from '../ui/dialog'

export function CreateHabit() {
  const [habitName, setHabitName] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [open, setOpen] = useState(false)

  const handleCreateHabit = async () => {
    if (!habitName) return
    try {
      await addHabit(habitName)
      setHabitName('')
      setOpen(false)
    } catch (err) {
      setError('Failed to create habit')
      console.error(err)
    }
  }

  return (
    <div>
      <Button
        className='bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600'
        onClick={() => setOpen(true)}
      >
        Create Habit
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a New Habit</DialogTitle>
          </DialogHeader>
          <Input
            type='text'
            id='habit'
            name='habit'
            value={habitName}
            onChange={(e) => setHabitName(e.target.value)}
            className='w-full rounded-md border p-2'
            placeholder='Enter habit name'
            required
          />
          {error && <p className='text-red-500'>{error}</p>}
          <DialogFooter>
            <Button onClick={handleCreateHabit}>Save Habit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
