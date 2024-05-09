import Image from 'next/image'
import React from 'react'
import DisplayPhoto from '../../../../../public/logo.png'
import { Button } from '@/app/components/Ui/Button'

export default function Edit() {
  return (
    <form className='pl-[0] md:pl-[22%] md:pr-[2%] pt-[8rem] bg-[#F0EEF6] md:pt-[6rem] min-h-[100vh] h-full font-poppins'>
        <div className='flex justify-between gap-5 flex-col'>
            <section className='w-full bg-gray-200 p-5 pb-10 rounded-3xl'>
                <div className='text-center'>
                    <h3 className='font-poppins font-bold text-[1.5rem]'>User Account Information</h3>
                </div>
                <div className='flex justify-between gap-5 my-10'>
                    <div className='w-1/2'>
                        <h3 className='font-bold text-[0.8rem] pl-2'>Username<span className='text-red-600'>*</span></h3>
                        <input type='text' value={'dummyUsername'} placeholder='username' className='w-full text-gray-400 px-5 py-1 rounded-2xl drop-shadow-sm shadow-sm'/>
                    </div>
                    <div className='w-1/2'>
                        <h3 className='font-bold text-[0.8rem] pl-2'>Email Address<span className='text-red-600'>*</span></h3>
                        <input type='text' value={'dummyUsername'} placeholder='username' className='w-full text-gray-400 px-5 py-1 rounded-2xl drop-shadow-sm shadow-sm'/>
                    </div>
                </div>
                <div className='flex justify-between gap-5'>
                    <div className='w-1/2'>
                        <h3 className='font-bold text-[0.8rem] pl-2'>First Name<span className='text-red-600'>*</span></h3>
                        <input type='text' value={'dummyUsername'} placeholder='username' className='w-full text-gray-400 px-5 py-1 rounded-2xl drop-shadow-sm shadow-sm'/>
                    </div>
                    <div className='w-1/2'>
                        <h3 className='font-bold text-[0.8rem] pl-2'>Last Name<span className='text-red-600'>*</span></h3>
                        <input type='text' value={'dummyUsername'} placeholder='username' className='w-full text-gray-400 px-5 py-1 rounded-2xl drop-shadow-sm shadow-sm'/>
                    </div>
                </div>
                <div className='w-full my-10'>
                    <h3 className='font-bold text-[0.8rem] pl-2'>House Address<span className='text-red-600'>*</span></h3>
                    <input type='text' value={'dummyUsername'} placeholder='username' className='w-full text-gray-400 px-5 py-1 rounded-2xl drop-shadow-sm shadow-sm'/>
                </div>
                <div className='flex justify-between gap-5 mb-10'>
                    <div className='w-1/2'>
                        <h3 className='font-bold text-[0.8rem] pl-2'>City<span className='text-red-600'>*</span></h3>
                        <input type='text' value={'dummyUsername'} placeholder='username' className='w-full text-gray-400 px-5 py-1 rounded-2xl drop-shadow-sm shadow-sm'/>
                    </div>
                    <div className='w-1/2'>
                        <h3 className='font-bold text-[0.8rem] pl-2'>Zip Code<span className='text-red-600'>*</span></h3>
                        <input type='number' className='w-full text-gray-400 px-5 py-1 rounded-2xl drop-shadow-sm shadow-sm'/>
                    </div>
                </div>
            </section>
            <section className='lg:w-[40%] w-full bg-gray-200 p-5'>
                <div className=' flex flex-col items-center justify-center'>
                    <div className=' border-4 border-green rounded-full w-40 h-40'>
                        <Image 
                            src={DisplayPhoto}
                            alt='User Image'
                            className='w-full h-full rounded-full object-center'
                            quality={100}
                        />
                    </div>
                    <button type='button' className='text-[0.7rem]'>Change photo</button>
                </div>
                <div className='w-full my-5'>
                    <h3 className='font-bold text-[0.8rem] pl-2'>Bio<span className='text-red-600'>*</span></h3>
                    <textarea placeholder='Describe yourself' className='w-full text-gray-400 px-5 py-1 rounded-2xl drop-shadow-sm shadow-sm'/>
                </div>   
                <div className='w-full my-5'>
                    <h3 className='font-bold text-[0.8rem] pl-2'>Contact number<span className='text-red-600'>*</span></h3>
                    <input type='number' placeholder='Describe yourself' className='w-full text-gray-400 px-5 py-1 rounded-2xl drop-shadow-sm shadow-sm'/>
                </div>   
                <div className='w-full my-5'>
                    <h3 className='font-bold text-[0.8rem] pl-2'>Password update<span className='text-red-600'>*</span></h3>
                    <input type='text' placeholder='' className='w-full text-gray-400 px-5 py-1 rounded-2xl drop-shadow-sm shadow-sm'/>
                </div>
                <Button type='submit' variant='green' className='w-full'>Update info</Button>
            </section>
        </div>
    </form>
  )
}
