'use client'
import { getAuthSession } from '@/lib/auth';
import prisma from '@/lib/db/db';
import Image from 'next/image';
import React, { use, useEffect, useState } from 'react'
import DisplayPhoto from "@/../public/images/default-user.jpg";
import { Badge } from '@/components/ui/badge';
import RelativeDate from '@/app/components/RelativeDate';
import UserPost from '../../components/UserPost';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { Author } from '@/lib/types';
import RotatingLinesLoading from '@/app/(markethub)/components/RotatingLinesLoading';
import { Button } from '@/components/ui/button';

function page({
    params,
    searchParams
}:{
    params: { username: string},
    searchParams: {id:string}
}) {
    const [user, setUser] = useState<Author>()
    const [loading, setLoading] = useState<boolean>(true)
    const session = useSession()
    const username = params.username.replace(/%20/g, ' ');

    useEffect(()=>{
        getUser()
        setTimeout(()=>{
            setLoading(false)
        },2000)
    },[])

    const getUser = async ()=>{
        const res = await axios.get(`/api/user/${searchParams.id}`)
        setUser(res.data)
    }
    
  return (
    <>
    {!loading ? (

   
    <div className='w-full mt-5 bg-gray-50' >
        {user && (
            <div className='w-full border-gray-300 border-2 px-2'>
                <div className='w-full flex bg-gray-100 flex-col items-center justify-center mb-2 py-2 border-gray-200 border-b '>
                    <div
                    className="flex items-center overflow-hidden justify-center  rounded-full border w-20 h-20 border-black"
                    >
                    {/*User Image, add default image if the user doesn't have DP user image will comes from the backend*/}
                    <Image
                        src={user?.image || DisplayPhoto}
                        alt="User Image"
                        width={40}
                        height={40}
                        className='w-full h-full object-cover'
                    />
                    </div>
                    <h1>{user?.username}</h1>
                    {user.bio !== '' ? (
                            <p>{user.bio}</p>
                        ):(
                            <p className='text-[0.6rem] text-gray-400'>No bio has been putted!</p>
                        )}
                </div>
                <div className='flex justify-between items-center' >
                    <div>
                        {user.name !== '' && user.lastName !== '' && (
                            <h1>Full Name:{user?.name} {user.middleName} {user.lastName}</h1>
                        )}
                        <h1>Role:<Badge variant="secondary" className={`${user.role === "ADMIN" && "bg-green"} ${user.role === "EMPLOYEE" && "bg-yellow-300"}`}>{user.role === "USER"? "Member": user.role}</Badge></h1>
                        <h1>Email:{user?.email}</h1>
                        <h1>Member since: <RelativeDate dateString={user.createdAt}/></h1>
                    </div>
                    {session.data?.user.id === user.id && (
                        <div>
                            <Button variant={'link'}>Edit Profile</Button>
                        </div>
                    )}
                   
                </div>
               
            </div>
        )}
         <div className='border-gray-300 border shadow-inner bg-gray-50'>
            <h1 className='py-3 mb-3 border-gray-300 border-b-2 shadow-lg text-center'>Posts</h1>   
            <div className='px-2 sm:px-5'>
                <UserPost id={searchParams.id}/>
            </div>         
        </div>
    </div>
    ):(
        <RotatingLinesLoading/>
    )}
    </>
  )
}

export default page