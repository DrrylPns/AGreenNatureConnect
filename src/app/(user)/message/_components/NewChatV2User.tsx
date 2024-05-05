"use client"
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/Ui/Avatar'
import { Input } from '@/app/components/Ui/Input'
import { CommunityMessages } from '@/lib/types'
import { User } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import { CombineIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { inspectChatRoom } from '../../../../../actions/chat'
import { fetchCommunities } from '../../../../../actions/community'

interface Props {
    user: User
}

export const NewChatV2User = ({ user }: Props) => {
    const [search, setSearch] = useState("")

    const { data: communities, refetch } = useQuery({
        queryKey: ["communities", search],
        queryFn: async () => await fetchCommunities(search) as CommunityMessages[]
    })

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    useEffect(() => {
        refetch();
    }, [search, refetch]);


    return (
        <div className="flex flex-col md:flex-row h-screen">
            <aside className="w-full md:w-1/3 lg:w-1/4 bg-gray-100 border-r">
                <div className="flex items-center justify-between p-4">
                    <h1 className="text-xl font-semibold">Messages</h1>
                    <CombineIcon className="h-6 w-6 text-gray-600" />
                </div>
                <div className="p-4">
                    <Input
                        className="w-full"
                        placeholder="Search"
                        type="search"
                        value={search}
                        onChange={handleSearchChange}
                    />
                </div>
                {/* ITERATE COMMUNITY USERS WHO CHAT */}
                <div className="overflow-y-auto h-[calc(100vh-160px)]">
                    {communities?.map((community) => (
                        <div
                            className="flex items-center p-4 hover:bg-gray-200 cursor-pointer rounded-lg"
                            key={community.id}
                            onClick={() => {
                                inspectChatRoom(community.id)
                            }}
                        >
                            <Avatar>
                                <AvatarImage alt={community?.name as string} src={community.displayPhoto as string} />
                                <AvatarFallback>
                                    {community?.name?.charAt(0).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <div className="ml-4">
                                <h2 className="text-sm font-semibold">{community?.urbanFarmName}</h2>
                                <p className="text-xs text-gray-600">{community?.name}</p>
                            </div>
                            {/* <span className="ml-auto text-xs text-gray-500">1m ago</span> */}

                            {/* to be able to fetch last chat try to fetch chatroom then fetch updatedAt */}
                        </div>
                    ))}
                </div>
            </aside>
            <main className="flex-1 flex flex-col bg-gray-100">
                <div className="border-b p-4 flex items-center justify-between">
                    {/* <div className="flex items-center space-x-2">
                        <Avatar>
                            <AvatarImage alt="Matthew Anderson" src="/placeholder.svg?height=40&width=40" />
                            <AvatarFallback>MA</AvatarFallback>
                        </Avatar>
                        <div>
                            <h2 className="text-lg font-semibold">Matthew Anderson</h2>
                            <p className="text-xs text-gray-500">Last seen recently</p>
                        </div>
                    </div> */}
                    {/* <div className="flex items-center space-x-4">
                        <PhoneIcon className="h-6 w-6 text-gray-600" />
                        <CameraIcon className="h-6 w-6 text-gray-600" />
                        <MoveVerticalIcon className="h-6 w-6 text-gray-600" />
                    </div> */}
                </div>
                <div className="flex items-center justify-center">
                    {/* <div className="flex items-start space-x-2 p-4">
                        <Avatar>
                            <AvatarImage alt="Ethan Johnson" src="/placeholder.svg?height=40&width=40" />
                            <AvatarFallback>EJ</AvatarFallback>
                        </Avatar>
                        <div>
                            <div className="bg-gray-200 rounded-tl-lg rounded-tr-lg rounded-br-lg p-2">
                                <p className="text-sm">
                                    Hey there! 👋 I heard you've been working on a new project. Tell me all about it
                                </p>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">05:00 pm</p>
                        </div> */}
                    Start a conversation now!
                </div>
                <div className="flex items-start space-x-2 p-4 justify-end">
                    {/* <div>
                            <div className="bg-blue-500 text-white rounded-tl-lg rounded-tr-lg rounded-bl-lg p-2">
                                <p className="text-sm">
                                    That's great! I've been working on a new e-commerce platform for our company. It's really exciting and
                                    I'd love to get your feedback.
                                </p>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">05:05 pm</p>
                        </div>
                        <Avatar>
                            <AvatarImage alt="Matthew Anderson" src="/placeholder.svg?height=40&width=40" />
                            <AvatarFallback>MA</AvatarFallback>
                        </Avatar>
                    </div> */}
                </div>
                {/* <div className="p-4 border-t bg-white flex items-center rounded-b-lg"> */}
                {/* <SmileIcon className="h-6 w-6 text-gray-600" /> */}
                {/* <Button
                        variant="newGreen"
                    >
                        Send
                    </Button> */}
                {/* <Input className="flex-1 mx-4" placeholder="Write your message..." type="text" /> */}
                {/* <MicIcon className="h-6 w-6 text-gray-600" /> */}
                {/* <FileIcon className="h-6 w-6 text-gray-600" /> */}
                {/* <CameraIcon className="h-6 w-6 text-gray-600" /> */}
                {/* </div> */}
            </main>
        </div>
    )
}
