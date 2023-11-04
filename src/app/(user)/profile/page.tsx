'use client'
import { Button } from '@/app/components/Ui/Button'
import Image from 'next/image'
import React from 'react'
import DisplayPhoto from '../../../../public/logo.png'
import Link from 'next/link'
export default function Profile() {
  return (
    <main className='pl-[0] md:pl-[22%] md:pr-[7%] pt-[8rem] bg-[#F0EEF6] md:pt-[6rem] min-h-[100vh] h-full font-poppins'>
        <div className='bg-gray-200 rounded-[6rem] flex lg:flex-row p-10 gap-5 justify-between flex-col min-w-fit'>
            <section className='p-5 lg:w-[40%] text-center '>
                <div className=' flex items-center justify-center'>
                    <div className=' border-4 border-green p-5 rounded-full'>
                        <Image 
                            src={DisplayPhoto}
                            alt='User Image'
                            className='rounded-full object-center'
                            width={100}
                            height={100}
                        />
                    </div>
                </div>               
                <h1 className='text-gray-600 text-[1.1rem] font-bold my-3'>@DummyUsername</h1>
                <h3 className='text-red-600'>Email address</h3>
                <p className='text-gray-600 text-[0.9rem] font-bold mb-3'>DUmydummy@gmail.com</p>
                <p className='text-ellipsis line-clamp-6 text-[0.8rem]'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magni, pariatur? Cumque officia a fuga quidem repellendus delectus commodi laborum non harum molestias natus quod, facere sed odit, perferendis nulla sit!</p>
                <Button variant='green' className='rounded-full mt-3'>
                    <Link href={'/profile/edit'}>
                        Edit Profile
                    </Link>
                </Button>
            </section>
            <section className='rounded-[6rem] border-2 border-green p-10'>
                <h1 className='font-poppins font-bold text-[1.1rem]'>Contact Information</h1>
                <div className='flex text-gray-400 font-poppins my-5'>
                    <h3 className='w-[15rem]'>Full Name:</h3>
                    <h3 className='text-gray-600 font-semibold w-[50%]'>dummy fullname</h3>
                </div>
                <div className='flex text-gray-400 font-poppins my-5'>
                    <h3 className='w-[15rem]'>Mobile number:</h3>
                    <h3 className='text-gray-600 font-semibold w-[50%]'>09090901541</h3>
                </div>
                <div className='flex text-gray-400 font-poppins my-5'>
                    <h3 className='w-[15rem]'>Location:</h3>
                    <h3 className='text-gray-600 font-semibold w-[50%]'>Metro Manila Philippines</h3>
                </div>
                <div className='flex text-gray-400 font-poppins my-5'>
                    <h3 className='w-[15rem]'>Home Address:</h3>
                    <h3 className='text-gray-600 font-semibold w-[50%]'>Multi Purpose Brgy Common.Pilot Drive, Quezon City.</h3>
                </div>
                <h1 className='font-poppins font-bold text-[1.1rem]'>Basic Information</h1>
                <div className='flex text-gray-400 font-poppins my-5'>
                    <h3 className='w-[15rem]'>Birthday:</h3>
                    <h3 className='text-gray-600 font-semibold w-[50%]'>dummy fullname</h3>
                </div>
                <div className='flex text-gray-400 font-poppins my-5'>
                    <h3 className='w-[15rem] '>Gender:</h3>
                    <h3 className='text-gray-600 font-semibold w-[50%]'>Female</h3>
                </div>
            </section>
        </div>
    </main>
  )
}
