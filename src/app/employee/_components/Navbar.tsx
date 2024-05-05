"use client"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/app/components/Ui/Dropdown-Menu"
import { UserAvatar } from '@/app/components/UserAvatar'
import useSettingsModal from "@/lib/hooks/useSettingsModal"
import { User } from '@prisma/client'
import { MessagesSquareIcon, Package2Icon } from 'lucide-react'
import { signOut } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface Props {
    user: User
}

export const NavbarDashboard = ({ user }: Props) => {
    const router = useRouter()
    const { onOpen } = useSettingsModal()
    return (
        <header className="hidden justify-end h-14 items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40 lg:flex">
            <h1 className="font-medium text-center text-lg md:text-xl">
                {
                    //@ts-ignore
                    user.Community.name
                } Dashboard
            </h1>

            <div className="flex items-center gap-4 md:gap-6 lg:gap-8 xl:gap-10">
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <UserAvatar user={user} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer" onClick={onOpen}>Settings</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            className="cursor-pointer"
                            onClick={() => signOut({
                                redirect: false
                            }).then(() => {
                                router.push("/discussion")
                            })}>Logout</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <Link href="/employee/message" className="hidden md:block text-4xl decoration-8 cursor-pointer">
                <MessagesSquareIcon />
            </Link>
        </header>
    )
}
