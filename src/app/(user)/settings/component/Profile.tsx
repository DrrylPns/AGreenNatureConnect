"use client"
import { Button } from '@/app/components/Ui/Button';
import { toast } from '@/lib/hooks/use-toast';
import { calculateAge, calculateDaysUntilUsernameChange, formatDate } from '@/lib/utils';
import { ChangeUserProfileSchema, ChangeUserProfileType } from '@/lib/validations/changeUserProfile';
import { zodResolver } from '@hookform/resolvers/zod';
import { User } from '@prisma/client';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { Session } from 'next-auth'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';


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

    const [profileState, setProfileState] = useState(false);

    const daysLeft = calculateDaysUntilUsernameChange(user?.lastUsernameChange as Date);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ChangeUserProfileType>({
        resolver: zodResolver(ChangeUserProfileSchema),
        defaultValues: {
            newUsername: user?.username || "",
            newPhone: user?.phoneNumber || "",
            //@ts-ignore // TODO
            newBirthday: user?.birthday ? new Date(user.birthday).toISOString().split("T")[0] : "",
            newAddress: user?.address || "",
        }
    })

    const { mutate: updateUser, isLoading } = useMutation({
        mutationFn: async ({
            newUsername,
            newPhone,
            newBirthday,
            newAddress,
        }: ChangeUserProfileType) => {
            const payload: ChangeUserProfileType = {
                newUsername: newUsername ? newUsername : undefined,
                newPhone: newPhone ? newPhone : undefined,
                newBirthday: newBirthday ? newBirthday : undefined,
                newAddress: newAddress ? newAddress : undefined,
            };
            const { data } = await axios.post("api/user/editUser", payload);
            return data;
        },
        onError: (err) => {
            if (err instanceof AxiosError) {
                if (err instanceof AxiosError) {
                    if (err.response?.status === 400) {
                        return toast({
                            title: "Action failed!",
                            description: err.response.data,
                            variant: "destructive",
                        });
                    }
                    if (err.response?.status === 405) {
                        return toast({
                            title: "Invalid Action",
                            description: "Method not allowed",
                            variant: "destructive",
                        });
                    }
                    if (err.response?.status === 409) {
                        return toast({
                            title: "Invalid username",
                            description: "Username already exists. Please use a different one.",
                            variant: "destructive",
                        });
                    }
                } else {
                    return toast({
                        title: "Error!",
                        description: "Error: Something went wrong!",
                        variant: "destructive",
                    });
                }
            }
        },
        onSuccess: () => {
            toast({
                title: "Success!",
                description: "Updated account successfully!",
                variant: "default",
            });
            // 1sec para makita lang yung toast sobrang bilis mag refresh eh ahaha pero kung di niyo bet tanggalin nalang settimeout
            setTimeout(() => {
                window.location.reload();
            }, 1000)
        },
    });

    const onSubmit: SubmitHandler<ChangeUserProfileType> = (data: ChangeUserProfileType) => {
        const payload: ChangeUserProfileType = {
            newUsername: data.newUsername,
            newPhone: data.newPhone,
            newBirthday: data.newBirthday,
            newAddress: data.newAddress
        }

        updateUser(payload)
    }

    return (
        <>
            {!profileState ? (
                <div className='relative max-h-full overflow-auto mt-5 font-poppins'>
                    <h1 className='font-bold pl-10 pb-5'>Customize Profile</h1>
                    <h2 className='pl-5 border-b border-gray-400 text-gray-400 uppercase text-[0.8rem]'>Profile Information</h2>
                    <h2 className='cursor-pointer' onClick={() => setProfileState((prev) => !prev)}>Edit profile</h2>
                    <div className='flex items-center justify-between font-bold text-[0.8rem] pl-5 my-5'>
                        <div className='flex justify-between'>
                            <div>
                                <h3>Username</h3>
                                <p className='text-[0.8rem] text-gray-400 font-normal'>
                                    {user?.username}
                                </p>
                            </div>
                            <div>
                                {daysLeft > 0 ? (
                                    <>
                                        You can change your username in {daysLeft} {daysLeft === 1 ? 'day' : 'days'}.
                                    </>
                                ) :
                                    <>
                                        <p>You can change your username now.</p>
                                    </>
                                }
                            </div>
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
                                // @ts-ignore TODO
                                : formatDate(user?.birthday)}
                            </p>
                        </div>
                    </div>
                    <div className='flex items-center justify-between text-[0.8rem] font-bold pl-5 my-5'>
                        <div>
                            <h3>Age</h3>
                            <p className='text-[0.8rem] text-gray-400  font-normal'>{isBirthdayNull ? "You did not set your age yet."
                                // @ts-ignore TODO
                                : calculateAge(user?.birthday)}
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
                : (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='relative max-h-full overflow-auto mt-5 font-poppins'>
                            <h1 className='font-bold pl-10 pb-5'>Customize Profile</h1>
                            <h2 className='pl-5 border-b border-gray-400 text-gray-400 uppercase text-[0.8rem]'>Profile Information</h2>

                            <h2 className='cursor-pointer' onClick={() => setProfileState((prev) => !prev)}>
                                {profileState ? 'Cancel' : 'Edit Profile'}
                            </h2>
                            <div className='flex items-center justify-between font-bold text-[0.8rem] pl-5 my-5'>

                                {daysLeft > 0 ? (<>
                                    <div>
                                        <h3>Username</h3>
                                        <p className='text-[0.8rem] text-gray-400 font-normal'>
                                            {user?.username}
                                        </p>
                                    </div>
                                </>) :
                                    (<>
                                        <div>
                                            <input
                                                id='newUsername'
                                                type="text"
                                                defaultValue={user?.username as string}
                                                {...register('newUsername', {
                                                    required: daysLeft === 0,
                                                })}
                                            />
                                            <span className="text-rose-500 ml-1 max-sm:text-[13px]">
                                                {errors.newUsername && errors.newUsername.message}
                                            </span>
                                        </div>
                                    </>)}
                            </div>
                            <div className='flex items-center justify-between text-[0.8rem] font-bold pl-5 my-5'>
                                <div>
                                    <h3>Phone</h3>
                                    <input
                                        id='newPhone'
                                        type="number"
                                        defaultValue={user?.phoneNumber as string}
                                        {...register('newPhone')}
                                    />
                                    <span className="text-rose-500 ml-1 max-sm:text-[13px]">
                                        {errors.newPhone && errors.newPhone.message}
                                    </span>
                                </div>
                            </div>
                            <div className='flex items-center justify-between text-[0.8rem] font-bold pl-5 my-5'>
                                <div>
                                    <h3>Birthday</h3>
                                    <input
                                        id='newBirthday'
                                        type="date"
                                        defaultValue={user?.birthday ? new Date(user.birthday).toISOString().split('T')[0] : ''}
                                        {...register('newBirthday')}
                                    />
                                    <span className="text-rose-500 ml-1 max-sm:text-[13px]">
                                        {errors.newBirthday && errors.newBirthday.message}
                                    </span>
                                </div>
                            </div>
                            <div className='flex items-center justify-between text-[0.8rem] font-bold pl-5 my-5'>
                                <div>
                                    <h3>Age</h3>
                                    <p className='text-[0.8rem] text-gray-400  font-normal'>{isBirthdayNull ? "You did not set your age yet."
                                        : `Please fill up your birthday.`}
                                    </p>
                                </div>
                            </div>
                            <div className='flex items-center justify-between text-[0.8rem] font-bold pl-5 my-5'>
                                <div>
                                    <h3>Address</h3>
                                    <input
                                        id='newAddress'
                                        type="textarea"
                                        defaultValue={user?.address as string}
                                        {...register('newAddress')}
                                    />
                                    <span className="text-rose-500 ml-1 max-sm:text-[13px]">
                                        {errors.newAddress && errors.newAddress.message}
                                    </span>
                                </div>
                            </div>

                            <Button
                                variant={'green'}
                                className={'ml-5 mb-5'}
                                isLoading={isLoading}
                            // disabled={}
                            >Update</Button>
                        </div>
                    </form>
                )
            }
        </>
    )
}

export default Profile