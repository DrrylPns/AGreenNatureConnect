"use client";
import Image from "next/image";
import LogoIcon from "/public/logo.png";
import React from "react";
import Link from "next/link";
import { Button } from "@/app/components/Ui/Button";
import useLoginModal from "@/lib/hooks/useLoginModal";
import Settings from "@/app/components/(user)/Settings";
import { useSession, signOut } from "next-auth/react";
import Loader, { RotatingLines } from "react-loader-spinner";
import { Session } from "next-auth";
import { BsCart4 } from "react-icons/bs";
import { ThemeToggler1 } from "@/app/components/_ThemeToggler";
import CartIcon from "@/app/components/(user)/CartIcon";
import UserAccountAvatar from "@/app/components/UserAccountAvatar";

interface NavbarProps {
  session: Session | null;
}

const Navbar: React.FC<NavbarProps> = ({}) => {
  const { data: session, status } = useSession();
  const loginModal = useLoginModal();
  //temporary fix lang muna to, baguhin mo nalang pag mag codes ka na ulit
  return (
    <nav className="fixed flex justify-between gap-5 items-center shadow-sm drop-shadow-md w-full z-50 px-3 py-2 min-h-[5rem] mix-h-[5rem]  bg-[#24643B] dark:bg-[#242526] md:px-20">
      <Link href="/" className="w-[3rem] text-center">
        <Image src={LogoIcon} alt="AGreen Nature Connect" className="" />
      </Link>
      {status === "loading" ? (
        <div className="text-center flex justify-center">
          <RotatingLines
            strokeColor="yellow"
            strokeWidth="5"
            animationDuration="0.75"
            width="20"
            visible={true}
          />
        </div>
      ) : (
        <div className="flex items-center text-[1.5rem] gap-3 justify-between">
          {status === "authenticated" ? (
            <div className="flex items-center justify-evenly gap-5 text-[1.5rem] text-yellow-400 font-bold">
              {/**  <Notification />
                            <Settings />*/}
              <div className="max-md:block hidden ">
                <ThemeToggler1 />
              </div>

              <div className="md:hidden">
                <UserAccountAvatar />
              </div>
            </div>
          ) : (
            <>
              <div className="max-md:block hidden  text-yellow-400">
                <ThemeToggler1 />
              </div>
              <button onClick={loginModal.onOpen} className="text-white">
                <BsCart4 />
              </button>
              {/**  <ThemeToggler />  */}
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
