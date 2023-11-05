"use client"
import { User } from '@prisma/client';
import { Session } from 'next-auth'
import React, { useState } from 'react'
import { ChangeGenderType } from '@/lib/validations/changeGenderSchema';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from '@/lib/hooks/use-toast';
import { Button } from '@/app/components/Ui/Button';
import { useRouter } from 'next/navigation';

interface AccountProps {
    session: Session | null;
    user: User | null;
    isGoogleProvider: boolean;
}

const Account: React.FC<AccountProps> = ({
    session,
    user,
    isGoogleProvider
}) => {
    const [selectedGender, setSelectedGender] = useState<string>("")
    const [profileState, setProfileState] = useState<boolean>(false)
    const router = useRouter()

    const { mutate: updateGender, isLoading } = useMutation({
        mutationFn: async () => {
            const payload: ChangeGenderType = {
                gender: selectedGender
            }
            const { data } = await axios.post('api/user/editGender', JSON.stringify(payload), {
                headers: {
                    "Content-Type": 'application/json',
                },
            });
            return data as string
        },
        onError: (err: any) => {
            setProfileState(false)
            toast({
                title: "There was an error.",
                description: `${err.message} asd qwe asd ewq asdqwe` || "An error occured",
                variant: 'destructive',
            })
        },
        onSuccess: (data) => {
            setProfileState(false)
            toast({
                title: "Success!.",
                description: data,
            })
            router.refresh()
        }
    })

    return (
        <div className='mt-5 font-poppins'>
            <h1 className='font-bold pl-10 my-5'>Account Setting</h1>
            <h2 className='pl-5 border-b border-gray-400 text-gray-400 uppercase text-[0.8rem]'>Account Preference</h2>
            <h2 className='pl-5 mt-5 cursor-pointer' onClick={() => setProfileState((prev) => !prev)}>
                {profileState ? 'Cancel' : 'Edit Profile'}
            </h2>
            <div className='flex items-center justify-between font-bold text-[0.8rem] pl-5 my-5'>
                <div>
                    <h3>Email Address</h3>
                    <p className='text-[0.8rem] text-gray-400 font-normal'>
                        {session ? (
                            <>
                                {user?.email}
                            </>
                        ) : (
                            <>
                                {/* TODO NOT ACCESSIBLE DAPAT */}
                            </>
                        )}
                    </p>
                </div>

            </div>
            <div className='flex items-center justify-between font-bold text-[0.8rem] pl-5 my-5'>

                <div>
                    <h3>Gender</h3>

                    {user?.gender === null || user?.gender === undefined ? (
                        <p className='text-[0.8rem] text-gray-400 font-normal'>You did not set a gender yet.</p>
                    ) : (
                        <p className='text-[0.8rem] text-gray-400 font-normal'>{user?.gender}</p>
                    )}
                </div>
                {profileState && (
                    <select
                        value={selectedGender || ''}
                        onChange={(e) => setSelectedGender(e.target.value)}
                    >

                        <option value="" disabled hidden>Select a gender</option>
                        <option value="MALE">MALE</option>
                        <option value="FEMALE">FEMALE</option>
                        <option value="OTHER">OTHER</option>
                    </select>
                )}

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
                <button type='button' className='font-semibold pl-10 my-5 mr-5'>Change</button>
            </div>
            {profileState && (
                <Button
                    variant={'green'}
                    className={'ml-5 mb-5'}
                    isLoading={isLoading}
                    disabled={selectedGender.length === 0 || selectedGender === null}
                    onClick={() => updateGender()}
                >Update</Button>
            )}
            <h2 className='pl-5 border-b border-gray-400 text-gray-400 uppercase text-[0.8rem]'>Delete Account</h2>
            <button type='button' className='font-bold pl-5 my-5 text-red-600'>
                Delete Account
            </button>
        </div>
    )
}

export default Account;