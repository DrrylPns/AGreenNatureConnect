import Image from 'next/image'
import React from 'react'
import DisplayPhoto from '@/app/(pages)/discussion/images/displayphoto.png'

export default function UserPhoto() {
  return (
    <button className=' w-[2.5rem]'>
        <Image
            src={DisplayPhoto}
            alt='User Image'
        />
    </button>
  )
}
