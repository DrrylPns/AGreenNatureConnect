"use client"
import useLoginModal from "@/lib/hooks/useLoginModal"
import useRegisterModal from "@/lib/hooks/useRegisterModal"
import { useState, useCallback } from "react"
import ButtonAuth from "../auth/ButtonAuth"
import { FcGoogle } from "react-icons/fc"
import Heading from "../auth/Heading"
import InputLogin from "../auth/InputLogin"
import Modal from "./Modal"

interface LogInModalProps {
    // currentUser?: User | null; // Next Auth props
}

const LoginModal: React.FC<LogInModalProps> = ({
    // currentUser // TODO Next Auth props
}) => {
    const loginModal = useLoginModal()
    const registerModal = useRegisterModal()
    const [isLoading, setIsLoading] = useState(false);

    const onToggle = useCallback(() => {
        loginModal.onClose()
        registerModal.onOpen()
    }, [loginModal, registerModal])

    const bodyContent = (
        <div className="flex flex-col gap-4 max-sm:mb-11">
            <Heading
                title="Welcome back"
                subtitle="Login to your account!"
            />
            <InputLogin
                id="email"
                label="Email"
                type="email"
                disabled={isLoading}
                // register={register} TODO Auth
                required
            />

            <InputLogin
                id="password"
                label="Password"
                type="password"
                disabled={isLoading}
                // register={register} TODO Auth
                required
            />

            <div className="
                    flex 
                    flex-row
                    items-center
                    justify-end
                    italic
                    gap-2 
                    text-neutral-500 
                    font-light
            ">
                <div className="cursor-pointer text-center">
                    Forgot Password?
                </div>
            </div>
        </div>
    )

    const footerContent = (
        <div className='flex flex-col w-full'>
            <div className='relative'>
                <div className='absolute inset-0 flex items-center'>
                    <span className='w-full border-t' />
                </div>

                <div className='relative flex justify-center uppercase mt-3'>
                    <span className='bg-background text-[14px] px-2 font-bold w-[100px] text-center text-black'>
                        OR
                    </span>
                </div>
            </div>

            <div className='grid grid-cols-1 gap-6 mt-3 px-9'>
                <ButtonAuth
                    outline
                    label="Continue with Google"
                    icon={FcGoogle}
                    onClick={() => { }} // TODO Auth
                />

                <div className="
                text-neutral-500
                text-center
                font-light
                ">
                    <div className="flex flex-row gap-2 items-center justify-center">
                        <div>
                            Don't have an account yet?
                        </div>

                        <div
                            onClick={onToggle}
                            className="
                            text-[#0227EB]
                            hover:text-[#0227EB]/70
                            cursor-pointer">
                            Sign up
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )



    return (
        <Modal
            disabled={isLoading}
            isOpen={loginModal.isOpen}
            title="Login"
            actionLabel="Sign in"
            onClose={loginModal.onClose}
            onSubmit={() => { }} // TODO Auth
            body={bodyContent}
            footer={footerContent}
        />
    )
}

export default LoginModal