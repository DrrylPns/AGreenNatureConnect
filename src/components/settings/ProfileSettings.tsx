"use client"

import { Button } from "@/app/components/Ui/Button"
import useProfileModal from "@/lib/hooks/useProfileModal"
import useUsernameModal from "@/lib/hooks/useUsernameModal"
import { calculateAge, calculateDaysUntilUsernameChange, formatDate } from "@/lib/utils"
import { User } from "@prisma/client"
import React from "react"

interface ProfileSettingsProps {
    user: User
}

export const ProfileSettings: React.FC<ProfileSettingsProps> = ({ user }) => {
    const isBirthdayNull = user?.birthday === null;
    const isAddressNull = user?.address === null;
    const daysLeft = calculateDaysUntilUsernameChange(user.lastUsernameChange as Date);
    const profileModal = useProfileModal()
    const usernameModal = useUsernameModal()

    return (
        <div className='ml-3 space-y-4'>

            <div className="w-full flex justify-end font-medium text-blue-500">
                <div className="text-blue-500 cursor-pointer" onClick={profileModal.onOpen}>
                    Edit Profile
                </div>
            </div>

            <div className='flex justify-between items-center'>
                <div>
                    <p className='dark:text-white text-black font-medium'>Username</p>
                    <p className='text-muted-foreground'>
                        {user.username}
                    </p>
                </div>
                <div className='text-blue-500 font-medium'>
                    {daysLeft > 0 ? (
                        <>
                            You can change your username in {daysLeft} {daysLeft === 1 ? 'day' : 'days'}.
                        </>
                    ) :
                        <>
                            <p className="cursor-pointer" onClick={usernameModal.onOpen}>Change</p>
                        </>
                    }
                </div>
            </div>

            <div className='space-y-1 flex flex-col justify-start items-start'>
                <p className='dark:text-white text-black font-medium'>Phone</p>
                <p className='text-muted-foreground'>{user.phoneNumber}</p>
            </div>

            <div className='space-y-1 flex flex-col justify-start items-start'>
                <p className='dark:text-white text-black font-medium'>Birthday</p>
                <p className='text-muted-foreground'>{formatDate(user.birthday as Date)}</p>
            </div>

            <div className='space-y-1 flex flex-col justify-start items-start'>
                <p className='dark:text-white text-black font-medium'>Age</p>
                <p className='text-muted-foreground'>
                    {isBirthdayNull ? "You did not set your age yet."
                        // @ts-ignore TODO
                        : calculateAge(user.birthday)}
                </p>
            </div>

            <div className='space-y-1 flex flex-col justify-start items-start'>
                <p className='dark:text-white text-black font-medium'>Address</p>
                <p className='text-muted-foreground'>
                    {isAddressNull ? "You did not set an address yet."
                        : `${user?.address}`}
                </p>
            </div>
        </div>
    )
}
