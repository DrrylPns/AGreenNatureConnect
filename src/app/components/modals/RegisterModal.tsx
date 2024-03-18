"use client";

import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import useRegisterModal from "@/lib/hooks/useRegisterModal";
import Modal from "./Modal";
import Heading from "../auth/Heading";
import InputAuth from "../auth/InputAuth";
import ButtonAuth from "../auth/ButtonAuth";
import useLoginModal from "@/lib/hooks/useLoginModal";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import {
  RegisterSchema,
  RegisterType,
} from "@/lib/validations/registerUserSchema";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "@/lib/hooks/use-toast";
import { useRouter } from "next/navigation";
import usePasswordToggle from "@/lib/hooks/usePasswordToggle";
import { getMinBirthDate } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/app/components/Ui/select";

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const router = useRouter();
  const [PasswordInputType, ToggleIcon] = usePasswordToggle();
  // const community = useState<string>("")

  const onToggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [registerModal, loginModal]);

  //react hook form
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RegisterType>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleSelectChange = (value: string | null) => {
    // Check for null and handle accordingly
    const communityValue = value !== null ? value : ""; // or provide a default value

    setValue("community", communityValue);
    console.log("Selected community:", communityValue);
  };

  const { mutate: registerUser, isLoading } = useMutation({
    mutationFn: async ({
      email,
      password,
      confirmPassword,
      birthday,
      community,
      terms,
    }: RegisterType) => {
      const payload: RegisterType = {
        email,
        password,
        confirmPassword,
        birthday,
        community,
        terms,
      };
      const { data } = await axios.post("api/register", payload);
      return data;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err instanceof AxiosError) {
          if (err.response?.status === 403) {
            return toast({
              title: "Creating a user failed",
              description: "Cannot create a user, you are already logged in!",
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
              title: "Invalid email",
              description: "Email already exists. Please use a different one.",
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
      // router push the client to homepage / landing etc..

      router.push("/discussion");
      registerModal.onClose();
      loginModal.onOpen();
      return toast({
        title: "Success!",
        description: "Email verification link has been sent!",
        variant: "default",
      });
    },
  });

  const onSubmit: SubmitHandler<RegisterType> = (data: RegisterType) => {
    const payload: RegisterType = {
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
      birthday: data.birthday,
      community: data.community,
      terms: data.terms,
    };

    registerUser(payload);
  };

  // age restriction on input type date

  // Eto yung body content ng Register Modal
  const bodyContent = (
    <div className="flex flex-col gap-2">
      <Heading
        title="Register"
        subtitle="Create an account to officially join AGreen Nature Connect!"
      />
      <InputAuth
        id="email"
        label="Email"
        type="email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      {errors.email && (
        <span className="text-rose-500 ml-1 max-sm:text-[13px]">
          {errors.email.message}
        </span>
      )}

      <div>
        <InputAuth
          id="password"
          type={PasswordInputType as string} // text or password value
          label="Password"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
          icon={ToggleIcon}
        />
        {errors.password && (
          <span className="text-rose-500 ml-1 max-sm:text-[13px]">
            {errors.password.message}
          </span>
        )}
      </div>

      <InputAuth
        id="confirmPassword"
        type={PasswordInputType as string}
        label="Confirm Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        icon={ToggleIcon}
      />
      {errors.confirmPassword && (
        <span className="text-rose-500 ml-1 max-sm:text-[13px]">
          {errors.confirmPassword.message}
        </span>
      )}

      <InputAuth
        id="birthday"
        type="date"
        label="Date of Birth:"
        max={getMinBirthDate()}
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      {errors.birthday && (
        <span className="text-rose-500 ml-1 max-sm:text-[13px]">
          {errors.birthday.message}
        </span>
      )}

      <Select {...register("community")} onValueChange={handleSelectChange}>
        <SelectTrigger
          className="
                    w-full
                    h-[70px]
                    p-4
                    dark:bg-[#212121]
                    font-light 
                    bg-white 
                    border-2
                    rounded-md
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
            <SelectItem value="Nova Proper">Nova Proper</SelectItem>
            <SelectItem value="Bagong Silangan">Bagong Silangan</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      {errors.community && (
        <span className="text-rose-500 ml-1 max-sm:text-[13px]">
          {errors.community.message}
        </span>
      )}

      <InputAuth
        id="terms"
        type="checkbox"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        isCheckbox
      />
      {errors.terms && (
        <span className="text-rose-500 ml-1 max-sm:text-[13px]">
          {errors.terms.message}
        </span>
      )}
    </div>
  );

  // Eto naman yung footer content ng Register Modal
  const footerContent = (
    <div className="flex flex-col w-full">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
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
          <div className="flex flex-row items-center justify-center gap-2">
            <div>Already have an account?</div>

            <div
              onClick={onToggle}
              className="
                text-[#0227EB]
                hover:text-[#0227EB]/70
                cursor-pointer"
            >
              Sign In
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel="Sign Up"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
      isLoading={isLoading}
    />
  );
};

export default RegisterModal;
