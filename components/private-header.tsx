import {InfoIcon} from 'lucide-react'

export default function PrivateHeader() {
  return (
    <div className='w-full bg-muted'>
      <div className='mx-auto flex items-center justify-center gap-2 p-3 text-sm sm:py-4'>
        <InfoIcon size='16' strokeWidth={2} />
        This is a secure page only an authenticated user can see.
      </div>
    </div>
  )
}
