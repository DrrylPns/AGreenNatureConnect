"use client"

import { Button } from "@/app/components/Ui/Button"
import { toast } from "@/lib/hooks/use-toast"
import { getMinBirthDate } from "@/lib/utils"
import { OnboardingSchema, OnboardingType } from "@/lib/validations/onboardingSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import { X } from "lucide-react"
import { Session } from "next-auth"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { SubmitHandler, useForm } from "react-hook-form"



const OnboardingPage = () => {
    const pathname = usePathname()
    const router = useRouter()
    const { data: session, status } = useSession()

    // if wala pang record ng birthday pero naka log in, redirect sa onboarding.
    if (status === "authenticated" && session?.user?.birthday === null && pathname !== "/onboarding") {
        router.replace("/onboarding");
        return null;
    }

    // if not logged in then render...
    if (status === "loading") {
        return <div>Loading...</div>;
    } else if (!session?.user) {
        return (
            <div className="h-screen w-full flex flex-col items-center justify-center">
                Unauthorized
                <span className="underline">
                    <Link href="/discussion">Go back to page</Link>
                </span>
            </div>
        );
    }

    // if inaccess ni user to manually dapat eto lalabas then redirect to discussion page TODO function
    if (session.user.birthday !== null) {
        setTimeout(() => {
            router.push("/discussion")
        }, 2000)
        return (
            <div>
                Error, you have already done onboarding. Redirecting to the discussion page.
            </div>
        );
    }

    // if (status === "loading") {
    //     content = <div>Loading...</div>;
    // } else if (!session?.user) {
    //     content = (
    //         <div className="h-screen w-full flex flex-col items-center justify-center">
    //             Unauthorized
    //             <span className="underline">
    //                 <Link href="/discussion">Go back to page</Link>
    //             </span>
    //         </div>
    //     );
    // } else if (session.user.birthday !== null) {
    //     content = (
    //         <div>
    //             Error, you have already done onboarding. Redirecting to the discussion page.
    //             {/* PA REDIRECT NALANG SA DISCUSSION PAGE PAG NAG RENDER TONG ELSE IF NA TO */}
    //         </div>
    //     );
    // }

    // //assuming that the user already has a birthday
    // if (session.user.birthday !== null) {
    //     return (
    //         <div>
    //             Error, you have already done onboarding. Redirecting to discussion page.
    //         </div>
    //     )
    // }


    if (pathname !== "/onboarding") {
        router.replace("/onboarding");
        return null
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<OnboardingType>({
        resolver: zodResolver(OnboardingSchema),
        defaultValues: {
            username: "",
            phoneNumber: "",
            address: "",
        },
    });

    const { mutate: onboardingUpdate, isLoading } = useMutation({
        mutationFn: async ({
            username,
            phoneNumber,
            birthday,
            address,
        }: OnboardingType) => {
            const payload: OnboardingType = {
                username,
                phoneNumber,
                birthday,
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
                router.push("/discussion")
            }, 1000)
        }
    })

    const onSubmit: SubmitHandler<OnboardingType> = (data: OnboardingType) => {
        const payload: OnboardingType = {
            username: data.username,
            phoneNumber: data.phoneNumber,
            birthday: data.birthday,
            address: data.address,
        }

        onboardingUpdate(payload)
    }


    return (
        <main className="flex flex-col items-center justify-center border min-h-screen">
            <div
                className="border rounded-xl h-auto w-auto bg-[#F0EEF6] shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] p-2"
            >
                {/** X Button */}
                <div className="flex justify-end m-3">
                    {/* <Link
                        href={"/settings"}
                        className="mt-1 p-1 border-black text-black text-xl cursor-pointer font-bold rounded-full hover:bg-neutral-300">
                        <X />
                    </Link> */}
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
                                birthday<span className="text-[#FF2222]">*</span>
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

export default OnboardingPage