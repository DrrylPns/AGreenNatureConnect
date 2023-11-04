"use client"
import { Tab } from '@headlessui/react'
import React, { useEffect } from 'react'
import Account from '../component/Account'
import Profile from '../component/Profile'
import Notification from '../component/Notification'
import { Session } from 'next-auth'
import { User } from '@prisma/client'

interface MainSettingsProps {
    session: Session | null;
    user: User | null;
    isGoogleProvider: boolean;
}

const MainSettings: React.FC<MainSettingsProps> = ({ 
    session,
    user,
    isGoogleProvider
}) => {

    return (
        <div className='pl-[0] md:pl-[22%] md:pr-[7%] pt-[8rem] bg-[#F0EEF6] md:pt-[6rem] min-h-[100vh] h-full font-poppins'>
            <h1 className='font-bold text-center md:text-left'>User Settings</h1>
            <Tab.Group>
                <Tab.List className='flex justify-center md:justify-normal border-b border-black py-2 gap-20 px-5'>
                    <Tab className="border-b-2 ui-selected:border-b-green  ui-selected:text-black ui-not-selected:text-black">
                        Account
                    </Tab>
                    <Tab className="border-b-2 ui-selected:border-b-green  ui-selected:text-black ui-not-selected:text-black">
                        Profile
                    </Tab>
                    <Tab className="border-b-2 ui-selected:border-b-green  ui-selected:text-black ui-not-selected:text-black">
                        Notification
                    </Tab>
                </Tab.List>
                <Tab.Panels>
                    <Tab.Panel>
                        <Account session={session} user={user} isGoogleProvider={isGoogleProvider}/>
                    </Tab.Panel>
                    <Tab.Panel>
                        <Profile session={session} user={user} isGoogleProvider={isGoogleProvider}/>
                    </Tab.Panel>
                    <Tab.Panel>
                        <Notification />
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
        </div>
    )
}

export default MainSettings