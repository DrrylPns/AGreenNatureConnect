'use client'

import { FcGoogle } from "react-icons/fc"
import { useCallback, useState } from "react";
import useRegisterModal from "@/lib/hooks/useRegisterModal";
import Modal from "./Modal";
import Heading from "../auth/Heading";
import InputAuth from "../auth/InputAuth";
import ButtonAuth from "../auth/ButtonAuth";
import useLoginModal from "@/lib/hooks/useLoginModal";

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);

  const onToggle = useCallback(() => {
    registerModal.onClose()
    loginModal.onOpen()
  }, [registerModal, loginModal])

  // Eto yung body content ng Register Modal
  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Register"
        subtitle="By Continuing you agree to our Terms and Conditions and acknowledge that you understand Privacy Policy"
      />
      <InputAuth
        id="email"
        label="Email"
        type="email"
        disabled={isLoading}
        // register={register} TODO
        // errors={errors} TODO
        required
      />

      <InputAuth
        id="password"
        type="password"
        label="Password"
        disabled={isLoading}
        // register={register} TODO
        // errors={errors} TODO
        required
      />

      <InputAuth
        id="confirmPassword"
        type="password"
        label="Confirm Password"
        disabled={isLoading}
        // register={register} TODO
        // errors={errors} TODO
        required
      />
    </div>
  )

  // Eto naman yung footer content ng Register Modal
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
          <div className="flex flex-row items-center justify-center gap-2">
            <div>
              Already have an account?
            </div>

            <div
              onClick={onToggle}
              className="
                text-[#0227EB]
                hover:text-[#0227EB]/70
                cursor-pointer">
              Sign In
            </div>
          </div>
        </div>
      </div>
    </div>

    // <div className="flex flex-col gap-4 mt-3">
    //   <hr />
    //   <div className="flex items-center justify-center -mt-7">OR</div>
    //   <ButtonAuth
    //     outline
    //     label="Continue with Google"
    //     icon={FcGoogle}
    //     onClick={() => { }} // TODO Auth
    //   />
    // </div>

    // <div className="flex flex-col items-center h-[20px] mt-5">
    //   <div className="flex items-center w-full">
    //     <div className="flex-grow h-px bg-black/20 dark:bg-[#00000066]" />
    //     <p className="text-black dark:text-black text-xs mx-7 font-extrabold">
    //       OR
    //     </p>
    //     <div className="flex-grow h-px bg-black/20 dark:bg-[#00000066]" />
    //   </div>
    // </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel="Sign Up"
      onClose={registerModal.onClose}
      onSubmit={() => { }} //TODO Auth
      body={bodyContent}
      footer={footerContent}
    />
  )
}

export default RegisterModal