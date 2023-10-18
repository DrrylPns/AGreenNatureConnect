import React from 'react'
import Image from 'next/image'
import LogoImage from '../../../../public/LOGO.png'
function Logo() {
  return (
    <div className='flex flex-row items-center'> 
        <Image
          src={LogoImage}
          alt='Logo'
          height={50}
          width={60}
        />
        <h1 className='text-green text-[20px] font-poppins font-bold ml-2'>AGreen <span className='text-amber'>Nature</span> Connect</h1>
      </div>
  )
}

export default Logo