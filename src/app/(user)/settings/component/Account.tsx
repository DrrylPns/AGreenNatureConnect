import { Session } from 'next-auth'
import React from 'react'
import { PiCaretDown } from 'react-icons/pi'

interface AccountProps {
    session: Session | null
}

const Account: React.FC<AccountProps> = ({ session }) => {
    return (
        <div className='mt-5 font-poppins'>
            <h1 className='font-bold pl-10 my-5'>Account Setting</h1>
            <h2 className='pl-5 border-b border-gray-400 text-gray-400 uppercase text-[0.8rem]'>Account Preference</h2>
            <div className='flex items-center justify-between font-bold text-[0.8rem] pl-5 my-5'>
                <div>
                    <h3>Email Address</h3>
                    <p className='text-[0.8rem] text-gray-400 font-normal'>
                        {session ? (
                            <>
                                {session?.user.email}
                            </>
                        ) : (
                            <>
                                TODO NOT ACCESSIBLE DAPAT
                            </>
                        )}
                    </p>
                </div>
                <button type='button' className='font-semibold pl-10 my-5 mr-5'>Change</button>
            </div>
            <div className='flex items-center justify-between font-bold text-[0.8rem] pl-5 my-5'>
                <div>
                    <h3>Gender</h3>
                    <p className='text-[0.8rem] text-gray-400 font-normal'>This information may be used to improved your recommendations and ads.</p>
                </div>
                <button type='button' className='font-semibold pl-10 my-5 flex gap-3 items-center mr-5'>Select <PiCaretDown /></button>
            </div>
            <div className='flex items-center justify-between font-bold text-[0.8rem] pl-5 my-5'>
                <div>
                    <h3>Content Languages</h3>
                    <p className='text-[0.8rem] text-gray-400 font-normal'>Add languages youd'd like to see post, community, recommendations, and other content in</p>
                </div>
            </div>
            <div className='flex items-center justify-between font-bold text-[0.8rem] pl-5 my-5'>
                <div>
                    <h3>Change Password</h3>
                    <p className='text-[0.8rem] text-gray-400 font-normal'>Change your password anytime</p>
                </div>
            </div>
            <h2 className='pl-5 border-b border-gray-400 text-gray-400 uppercase text-[0.8rem]'>Delete Account</h2>
            <button type='button' className='font-bold pl-5 my-5 text-red-600'>
                Delete Account
            </button>
        </div>
    )
}

export default Account;