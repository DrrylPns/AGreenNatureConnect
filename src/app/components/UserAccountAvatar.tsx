"use client"
import Link from "next/link"
import { signOut, useSession } from "next-auth/react"
import { UserAvatar } from "@/app/components/UserAvatar"
import { useCallback, useState } from "react"
import MenuItem from "./MenuItem"
import { Separator } from "./Ui/Separator"
import { Session } from "next-auth"


const UserAccountAvatar: React.FC = ({ }) => {
    const {data: session} = useSession()
    const [isOpen, setIsOpen] = useState(false)

    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value);
    }, [])

    return (
        <>
            <div
                onClick={toggleOpen}
                className='flex flex-row items-center rounded-full cursor-pointer hover:shadow-md transition'
            >
                <div className='hidden md:block max-md:block'>
                    {/* AVATAR */}
                    <UserAvatar
                        user={{ name: session?.user.username || null, image: session?.user.image || null }}
                        className="h-8 w-8"
                    />
                </div>
            </div>
            {isOpen && (
                <div className='absolute shadow-md w-[40vw] md:w-[12%] bg-white dark:bg-[#0A0A0A] dark:border overflow-hidden right-0 top-12 text-sm rounded-md gap-2 p-3 border border-zinc-300'>
                    <div className='flex flex-col space-y-1 leading-none'>
                        {session ? (
                            <>
                                {session?.user.username && <p className="font-medium text-[15px]">{session?.user.username}</p>}
                                {session?.user.email && (
                                    <p className="w-[200px] truncate text-sm text-muted-foreground">
                                        {session?.user.email}
                                    </p>
                                )}

                                <Separator />

                                <div className="cursor-pointer">
                                    <Link href={"/discussion/profile"}>
                                        <MenuItem
                                            label='My Profile'
                                        />
                                    </Link>

                                    <Link href={"/discussion/settings"}>
                                        <MenuItem
                                            label='Settings'
                                        />
                                    </Link>

                                    <Separator />

                                    <MenuItem
                                        onClick={() => signOut()}
                                        label='Log Out'
                                    />
                                </div>

                            </>
                        ) : (
                            <>

                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    )
}

export default UserAccountAvatar