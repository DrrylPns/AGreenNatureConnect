import { User } from '@prisma/client';
import { Session } from 'next-auth'
import React from 'react'
import { PiCaretDown } from 'react-icons/pi'

interface ProfileProps {
    session: Session | null;
    user: User | null;
    isGoogleProvider: boolean;
}

const Profile: React.FC<ProfileProps> = ({ 
    session,
    user,
    isGoogleProvider
 }) => {
    //to add logic and update prisma database

     const isPhoneNull = user?.phoneNumber === null;
     const isBirthdayNull = user?.birthday === null;
     const isAddressNull = user?.address === null;

    return (
        <div className='relative max-h-full overflow-auto mt-5 font-poppins'>
            <h1 className='font-bold pl-10 pb-5'>Customize Profile</h1>
            <h2 className='pl-5 border-b border-gray-400 text-gray-400 uppercase text-[0.8rem]'>Profile Information</h2>
            <div className='flex items-center justify-between font-bold text-[0.8rem] pl-5 my-5'>
                <div>
                    <h3>Username</h3>
                    <p className='text-[0.8rem] text-gray-400 font-normal'>
                        {session ? (
                            <>
                                {user?.username}
                            </>
                        ) : (
                            <>
                                TODO NOT ACCESSIBLE DAPAT
                            </>
                        )}
                    </p>
                </div>
            </div>
            <div className='flex items-center justify-between text-[0.8rem] font-bold pl-5 my-5'>
                <div>
                    <h3>Phone</h3>
                    <p className='text-[0.8rem] text-gray-400  font-normal'>
                        {isPhoneNull ? "You did not set a phone number yet." 
                            : `${user?.phoneNumber}`}
                    </p>
                </div>
            </div>
            <div className='flex items-center justify-between text-[0.8rem] font-bold pl-5 my-5'>
                <div>
                    <h3>Birthday</h3>
                    <p className='text-[0.8rem] text-gray-400  font-normal'>{isBirthdayNull ? "You did not set a birthday yet."
                        : `${user?.phoneNumber}`}
                    </p>
                </div>
            </div>
            <div className='flex items-center justify-between text-[0.8rem] font-bold pl-5 my-5'>
                <div>
                    <h3>Age</h3>
                    <p className='text-[0.8rem] text-gray-400  font-normal'>{isBirthdayNull ? "You did not set your age yet."
                        : `${user?.phoneNumber}`}
                    </p>
                </div>
            </div>
            <div className='flex items-center justify-between text-[0.8rem] font-bold pl-5 my-5'>
                <div>
                    <h3>Address</h3>
                    <p className='text-[0.8rem] text-gray-400 font-normal'>{isAddressNull ? "You did not set an address yet." 
                        : `${user?.address}`}
                    </p>
                </div>
            </div>

        </div>
    )
}

export default Profile