"use client"

import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/Ui/Avatar';
import { Separator } from '@/app/components/Ui/Separator';
import useAvatarModal from '@/lib/hooks/useAvatarModal';
import useGenderModal from '@/lib/hooks/useGenderModal';
import { User } from '@prisma/client';
import Link from 'next/link';
import React from 'react';

interface AccountSettingsProps {
    user: User
}

export const AccountSettings: React.FC<AccountSettingsProps> = ({ user }) => {
    const genderModal = useGenderModal()
    const avatarModal = useAvatarModal()
    const firstLetter = user.name?.charAt(0)

    return (
        <div className='ml-3 space-y-4'>
            <div className='space-y-1 flex flex-col justify-start items-start'>
                <p className='dark:text-white text-black font-medium'>Email</p>
                <p className='text-muted-foreground'>{user.email}</p>
            </div>

            <div className='flex justify-between items-center'>
                <div>
                    <p className='dark:text-white text-black font-medium'>Gender</p>
                    <p className='text-muted-foreground'>
                        {!user.gender && "You have not set a gender yet."}
                        {user.gender}
                    </p>
                </div>
                <div className='cursor-pointer text-blue-500 font-medium' onClick={() => {
                    genderModal.onOpen()
                }}>
                    Change
                </div>
            </div>

            <div className='space-y-1 flex flex-col justify-start items-start'>
                <p className='dark:text-white text-black font-medium'>Change Password</p>
                <p className='text-muted-foreground'>
                    <Link href="/changepassword" className='text-blue-500'>
                        Click here to change your password!
                    </Link>
                </p>
            </div>

            <Separator />

            <p className='dark:text-white text-black font-medium'>Avatar</p>
            <div className='flex flex-col items-center'>
                <div className='space-y-1'>
                    <Avatar className='h-[90px] w-[90px] flex items-center justify-center'>
                        <AvatarImage src={user.image as string} className='w-[90px] h-[90px] flex items-center justify-center' />
                        <AvatarFallback>{firstLetter}</AvatarFallback>
                    </Avatar>
                </div>

                <div
                    className='cursor-pointer text-blue-500 font-medium mt-1'
                    onClick={avatarModal.onOpen}
                >
                    Change
                </div>
            </div>
        </div>
    )
}
