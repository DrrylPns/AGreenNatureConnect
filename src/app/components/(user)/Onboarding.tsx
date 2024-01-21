"use client"
import { toast } from '@/lib/hooks/use-toast';
import { getMinBirthDate } from '@/lib/utils';
import { OnboardingSchema, OnboardingType } from '@/lib/validations/onboardingSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '../Ui/Button';
import { X } from 'lucide-react';
import { signOut } from 'next-auth/react';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/app/components/Ui/select"

export const Onboarding = () => {
    // const router = useRouter()

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<OnboardingType>({
        resolver: zodResolver(OnboardingSchema),
        defaultValues: {
            username: "",
            phoneNumber: "",
            address: "",
        },
    });

    const handleSelectChange = (value: string | null) => {
        // Check for null and handle accordingly
        const communityValue = value !== null ? value : ""; // or provide a default value

        setValue('community', communityValue);
        console.log('Selected community:', communityValue);
    };

    const { mutate: onboardingUpdate, isLoading } = useMutation({
        mutationFn: async ({
            username,
            phoneNumber,
            birthday,
            community,
            address,
        }: OnboardingType) => {
            const payload: OnboardingType = {
                username,
                phoneNumber,
                birthday,
                community,
                address,
            };
            const { data } = await axios.post("api/user/onboarding", payload);
            return data
        },
        onError: (err) => {
            if (err instanceof AxiosError) {
                if (err instanceof AxiosError) {
                    if (err.response?.status === 400) {
                        return toast({
                            title: "Invalid Action",
                            description: "Phone Number already exists. Please use a different one.",
                            variant: "destructive",
                        });
                    }
                    if (err.response?.status === 401) {
                        return toast({
                            title: "Invalid Action",
                            description: "Unauthorized.",
                            variant: "destructive",
                        });
                    }
                    if (err.response?.status === 404) {
                        return toast({
                            title: "Invalid Action",
                            description: "User not found!",
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

            setTimeout(() => {
                window.location.reload()
            }, 1000)
        }
    })

    const onSubmit: SubmitHandler<OnboardingType> = (data: OnboardingType) => {
        const payload: OnboardingType = {
            username: data.username,
            phoneNumber: data.phoneNumber,
            birthday: data.birthday,
            community: data.community,
            address: data.address,
        }

        onboardingUpdate(payload)
    }

    const handleSignOut = () => {
        toast({
            title: "Logging out",
            description: "You have been automatically logged out because you cancelled onboarding.",
            variant: "destructive",
        });

        setTimeout(() => {
            signOut()
        }, 2000)
    }


    return (
        <main className="flex flex-col items-center justify-center border min-h-screen">
            <div
                className="border rounded-xl bg-[#F0EEF6] shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] p-2"
            >
                {/** X Button */}
                <div className="flex justify-end m-3">
                    <Button variant='ghost' className='rounded-full' onClick={handleSignOut}>
                        <X />
                    </Button>
                </div>
                {/** Labels */}
                <div className="grid justify-items-start pt-2 pl-10 pr-10 text-black">
                    <label htmlFor="" className="text-[30px] font-bold">
                        Onboarding
                    </label>
                    <div className="label-container md:text-[16px] text-[13px]">
                        <p className="text-left text-neutral-500">
                            Fill out forms, to continue using AGreen Nature Connect
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    {/** input */}
                    <div className="input-container grid gap-1 h-[80px] mt-5 ml-10 mr-10">
                        <div className="relative mb-3">
                            <input
                                type="text"
                                className="rounded-full peer m-0 block h-[53px] w-full bg-white bg-clip-padding px-3 py-4 text-base font-normal leading-tight text-black transition duration-200 ease-linear placeholder:text-transparent focus:border-primary focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-neutral-700 focus:outline-none peer-focus:text-primary  dark:peer-focus:text-primary [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem]"
                                id="username"
                                placeholder=""
                                {...register("username")}
                            />
                            <label
                                htmlFor="username"
                                className="pointer-events-none absolute left-0 text-[14px] top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-[#00000080] transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none dark:peer-focus:text-primary"
                            >
                                Username<span className="text-[#FF2222]">*</span>
                            </label>
                        </div>
                    </div>
                    {errors.username && (
                        <span className="text-rose-500 ml-1 max-sm:text-[13px]">
                            {errors.username.message}
                        </span>
                    )}

                    <div className="input-container grid gap-1 h-[80px] ml-10 mr-10">
                        <div className="relative mb-3">
                            <input
                                type="number"
                                className="rounded-full peer m-0 block h-[53px] w-full bg-white bg-clip-padding px-3 py-4 text-base font-normal leading-tight text-black transition duration-200 ease-linear placeholder:text-transparent focus:border-primary focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-neutral-700 focus:outline-none peer-focus:text-primary  dark:peer-focus:text-primary [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem]"
                                id="phoneNumber"
                                placeholder=""

                                {...register("phoneNumber")}
                            />
                            <label
                                htmlFor="phoneNumber"
                                className="pointer-events-none absolute left-0 text-[14px] top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-[#00000080] transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none dark:peer-focus:text-primary"
                            >
                                Phone Number<span className="text-[#FF2222]">*</span>
                            </label>
                        </div>
                    </div>
                    {errors.phoneNumber && (
                        <span className="text-rose-500 ml-1 max-sm:text-[13px]">
                            {errors.phoneNumber.message}
                        </span>
                    )}

                    <div className="input-container grid gap-1 h-[80px] ml-10 mr-10">
                        <div className="relative mb-3">
                            <input
                                type="date"
                                className="rounded-full peer m-0 block h-[53px] w-full bg-white bg-clip-padding px-3 py-4 text-base font-normal leading-tight text-black transition duration-200 ease-linear placeholder:text-transparent focus:border-primary focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-neutral-700 focus:outline-none peer-focus:text-primary  dark:peer-focus:text-primary [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem]"
                                id="birthday"
                                placeholder=""
                                {...register("birthday")}
                                max={getMinBirthDate()}
                            />
                            <label
                                htmlFor="birthday"
                                className="pointer-events-none absolute left-0 text-[14px] top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-[#00000080] transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none dark:peer-focus:text-primary"
                            >
                                Birthday<span className="text-[#FF2222]">*</span>
                            </label>
                        </div>
                    </div>
                    {errors.birthday && (
                        <span className="text-rose-500 ml-1 max-sm:text-[13px]">
                            {errors.birthday.message}
                        </span>
                    )}


                    <div className="input-container grid gap-1 h-[80px] ml-10 mr-10">
                        <div className="relative mb-3">
                            <input
                                type="text"
                                className="rounded-full peer m-0 block h-[53px] w-full bg-white bg-clip-padding px-3 py-4 text-base font-normal leading-tight text-black transition duration-200 ease-linear placeholder:text-transparent focus:border-primary focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-neutral-700 focus:outline-none peer-focus:text-primary  dark:peer-focus:text-primary [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem]"
                                id="address"
                                placeholder=""
                                {...register("address")}
                            />
                            <label
                                htmlFor="address"
                                className="pointer-events-none absolute left-0 text-[14px] top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-[#00000080] transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none dark:peer-focus:text-primary"
                            >
                                Address<span className="text-[#FF2222]">*</span>
                            </label>
                        </div>
                    </div>
                    {errors.address && (
                        <span className="text-rose-500 ml-1 max-sm:text-[13px]">
                            {errors.address.message}
                        </span>
                    )}
                    <div className='w-full flex items-center justify-center'>
                        <Select
                            {...register('community')}
                            onValueChange={handleSelectChange}
                        >
                            <SelectTrigger className="
                                md:w-[620px]
                                rounded-full
                                h-[50px]
                                p-4
                                mb-8
                                dark:bg-[#09090B]
                                font-light 
                                bg-white 
                                border-2
                                outline-none
                                transition
                                disabled:opacity-70
                                disabled:cursor-not-allowed"
                            >
                                <SelectValue placeholder="Select your community" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Communities</SelectLabel>
                                    <SelectItem value="Bagbag">Bagbag</SelectItem>
                                    <SelectItem value="San Bartolome">San Bartolome</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        {errors.community && (
                            <span className="text-rose-500 ml-1 max-sm:text-[13px]">
                                {errors.community.message}
                            </span>
                        )}

                    </div>

                    <div className="ml-10 mr-10">
                        <Button
                            isLoading={isLoading}
                            variant='green'
                            className="bg-[#4DE69E]  duration-300 rounded-xl w-[300px] h-[50px] font-bold md:w-[620px] md:h-[50px] text-black md:mb-5">
                            Update
                        </Button>
                    </div>
                </form>
            </div>
        </main>
    )
}