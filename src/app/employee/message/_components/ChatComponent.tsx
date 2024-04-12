"use client"
import { UserAvatar } from "@/app/components/UserAvatar"
import { Card, CardContent } from "@/components/ui/card"
import { CommunityWithMessages, UsersWithCommunityMessages } from "@/lib/types"
import { useQuery } from "@tanstack/react-query"
import Image from "next/image"
import { fetchUsersWhoChatted, inspectChatRoomEmployee } from "../../../../../actions/chat"

interface Props {
    community: CommunityWithMessages
}

export default function ChatComponent({ community }: Props) {

    const { data: usersWhoChatted, isError, isLoading } = useQuery({
        queryKey: ["usersWhoChatted"],
        queryFn: async () => await fetchUsersWhoChatted(community.id) as UsersWithCommunityMessages[]
    })

    if (isError) {
        return <div>Error fetching messages</div>;
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }


    return (
        <div key="1" className="flex h-screen bg-white dark:bg-zinc-800 pb-11 rounded-lg">
            <aside className="w-80 border-r dark:border-zinc-700">
                <div className="p-4 space-y-4 overflow-auto h-screen">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold">Messages</h2>
                        <PencilIcon className="w-6 h-6" />
                    </div>

                    {usersWhoChatted?.map((user) => {
                        return (
                            // <div className="space-y-2" key={user.id}>
                            <Card key={user.id} className="p-6 cursor-pointer" onClick={() => {
                                inspectChatRoomEmployee(community.id, user.id)
                            }}>

                                {/* AVATAR OF COMMUNITY HINGIN NLNG IMAGE LOGO NG MGA COMMUNITY TAS GAWA AVATAR COMPONENT */}
                                <CardContent className="flex items-center justify-center gap-1 p-0">
                                    <UserAvatar user={user} />
                                    <div className="flex flex-col justify-center">
                                        <h3 className="font-semibold">{user.name} {" "} {user.lastName}</h3>
                                        {/* <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                            {lastMessage ? lastMessage.content : 'No messages yet'}
                                            No messages yet
                                        </p> */}
                                    </div>
                                </CardContent>
                            </Card>
                            /* </div> */
                        )
                    })}
                </div>
            </aside>

            <section className="flex flex-col w-full">
                <main className="flex-1 overflow-auto p-4">
                    <div className="space-y-4 flex justify-center items-center h-[50vh] flex-col gap-3">
                        <Image
                            height={300}
                            width={300}
                            alt="connect-now"
                            src="/undraw/connect-now.svg"
                        />
                        <h1 className="text-muted-foreground font-semibold text-2xl">Connect now by clicking one of the users you want to talk to!</h1>
                    </div>
                </main>
            </section>

            <div className="mt-11"/>
        </div>
    )
}

function PencilIcon(props?: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
            <path d="m15 5 4 4" />
        </svg>
    )
}

function SmileIcon(props?: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="12" r="10" />
            <path d="M8 14s1.5 2 4 2 4-2 4-2" />
            <line x1="9" x2="9.01" y1="9" y2="9" />
            <line x1="15" x2="15.01" y1="9" y2="9" />
        </svg>
    )
}
