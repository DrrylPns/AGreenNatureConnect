import React from "react";
import Logo from "../Logo/logo";
import Image from "next/image";
import FacebookLogo from "../../../../public/images/facebook.png";
import TwitterLogo from "../../../../public/images/twitter.png";
import TiktokLogo from "../../../../public/images/tiktok.png";
import InstagramLogo from "../../../../public/images/instagram.png";
import Link from "next/link";
export default function footer() {
  return (
    <footer className=" ">
      <div className="flex px-5 py-5 lg:px-40 lg:py-20 justify-between mx-5 lg:mx-10 border-b-2 border-black">
        <div>
          <Logo />
          <div className="flex lg:gap-10 gap-5 my-3 lg:w-[20px] lg:h-[20px] md:w-[15px] md:h-[15px] w-[10px] h-[10px]">
            <Image className=" " src={FacebookLogo} alt="Facebook logo" />
            <Image src={TwitterLogo} alt="Twitter logo" />
            <Image src={TiktokLogo} alt="Tiktok logo" />
            <Image src={InstagramLogo} alt="instagram logo" />
          </div>
        </div>
        <div className="flex justify-between w-1/2 text-[10px] 2xl:text-[20px] md:text-[13px]">
          <div className="flex flex-col gap-y-3">
            <h3 className="text-poppins font-bold mr-3">Pages</h3>
            <Link href="/">Home</Link>
          </div>
          <div className="flex flex-col gap-y-3">
            <h3 className="text-poppins font-bold ">Services</h3>
            <Link href="/">Farmer's Market</Link>
            <Link href="/">Educational Program</Link>
            <Link href="/">Composting Service</Link>
          </div>
          <div className="flex flex-col gap-y-3">
            <h3 className="text-poppins font-bold ml-1">Organization</h3>
            <Link className="ml-1" href="/">
              Privacy Policy
            </Link>
            <Link className="ml-1" href="/">
              Terms and Condition
            </Link>
          </div>
        </div>
      </div>
      <div className="p-3 text-center">
        <p>© 2023 Agreennatureconnect | Powered by agreennatureconnect</p>
      </div>
    </footer>
  );
}
