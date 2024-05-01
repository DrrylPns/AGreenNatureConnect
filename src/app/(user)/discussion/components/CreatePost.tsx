"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { BiImageAdd, BiPaperclip } from "react-icons/bi";
import { UserAvatar } from "@/app/components/UserAvatar";
import Link from "next/link";
import { Button } from "@/app/components/Ui/Button";
import { RotatingLines } from "react-loader-spinner";
import Skeleton from "react-loading-skeleton";
import UserSkeleton from "./Skeleton/CreatePost";
import useWarningModal from "@/lib/hooks/useWarningModal";
import { useRouter } from "next/navigation";

export default function CreatePost() {
  const router = useRouter()
  const { data: session, status } = useSession();

  const navigateCreate = () => {
    router.push('/discussion/create-post')
  }

  return (
    <section className="sm:px-[3%] lg:pr-[30%]">
      {status === "loading" ? (
        <div className="text-center flex justify-center">
          <UserSkeleton />
        </div>
      ) : (
        <>
          {status === 'authenticated' ? (

            <div
              className=" flex justify-between items-center gap-5 dark:bg-[#242526] bg-white rounded-lg drop-shadow-lg w-full px-5 py-5"
            >
              <Link href={{ pathname: `/discussion/user/${session?.user.username}`, query: { id: session?.user.id } }} className="w-[2.5rem]">
                <UserAvatar
                  user={{
                    name: session?.user.username || null,
                    image: session?.user.image || null,
                  }}
                  className="h-8 w-8"
                />
              </Link>

              <Link href={"/discussion/create-post"} className="px-5 w-full dark:bg-[#4E4F50] bg-[#F0F2F5] rounded-xl ">
              <input
                type="text"
                placeholder="Create post"
                onClick={navigateCreate}
               className="px-5 py-2 w-full dark:bg-[#4E4F50] bg-[#F0F2F5] rounded-xl "
              />
                </Link>
             <Link href={"/discussion/create-post"}>
                <Button variant={"green"}>Create</Button>
              </Link>
            </div>
          ) : (
            <></>
          )}
        </>
      )}
    </section>
  );
}
