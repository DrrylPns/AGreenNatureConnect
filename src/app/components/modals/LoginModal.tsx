"use client";
import { toast } from "@/lib/hooks/use-toast";
import useLoginModal from "@/lib/hooks/useLoginModal";
import usePasswordToggle from "@/lib/hooks/usePasswordToggle";
import useRegisterModal from "@/lib/hooks/useRegisterModal";
import { LoginSchema, LoginType } from "@/lib/validations/loginUserSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import { getSession, signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import ButtonAuth from "../auth/ButtonAuth";
import Heading from "../auth/Heading";
import InputLogin from "../auth/InputLogin";
import Modal from "./Modal";
import useWarningModal from "@/lib/hooks/useWarningModal";

interface LogInModalProps {
  currentUser?: User | null;
}

const LoginModal: React.FC<LogInModalProps> = ({ currentUser }) => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);
  const [PasswordInputType, ToggleIcon] = usePasswordToggle();
  const { data: session, status, update } = useSession();
  const warningModal = useWarningModal()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // const onSubmit: SubmitHandler<LoginType> = (data: LoginType) => {
  //   setIsLoading(true);

  //   signIn("credentials", {
  //     ...data,
  //     redirect: false,
  //   }).then((callback) => {
  //     setIsLoading(false);

  //     if (callback?.error) {
  //       toast({
  //         title: "Error",
  //         description: callback.error,
  //         variant: "destructive",
  //       });
  //     }

  //     if (callback?.ok && !callback?.error) {
  //       toast({
  //         title: "Success!",
  //         description: "Logged in",
  //         variant: "default",
  //       });
  //       router.refresh()
  //       loginModal.onClose();
  //       registerModal.onClose();
  //     }
  //   });
  // };

  const onSubmit: SubmitHandler<LoginType> = async (data: LoginType) => {
    setIsLoading(true);

    try {
      const callback = await signIn("credentials", {
        ...data,
        redirect: false,
      });
      setIsLoading(false);

      if (callback?.error) {
        toast({
          title: "Error",
          description: callback.error,
          variant: "destructive",
        });
      }

      if (callback?.ok && !callback?.error) {
        toast({
          title: "Success!",
          description: "Logged in",
          variant: "default",
        });

        router.refresh()

        // Retrieve the updated session after successful login
        const updatedSession = await getSession();

        if (updatedSession?.user.role === "EMPLOYEE") {
          router.push("/employee");
        } else if (updatedSession?.user.role === "ADMIN") {
          router.push("/admin");
        }

        loginModal.onClose();
        registerModal.onClose();
        warningModal.onOpen();

        // setTimeout(() => {
        //   if (updatedSession?.user.numberOfViolations as number > 0) {
        //     warningModal.onOpen()
        //   }
        // }, 1000);

        // console.log(updatedSession?.user.numberOfViolations)

        // if (updatedSession?.user.numberOfViolations as number > 1) {
        // }
        // setTimeout(() => {
        //   window.location.reload()
        // }, 1000)
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error during login:", error);
    }
  };

  // const onSubmit: SubmitHandler<LoginType> = (data: LoginType) => {
  //   setIsLoading(true);

  //   signIn('credentials', {
  //     ...data,
  //     redirect: false,
  //   }).then((callback: any) => {
  //     setIsLoading(false);


  //     if (callback?.ok && !callback?.error) {
  //       toast({
  //         description: "Logged In",
  //       });

  //       loginModal.onClose();
  //       registerModal.onClose();
  //     }

  //     if (callback?.error) {
  //       toast({
  //         description: callback.error,
  //         variant: "destructive"
  //       });
  //     }
  //   });
  // }


  const onToggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal]);

  const bodyContent = (
    <div className="flex flex-col gap-3 max-sm:mb-11">
      <Heading title="Welcome back" subtitle="Login to your account!" />
      <InputLogin
        id="email"
        label="Email"
        type="email"
        disabled={isLoading}
        register={register}
        required
      />
      {errors.email && (
        <span className="text-rose-500 ml-1 max-sm:text-[13px]">
          {errors.email.message}
        </span>
      )}

      <InputLogin
        id="password"
        label="Password"
        type={PasswordInputType as string}
        disabled={isLoading}
        register={register}
        required
        icon={ToggleIcon}
      />
      {errors.password && (
        <span className="text-rose-500 ml-1 max-sm:text-[13px]">
          {errors.password.message}
        </span>
      )}

      <div
        className="
                    flex 
                    flex-row
                    items-center
                    justify-end
                    italic
                    gap-2 
                    text-neutral-500 
                    font-light
            "
      >
        <div className="cursor-pointer text-center">Forgot Password?</div>
      </div>
    </div>
  );

  const footerContent = (
    <div className="flex flex-col w-full">
      <div className="relative">
        <div className="absolute inset-0 flex items-center ">
          <span className="w-full border-t dark:bg-white" />
        </div>

        <div className="relative flex justify-center uppercase mt-3">
          <span className="bg-background text-[14px] px-2 font-bold w-[100px] text-center text-black dark:bg-transparent dark:text-white">
            OR
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 mt-3 px-9">
        <ButtonAuth
          outline
          label="Continue with Google"
          icon={FcGoogle}
          onClick={() => signIn("google")}
        />

        <div
          className="
                text-neutral-500
                text-center
                font-light
                "
        >
          <div className="flex flex-row gap-2 items-center justify-center">
            <div>Don't have an account yet?</div>

            <div
              onClick={onToggle}
              className="
                            text-[#0227EB]
                            hover:text-[#0227EB]/70
                            dark:text-white 
                            dark:hover:text-white/70
                            cursor-pointer"
            >
              Sign up
            </div>
          </div>
          <div className="flex flex-row gap-2 items-center justify-center">
            <div>Forgot your password?</div>

            <Link href="/reset" className="text-[#0227EB] 
                                                      dark:text-white 
                                                      dark:hover:text-white/70
                                                      hover:text-[#0227EB]/70
                            ">
              Recover now.
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Sign in"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
      isLoading={isLoading}
    />
  );
};

export default LoginModal;
