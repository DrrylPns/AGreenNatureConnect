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

export default function Navbar() {
  const loginModal = useLoginModal();
  const { data: session, status } = useSession();

  return (
    <nav className="fixed flex justify-between gap-5 items-center shadow-sm drop-shadow-md w-full z-30 px-3 py-2 min-h-[5rem] mix-h-[5rem]  bg-[#F0EEF6] md:px-20">
      <Link href="/" className="w-[3rem] text-center">
        <Image src={LogoIcon} alt="AGreen Nature Connect" className="" />
      </Link>
      <Search />
      {session ? (
        <div className="flex items-center gap-3 justify-between">
          <Notification />
          <Settings />
          <UserAccountAvatar />
        </div>
      ) : (
        <div className="w-[]">
          <Button onClick={loginModal.onOpen} variant={"green"}>
            Login
          </Button>
        </div>
      )}
    </nav>
  );
}
