"use client"
import { Button } from "@/app/components/Ui/Button";
import { toast } from "@/lib/hooks/use-toast";
import { ChangePasswordSchema, ChangePasswordType } from "@/lib/validations/changePasswordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const page = () => {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ChangePasswordType>({
        resolver: zodResolver(ChangePasswordSchema),
        defaultValues: {
            oldPassword: "",
            newPassword: "",
            confirmNewPassword: "",
        },
    });

    const { mutate: oldPasswordRequest, isLoading } = useMutation({
        mutationFn: async ({
            oldPassword,
            newPassword,
            confirmNewPassword
        }: ChangePasswordType) => {
            const payload: ChangePasswordType = {
                oldPassword,
                newPassword,
                confirmNewPassword,
            };
            const { data } = await axios.post("api/user/editPass", payload);
            return data
        },
        onError: (err) => {
            if (err instanceof AxiosError) {
                if (err.response?.status === 400) {
                    return toast({
                        title: "Request Failed",
                        description: "Old Password is incorrect!",
                        variant: "destructive"
                    })
                }
            } else {
                return toast({
                    title: "Error",
                    description: "Something went wrong, please try again later!",
                    variant: "destructive"
                })
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

    const onSubmit: SubmitHandler<ChangePasswordType> = (data: ChangePasswordType) => {
        if (data.oldPassword === data.newPassword) {
            return toast({
                title: "Invalid Action!",
                description: "New password must be different from the current password",
                variant: "destructive"
            })
        } else {
            const payload: ChangePasswordType = {
                oldPassword: data.oldPassword,
                newPassword: data.newPassword,
                confirmNewPassword: data.confirmNewPassword,
            }

            oldPasswordRequest(payload)
        }
    }


    return (
        <main className="flex flex-col items-center justify-center border min-h-screen">
            <div
                className="border rounded-xl h-auto w-auto bg-[#F0EEF6] shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] p-2"
            >
                {/** X Button */}
                <div className="flex justify-end m-3">
                    <Link
                        href={"/settings"}
                        className="mt-1 p-1 border-black text-black text-xl cursor-pointer font-bold rounded-full hover:bg-neutral-300">
                        <X />
                    </Link>
                </div>
                {/** Labels */}
                <div className="grid justify-items-start pt-2 pl-10 pr-10 text-black">
                    <label htmlFor="" className="text-[30px] font-bold">
                        Change Password
                    </label>
                    <div className="label-container md:text-[16px] text-[13px]">
                        <p className="text-left text-neutral-500">
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Asperiores, illum.
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    {/** input */}
                    <div className="input-container grid gap-1 h-[80px] mt-5 ml-10 mr-10">
                        <div className="relative mb-3">
                            <input
                                type="password"
                                className="rounded-full peer m-0 block h-[53px] w-full bg-white bg-clip-padding px-3 py-4 text-base font-normal leading-tight text-black transition duration-200 ease-linear placeholder:text-transparent focus:border-primary focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-neutral-700 focus:outline-none peer-focus:text-primary  dark:peer-focus:text-primary [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem]"
                                id="oldPassword"
                                placeholder=""
                                {...register("oldPassword")}
                            />
                            <label
                                htmlFor="oldPassword"
                                className="pointer-events-none absolute left-0 text-[14px] top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-[#00000080] transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none dark:peer-focus:text-primary"
                            >
                                Old Password<span className="text-[#FF2222]">*</span>
                            </label>
                        </div>
                    </div>
                    {errors.oldPassword && (
                        <span className="text-rose-500 ml-1 max-sm:text-[13px]">
                            {errors.oldPassword.message}
                        </span>
                    )}

                    <div className="input-container grid gap-1 h-[80px] ml-10 mr-10">
                        <div className="relative mb-3">
                            <input
                                type="password"
                                className="rounded-full peer m-0 block h-[53px] w-full bg-white bg-clip-padding px-3 py-4 text-base font-normal leading-tight text-black transition duration-200 ease-linear placeholder:text-transparent focus:border-primary focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-neutral-700 focus:outline-none peer-focus:text-primary  dark:peer-focus:text-primary [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem]"
                                id="newPassword"
                                placeholder=""

                                {...register("newPassword")}
                            />
                            <label
                                htmlFor="newPassword"
                                className="pointer-events-none absolute left-0 text-[14px] top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-[#00000080] transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none dark:peer-focus:text-primary"
                            >
                                New Password<span className="text-[#FF2222]">*</span>
                            </label>
                        </div>
                    </div>
                    {errors.newPassword && (
                        <span className="text-rose-500 ml-1 max-sm:text-[13px]">
                            {errors.newPassword.message}
                        </span>
                    )}

                    <div className="input-container grid gap-1 h-[80px] ml-10 mr-10">
                        <div className="relative mb-3">
                            <input
                                type="password"
                                className="rounded-full peer m-0 block h-[53px] w-full bg-white bg-clip-padding px-3 py-4 text-base font-normal leading-tight text-black transition duration-200 ease-linear placeholder:text-transparent focus:border-primary focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-neutral-700 focus:outline-none peer-focus:text-primary  dark:peer-focus:text-primary [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem]"
                                id="confirmNewPassword"
                                placeholder=""
                                {...register("confirmNewPassword")}
                            />
                            <label
                                htmlFor="confirmNewPassword"
                                className="pointer-events-none absolute left-0 text-[14px] top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-[#00000080] transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none dark:peer-focus:text-primary"
                            >
                                Confirm Password<span className="text-[#FF2222]">*</span>
                            </label>
                        </div>
                    </div>
                    {errors.confirmNewPassword && (
                        <span className="text-rose-500 ml-1 max-sm:text-[13px]">
                            {errors.confirmNewPassword.message}
                        </span>
                    )}

                    {/** Reset Button */}
                    <div className="ml-10 mr-10">
                        <Button
                            isLoading={isLoading}
                            variant='green'
                            className="bg-[#4DE69E]  duration-300 rounded-xl w-[300px] h-[50px] font-bold md:w-[620px] md:h-[50px] text-black md:mb-5">
                            Reset Password
                        </Button>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default page;