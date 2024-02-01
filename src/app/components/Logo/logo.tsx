import React from "react";
import Image from "next/image";
import LogoImage from "../../../../public/logo.png";
function Logo() {
  return (
    <div className="flex flex-row items-center">
      <h1 className="text-green md:text-[16px] lg:text-[20px] text-[13px] font-poppins font-bold ml-2">
        AGreen <span className="text-amber">Nature</span> Connect
      </h1>
    </div>
  );
}

export default Logo;
