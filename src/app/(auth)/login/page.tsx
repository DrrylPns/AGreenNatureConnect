"use client";
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import googlesvg from "@/app/discussion/images/google.svg";

export default function LoginPage() {
  const [showPassword, setShowPassword] = React.useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <main className="flex flex-col items-center justify-center border min-h-screen">
      <div
        className="border rounded-xl md:h-[610px] md:w-[500px]
        h-[620px] w-[380px] bg-[#F0EEF6]  shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)]"
      >
        {/** X Button */}
        <div className="flex justify-end m-3">
          <button className="mt-1 w-9 border-black text-black text-xl cursor-pointer font-bold">
            X
          </button>
        </div>
        {/** Labels */}
        <div className="grid justify-items-start pt-2 pl-10 pr-10 text-black">
          <label htmlFor="" className="text-[30px] font-bold">
            Login
          </label>
          <div className="label-container md:text-[16px] text-[13px]">
            <p className="text-left">
              By continuing, you agree to our{" "}
              <Link href={'/termsPolicy'} className="text-[#0227EB] cursor-pointer">
                Terms and Conditions
              </Link>{" "}
              and acknowledge that you understand{" "}
              <span className="text-[#0227EB] cursor-pointer">
                Privacy Policy
              </span>
              .
            </p>
          </div>
        </div>
        {/** Input */}
        <form>
          <div className="input-container grid gap-1 h-[120px] mt-12 ml-10 mr-10">
            <div className="relative mb-3">
              <input
                type="username"
                className="rounded-full peer m-0 block h-[53px] w-full  bg-white bg-clip-padding px-3 py-4 text-base font-normal leading-tight text-black transition duration-200 ease-linear placeholder:text-transparent focus:border-primary focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-neutral-700 focus:outline-none peer-focus:text-primary  dark:peer-focus:text-primary [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem]"
                id="floatingInput"
                placeholder=""
                required
              />
              <label
                htmlFor="floatingInput"
                className="pointer-events-none absolute left-0 text-[14px] top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-[#00000080] transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none dark:peer-focus:text-primary"
              >
                Username<span className="text-[#FF2222]">*</span>
              </label>
            </div>
            <div className="relative mb-3">
              <input
                type="password"
                className="rounded-full peer m-0 block h-[53px] w-full  bg-white bg-clip-padding px-3 py-4 text-base font-normal leading-tight text-black transition duration-200 ease-linear placeholder:text-transparent focus:border-primary focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-neutral-700 focus:outline-none peer-focus:text-primary  dark:peer-focus:text-primary [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem]"
                id="floatingPassword"
                placeholder="Password"
                required
              />
              <label
                htmlFor="floatingPassword"
                className="pointer-events-none absolute left-0 text-[14px] top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-[#00000080] transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none dark:peer-focus:text-primary"
              >
                Password<span className="text-[#FF2222]">*</span>
              </label>
            </div>
          </div>
          {/** Forget Password Label */}
          <div className="text-right text-black">
            <p className="italic mt-6 mb-4 mr-10 ml-10 cursor-pointer">
              <Link href="forgetpassword">Forgot Password?</Link>
            </p>
          </div>
          {/** Or and Line */}
          <div className="flex flex-col items-center h-[20px] ml-10 mr-10">
            <div className="flex items-center w-full">
              <div className="flex-grow h-px bg-black/40 dark:bg-[#00000066]"></div>
              <p className="text-black dark:text-black text-xs mx-7 font-extrabold">
                OR
              </p>
              <div className="flex-grow h-px bg-black/40 dark:bg-[#00000066]"></div>
            </div>
          </div>
          {/** Continue with google button */}
          <div className="h-[40px] grid items-center mt-3 pl-10 pr-10">
            <label className="border rounded-xl bg-white h-[40px] grid items-center font-bold cursor-pointer text-center">
              <span className="grid grid-cols-3">
                <Image
                  className="ml-2 mt-2 mb-2 "
                  src={googlesvg}
                  alt="Google_Icon"
                />
                <span className="text-[15px] pr-18 mr-20 mt-2 col-span-2">
                  Continue with Google
                </span>
              </span>
            </label>
          </div>
          {/** Sign Up Route */}
          <div className="labelSignup-container">
            <p className="text-left ml-10 mr-10 mt-2">
              Don't have an account?{" "}
              <Link href="signup" className="text-[#0227EB] cursor-pointer">
                Sign Up
              </Link>
            </p>
          </div>
          {/** Sign In/Log In Button */}
          <div className="ml-10 mr-10 mt-6">
            <button className="bg-[#4DE69E] hover:bg-opacity-75  duration-300 rounded-xl w-[300px] h-[50px] font-bold md:w-[420px] md:h-[50px]">
              Sign In
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
