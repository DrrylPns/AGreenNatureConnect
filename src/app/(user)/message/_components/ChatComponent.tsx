"use client"
import { LoadingComponent } from "@/components/LoadingComponent"
import { Card, CardContent } from "@/components/ui/card"
import { CommunityWithMessages } from "@/lib/types"
import { User } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"
import Image from "next/image"
import { inspectChatRoom } from "../../../../../actions/chat"
import { fetchCommunities } from "../../../../../actions/community"

interface Props {
    user: User
}

export default function ChatComponent({ user }: Props) {

    const { data: communities, isError, isLoading } = useQuery({
        queryKey: ["communities"],
        queryFn: async () => await fetchCommunities() as CommunityWithMessages[]
    })

    if (isError) {
        return <div>Error fetching communities</div>;
    }

    if (isLoading) {
        return <LoadingComponent />
    }

    return (
        <div key="1" className="flex h-screen bg-white dark:bg-zinc-800">
            <aside className="w-80 border-r dark:border-zinc-700">
                <div className="p-4 space-y-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold">Messages</h2>
                        <PencilIcon className="w-6 h-6" />
                    </div>

                    {communities?.map((community) => {

                        return (
                            <div className="space-y-2" key={community.id}>
                                <Card className="p-2 cursor-pointer" onClick={() => {
                                    inspectChatRoom(community.id)
                                }}>
                                    {/* AVATAR OF COMMUNITY HINGIN NLNG IMAGE LOGO NG MGA COMMUNITY TAS GAWA AVATAR COMPONENT */}
                                    <CardContent>
                                        <h3 className="font-semibold">{community.name}</h3>
                                        {/* {latestMessage && (
                                            <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                                {latestMessage.userId === user.id ? 'You sent: ' : ''}
                                                {latestMessage.content}
                                            </p>
                                        )}
                                        {!latestMessage && (
                                            <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                                No messages yet
                                            </p>
                                        )} */}
                                    </CardContent>
                                </Card>
                            </div>
                        );
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
                        <h1 className="text-muted-foreground font-semibold text-2xl">Connect now by clicking one of the communities you want to talk to!</h1>
                    </div>
                </main>
            </section>
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
