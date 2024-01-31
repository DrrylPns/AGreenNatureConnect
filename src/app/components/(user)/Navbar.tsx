"use client";
import Image from "next/image";
import LogoIcon from "/public/logo.png";
import React from "react";
import Link from "next/link";
import { Button } from "@/app/components/Ui/Button";
import useLoginModal from "@/lib/hooks/useLoginModal";
import Settings from "@/app/components/(user)/Settings";
import Notification from "./Notification";
import Search from "../Search";
import { useSession, signOut } from "next-auth/react";
import UserAccountAvatar from "../UserAccountAvatar";
import Loader, { RotatingLines } from "react-loader-spinner";
import SignInBtn from "./SignInBtn";
import { Session } from "next-auth";
import { BsCart4 } from "react-icons/bs";
import { ThemeToggler } from "../ThemeToggler";

interface NavbarProps {
  session: Session | null;
}

const Navbar: React.FC<NavbarProps> = ({}) => {
  const { data: session, status } = useSession();
  const loginModal = useLoginModal();
  //temporary fix lang muna to, baguhin mo nalang pag mag codes ka na ulit
  return (
    <nav className="fixed flex justify-between gap-5 items-center shadow-sm drop-shadow-md w-full z-50 px-3 py-2 min-h-[5rem] mix-h-[5rem]  bg-[#24643B] md:px-20">
      <Link href="/" className="w-[3rem] text-center">
        <Image src={LogoIcon} alt="AGreen Nature Connect" className="" />
      </Link>
      {status === "loading" ? (
        <div className="text-center flex justify-center">
          <RotatingLines
            strokeColor="green"
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
              <ThemeToggler />
              <Link
                href={"/markethub/cart"}
                className="text-[1.5rem] md:text-[2rem]"
              >
                <BsCart4 />
              </Link>
              <div className="md:hidden">
                <UserAccountAvatar />
              </div>
            </div>
          ) : (
            <>
              <button onClick={loginModal.onOpen} className="text-white">
                <BsCart4 />
              </button>
              <ThemeToggler />
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
