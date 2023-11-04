import React from 'react'
import { PiCaretDown } from 'react-icons/pi'

export default function Profile() {
  return (
    <div className='relative max-h-full overflow-auto mt-5 font-poppins'>
        <h1 className='font-bold pl-10 pb-5'>Customize Profile</h1>
        <h2 className='pl-5 border-b border-gray-400 text-gray-400 uppercase text-[0.8rem]'>Profile Information</h2>
        <div className='flex items-center justify-between font-bold text-[0.8rem] pl-5 my-5'>
            <div> 
                <h3>Username</h3>
                <p className='text-[0.8rem] text-gray-400 font-normal'>@dummyUsername</p>
            </div>
        </div>
        <div className='flex items-center justify-between text-[0.8rem] font-bold pl-5 my-5'>
            <div>
                <h3>Phone</h3>
                <p className='text-[0.8rem] text-gray-400  font-normal'>+63902959559200</p>
            </div>
        </div>
        <div className='flex items-center justify-between text-[0.8rem] font-bold pl-5 my-5'>
            <div>
                <h3>Birthday</h3>
                <p className='text-[0.8rem] text-gray-400  font-normal'>February 31, 2001</p>
            </div>
        </div>
        <div className='flex items-center justify-between text-[0.8rem] font-bold pl-5 my-5'>
            <div>
                <h3>Age</h3>
                <p className='text-[0.8rem] text-gray-400  font-normal'>22</p>
            </div>
        </div>
        <div className='flex items-center justify-between text-[0.8rem] font-bold pl-5 my-5'>
            <div>
                <h3>Country</h3>
                <p className='text-[0.8rem] text-gray-400 font-normal'>Philippines</p>
            </div>
        </div>
      
    </div>
  )
}
