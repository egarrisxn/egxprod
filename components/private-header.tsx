import {InfoIcon} from 'lucide-react'

export default function PrivateHeader() {
  return (
    <div className='w-full'>
      <div className='container mx-auto flex items-center justify-start gap-2 p-2 text-sm font-medium sm:px-4 lg:px-10'>
        <InfoIcon size='16' strokeWidth={2} />
        This is a secure page only you can see.
      </div>
    </div>
  )
}
