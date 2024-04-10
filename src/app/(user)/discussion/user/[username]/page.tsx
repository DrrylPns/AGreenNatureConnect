"use client";
import prisma from "@/lib/db/db";
import Image from "next/image";
import React, { use, useEffect, useState } from "react";
import DisplayPhoto from "@/../public/images/default-user.jpg";
import { Badge } from "@/components/ui/badge";
import RelativeDate from "@/app/components/RelativeDate";
import UserPost from "../../components/UserPost";
import { useSession } from "next-auth/react";
import axios from "axios";
import { Author } from "@/lib/types";
import RotatingLinesLoading from "@/app/(markethub)/components/RotatingLinesLoading";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import useSettingsModal from "@/lib/hooks/useSettingsModal";
import MenuItem from "@/app/components/MenuItem";
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/Ui/Avatar";

function page({
  params,
  searchParams,
}: {
  params: { username: string };
  searchParams: { id: string };
}) {
  const [user, setUser] = useState<Author>();
  const [loading, setLoading] = useState<boolean>(true);
  const session = useSession();
  const username = params.username.replace(/%20/g, " ");
  const settingsModal = useSettingsModal();

  useEffect(() => {
    getUser();
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const getUser = async () => {
    const res = await axios.get(`/api/user/${searchParams.id}`);
    setUser(res.data);
  };

  return (
    <>
      {!loading ? (
        <div className="w-full mt-5 bg-gray-50 dark:bg-[#242526]">
          {user && (
            <div className="w-full dark:bg-[#242526] dark:border-[#242526] border-gray-300 border-2 px-2">
              <div className="w-full flex dark:bg-[#242526] bg-gray-100 flex-col items-center justify-center mb-2 py-2 dark:border-[#242526] border-gray-200 border-b ">
                <div className="flex items-center overflow-hidden justify-center  rounded-full border w-20 h-20 border-black">
                  {/*User Image, add default image if the user doesn't have DP user image will comes from the backend*/}
                  <Avatar>
                    <AvatarImage src={user.image as string} alt={`${user.username}'s profile picture`} />
                    <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                </div>
                <h1>{user?.username}</h1>
                {user.bio !== "" ? (
                  <p>{user.bio}</p>
                ) : (
                  <p className="text-[0.6rem] text-gray-400">
                    No bio has been putted!
                  </p>
                )}
              </div>
              <div className="flex justify-between items-center">
                <div>
                  {user.name !== "" && user.lastName !== "" && (
                    <h1>
                      Full Name: {user?.name} {user.middleName} {user.lastName}
                    </h1>
                  )}
                  <h1>
                    Role:
                    <Badge
                      variant="secondary"
                      className={`${user.role === "ADMIN" && "bg-green"} ${user.role === "EMPLOYEE" && "bg-yellow-300"
                        }`}
                    >
                      {user.role === "USER" ? "Member" : user.role}
                    </Badge>
                  </h1>
                  <h1>Email: {user?.email}</h1>
                  <h1>
                    Member since: <RelativeDate dateString={user.createdAt} />
                  </h1>
                </div>
                {session.data?.user.id === user.id && (
                  <div>
                    <Button onClick={settingsModal.onOpen}>Edit Profile</Button>
                  </div>
                )}
              </div>
            </div>
          )}
          <div className="border-gray-300 dark:border-[#242526] dark:bg-[#242526] border shadow-inner bg-gray-50">
            <h1 className="py-3 mb-3 border-gray-300 dark:border-[#242526] border-b-2 shadow-lg text-center">
              Posts
            </h1>
            <div className="px-2 sm:px-5">
              <UserPost id={searchParams.id} />
            </div>
          </div>
        </div>
      ) : (
        <RotatingLinesLoading />
      )}
    </>
  );
}

export default page;
