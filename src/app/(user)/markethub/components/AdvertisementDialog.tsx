'use client'
import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import Image from 'next/image'
import Free from '../images/Free.png'
import Link from 'next/link'
export default function AdvertisementDialog() {
  let [isOpen, setIsOpen] = useState(true)

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      {/* Full-screen container to center the panel */}
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        {/* The actual dialog panel  */}
        <Dialog.Panel className="mx-auto max-w-4xl rounded bg-transparent ">
          <div className='relative w-full h-full '>
            <Link href={'/markethub/free-products'} className='b border-none bg-none'>
                <Image 
                    src={Free} 
                    alt='Free'
                    width={1000}
                    height={1000}
                    className='w-full h-full object-coverborder border-yellow-300'
                />
            </Link>
            <button type='button' onClick={()=>{setIsOpen(false)}} className='absolute top-5 right-5 text-white '>X</button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}