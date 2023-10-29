import React from 'react'
import Logo from '../Logo/logo'
import Image from 'next/image'
import FacebookLogo from '../../../../public/images/facebook.png'
import TwitterLogo from '../../../../public/images/twitter.png'
import TiktokLogo from '../../../../public/images/tiktok.png'
import InstagramLogo from '../../../../public/images/instagram.png'
import Link from 'next/link'
export default function footer() {
  return (
    <footer className=' '>
      <div className='flex px-40 py-20 justify-between mx-10 border-b-2 border-black'>
        <div>
          <Logo />
          <div className='flex gap-10 my-3'>
            <Image
              src={FacebookLogo}
              alt='Facebook logo'
              width={20}
              height={20}
            />
            <Image
              src={TwitterLogo}
              alt='Twitter logo'
              width={20}
              height={20}
            />
            <Image
              src={TiktokLogo}
              alt='Tiktok logo'
              width={20}
              height={20}
            />
            <Image
              src={InstagramLogo}
              alt='instagram logo'
              width={20}
              height={20}
            />
          </div>
        </div>
        <div className='flex justify-between w-1/2'>
          <div className='flex flex-col gap-y-3'>
            <h3 className='text-poppins font-bold'>Pages</h3>
            <Link href="/">Home</Link>
          </div>
          <div className='flex flex-col gap-y-3'>
            <h3 className='text-poppins font-bold '>Services</h3>
            <Link href="/">Farmer's Market</Link>
            <Link href="/">Educational Program</Link>
            <Link href="/">Composting Service</Link>
          </div>
          <div className='flex flex-col gap-y-3'>
            <h3 className='text-poppins font-bold'>Organization</h3>
            <Link href="/">Privacy Policy</Link>
            <Link href="/">Terms and Condition</Link>
          </div>
        </div>
      </div>
      <div className='p-3 text-center'>
        <p>© 2023 Agreennatureconnect | Powered by agreennatureconnect</p>
      </div>
    </footer>
  )
}
