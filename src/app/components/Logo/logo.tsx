import React from "react";
import Image from "next/image";
import LogoImage from "../../../../public/logo.png";
function Logo() {
  return (
    <div className="flex flex-row items-center">
      <Image
        className="md:h-[50px] md:w-[50px] h-[40px] w-[40px]"
        src={LogoImage}
        alt="Logo"
        height={50}
        width={60}
      />
      <h1 className="text-green md:text-[16px] lg:text-[20px] text-[13px] font-poppins font-bold ml-2">
        AGreen <span className="text-amber">Nature</span> Connect
      </h1>
    </div>
  );
}

export default Logo;
