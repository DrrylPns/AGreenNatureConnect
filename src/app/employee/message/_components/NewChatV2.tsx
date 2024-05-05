"use client"
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/Ui/Avatar'
import { Button } from '@/app/components/Ui/Button'
import { Input } from '@/app/components/Ui/Input'
import { ChatRoomWithAllRelation, CommunityMessages, UserWithCommunityMessages } from '@/lib/types'
import { useQuery } from '@tanstack/react-query'
import { CameraIcon, CombineIcon, FileIcon, MicIcon, MoveVerticalIcon, PhoneIcon, SmileIcon } from 'lucide-react'
import React, { useState } from 'react'
import { fetchChatRoomWithUsersWhoChatted, fetchUsersWhoChatted, inspectChatRoomEmployee } from '../../../../../actions/chat'

interface Props {
    community: CommunityMessages
}

export const NewChatV2 = ({ community }: Props) => {
    const [search, setSearch] = useState("")

    const { data: usersWhoChatted, refetch } = useQuery({
        queryKey: ["usersWhoChatted", search],
        queryFn: async () => await fetchChatRoomWithUsersWhoChatted(community.id, search) as ChatRoomWithAllRelation[],
    })

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        refetch();
    };


    return (
        <div className="flex flex-col md:flex-row h-screen">
            <aside className="w-full md:w-1/3 lg:w-1/4 bg-gray-100 border-r">
                <div className="flex items-center justify-between p-4">
                    <h1 className="text-xl font-semibold">Messages</h1>
                    {/* <CombineIcon className="h-6 w-6 text-gray-600" /> */}
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
                    {usersWhoChatted?.map((chatroom) => (
                        <div
                            className="flex items-center p-4 hover:bg-gray-200 cursor-pointer rounded-lg"
                            key={chatroom.id}
                            onClick={() => {
                                inspectChatRoomEmployee(community.id, chatroom.user.id)
                            }}
                        >
                            <Avatar>
                                <AvatarImage alt={chatroom.user.name as string} src={chatroom.user.image as string} />
                                <AvatarFallback>
                                    {chatroom.user.name?.charAt(0).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <div className="ml-4">
                                <h2 className="text-sm font-semibold">{chatroom.user.name} {" "} {chatroom.user.lastName}</h2>
                                <p className="text-xs text-gray-600">{chatroom.user.username}</p>
                            </div>
                            {/* <span className="ml-auto text-xs text-gray-500">1m ago</span> */}

                            {/* to be able to fetch last chat try to fetch chatroom then fetch updatedAt */}
                        </div>
                    ))}
                </div>
            </aside>
            <main className="flex-1 flex flex-col bg-white">
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
