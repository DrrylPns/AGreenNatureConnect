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

export default function CreatePost() {
  const { data: session, status } = useSession();
  return (
    <section className="sm:px-[3%] lg:pr-[30%]">
      {status === "loading" ? (
        <div className="text-center flex justify-center">
          <UserSkeleton />
        </div>
      ) : (
        <>
          {session ? (
            <Link
              href={"/discussion/create-post"}
              className=" flex justify-between items-center gap-5 dark:bg-[#242526] bg-white rounded-lg drop-shadow-lg w-full px-5 py-5"
            >
              <Link href={"/profile"} className="w-[2.5rem]">
                <UserAvatar
                  user={{
                    name: session?.user.username || null,
                    image: session?.user.image || null,
                  }}
                  className="h-8 w-8"
                />
              </Link>
              <input
                type="text"
                placeholder="Create post"
                disabled={true}
                className="px-5 py-2 w-[70%] dark:bg-[#4E4F50] bg-[#F0F2F5] rounded-xl "
              />
              <Link href={"/discussion/create-post"}>
                <Button variant={"green"}>Create</Button>
              </Link>
            </Link>
          ) : (
            <></>
          )}
        </>
      )}
    </section>
  );
}
