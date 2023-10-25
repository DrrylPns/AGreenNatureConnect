import React from "react";

const page = () => {
  return (
    <main className="flex flex-col items-center justify-center border min-h-screen">
      <div
        className="border rounded-xl md:h-[350px] md:w-[600px]
        h-[350px] w-[380px] bg-[#F0EEF6]  shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)]"
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
            Reset Password
          </label>
          <div className="label-container md:text-[16px] text-[13px]">
            <p className="text-left">
              Enter the email associated with your account we'll send an email
              with intruction to reset your password.
            </p>
          </div>
        </div>
        <form>
          {/** input */}
          <div className="input-container grid gap-1 h-[80px] mt-7 ml-10 mr-10">
            <div className="relative mb-3">
              <input
                type="email"
                className="rounded-full peer m-0 block h-[53px] w-full bg-white bg-clip-padding px-3 py-4 text-base font-normal leading-tight text-black transition duration-200 ease-linear placeholder:text-transparent focus:border-primary focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-neutral-700 focus:outline-none peer-focus:text-primary  dark:peer-focus:text-primary [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem]"
                id="floatingInput"
                placeholder=""
                required
              />
              <label
                htmlFor="floatingInput"
                className="pointer-events-none absolute left-0 text-[14px] top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-[#00000080] transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none dark:peer-focus:text-primary"
              >
                Email<span className="text-[#FF2222]">*</span>
              </label>
            </div>
          </div>
          {/** Reset Button */}
          <div className="ml-10 mr-10">
            <button className="bg-[#4DE69E] hover:-translate-y-1 hover:scale-110 duration-300 rounded-xl w-[300px] h-[50px] font-bold md:w-[520px] md:h-[50px]">
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default page;
