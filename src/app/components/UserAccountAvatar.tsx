"use client";
import { UserAvatar } from "@/app/components/UserAvatar";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useCallback, useState } from "react";
import MenuItem from "./MenuItem";
import { Separator } from "./Ui/Separator";
import useSettingsModal from "@/lib/hooks/useSettingsModal";

const UserAccountAvatar: React.FC = ({ }) => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const settingsModal = useSettingsModal()

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  return (
    <>
      <div className="hidden max-md:block">
        <div
          onClick={toggleOpen}
          className="flex flex-row items-center rounded-full cursor-pointer hover:shadow-md transition"
        >
          <div className="hidden md:block max-md:block">
            {/* AVATAR */}
            <UserAvatar
              user={{
                name: session?.user.username || null,
                image: session?.user.image || null,
              }}
              className="h-8 w-8"
            />
          </div>
        </div>
      </div>

      <div className="block max-md:hidden">
        <div
          onClick={toggleOpen}
          className="flex flex-row items-center rounded-full cursor-pointer hover:shadow-md transition"
        >
          <div className="flex flex-row items-center rounded-full cursor-pointer hover:shadow-md transition">
            <div className="hidden md:block max-md:block">
              {/* AVATAR */}
              <UserAvatar
                user={{
                  name: session?.user.username || null,
                  image: session?.user.image || null,
                }}
                className="h-8 w-8"
              />
            </div>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="absolute shadow-md w-[40vw] lg:w-[100%] bg-white dark:bg-[#0A0A0A] overflow-hidden max-md:right-0 right-15 max-md:top-12 top-[730px] text-sm rounded-md gap-2 p-3 border dark:border-black border-zinc-300 text-black dark:text-white">
          <div className="flex flex-col space-y-1 leading-none">
            {session ? (
              <>
                {session?.user.username && (
                  <p className="font-medium text-[15px]">
                    {session?.user.username}
                  </p>
                )}
                {session?.user.email && (
                  <p className="w-[200px] truncate text-sm text-muted-foreground">
                    {session?.user.email}
                  </p>
                )}

                <Separator />

                <div className="cursor-pointer">
                  {/* <Link href={"/discussion/profile"}>
                    <MenuItem label="Change Avatar" />
                  </Link> */}
                  <Link href={"/order-status"} className="md:hidden block">
                    <MenuItem label="Transaction History" />
                  </Link>
                  <Link href={"/termsPolicy"} className="md:hidden block">
                    <MenuItem label="Privacy Policy" />
                  </Link>
                  <Link href={"/termsPolicy"} className="md:hidden block">
                    <MenuItem label="User Agreement" />
                  </Link>
                  <div
                    onClick={settingsModal.onOpen}
                  >
                    <MenuItem label="Settings" />
                  </div>

                  <Separator className="md:hidden" />

                  <div className="md:hidden block">
                    <MenuItem onClick={() => signOut()} label="Log Out" />
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default UserAccountAvatar;
