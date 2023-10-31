import Image from 'next/image'
import React from 'react'
import DisplayPhoto from '@/app/(pages)/discussion/images/displayphoto.png'
import Link from 'next/link'

export default function UserPhoto() {
  return (
    <Link href={'/profile'} className=' w-[2.5rem]'>
        <Image
            src={DisplayPhoto}
            alt='User Image'
        />
    </Link>
  )
}
