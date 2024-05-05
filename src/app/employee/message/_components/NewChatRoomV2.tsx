"use client"
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/Ui/Avatar'
import { Button } from '@/app/components/Ui/Button'
import { Input } from '@/app/components/Ui/Input'
import { ChatRoomWithAllRelation, ChatRoomWithRelations } from '@/lib/types'
import { useInfiniteQuery, useQuery, useQueryClient } from '@tanstack/react-query'
import { CameraIcon, CombineIcon, FileIcon, MicIcon, MoveVerticalIcon, PhoneIcon, SmileIcon, Trash2 } from 'lucide-react'
import React, { useEffect, useRef, useState, useTransition } from 'react'
import { deleteMessage, fetchChatRoomMessages, fetchChatRoomWithUsersWhoChatted, fetchUsersWhoChatted, inspectChatRoomEmployee, sendMessage } from '../../../../../actions/chat'
import Image from 'next/image'
import { pusherClient, formatTime } from '@/lib/pusher'
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/app/components/Ui/Dialog";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogTrigger,
} from "@/app/components/Ui/alert-dialog";
import { UploadDropzone } from '@/lib/uploadthing'
import { toast } from '@/lib/hooks/use-toast'

interface Props {
    chatroom: ChatRoomWithAllRelation
}

export const NewChatRoomV2 = ({
    chatroom,
}: Props) => {
    const [content, setContent] = useState<string>("");
    const [imageUrl, setImageUrl] = useState<string>("");
    const [isPending, startTransition] = useTransition();
    const endOfMessagesRef = useRef<HTMLDivElement>(null);
    const queryClient = useQueryClient();
    const [shouldScrollToEnd, setShouldScrollToEnd] = useState<boolean>(true);
    const [search, setSearch] = useState("")

    const { data: usersWhoChatted, refetch } = useQuery({
        queryKey: ["usersWhoChatted", search],
        queryFn: async () => await fetchChatRoomWithUsersWhoChatted(chatroom.communityId, search) as ChatRoomWithAllRelation[],
    })

    const {
        data: currentChatroom,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status,
    } = useInfiniteQuery(
        ["current-chatroom", chatroom.id],
        ({ pageParam = 0 }) => fetchChatRoomMessages(chatroom.id, pageParam, 20),
        {
            getNextPageParam: (lastPage) => lastPage.nextPage,
            refetchInterval: 4 * 1000,
            staleTime: 4 * 1000,
        }
    );

    useEffect(() => {
        // Scroll to the end of the messages
        if (endOfMessagesRef.current && shouldScrollToEnd) {
            endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
            setShouldScrollToEnd(false);
        }
    }, [currentChatroom, shouldScrollToEnd]);

    const handleScroll = (event: any) => {
        const { scrollTop } = event.currentTarget;

        if (scrollTop === 0 && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    };

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

                <div className="overflow-y-auto h-[calc(100vh-160px)]">
                    {usersWhoChatted?.map((chatroom) => (
                        <div
                            className="flex items-center p-4 hover:bg-gray-200 cursor-pointer rounded-lg"
                            key={chatroom.user.id}
                            onClick={() => {
                                inspectChatRoomEmployee(chatroom.communityId, chatroom.user.id)
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
            <main className="flex-1 flex flex-col bg-white" onScroll={handleScroll}>
                <div className="border-b p-4 flex items-center justify-between">
                    {/* Set the avatar and name dynamically */}
                    <div className="flex items-center space-x-2">
                        <Avatar>
                            <AvatarImage alt={chatroom?.user.name ?? "User"} src={chatroom?.user?.image ?? "/placeholder.svg?height=40&width=40"} />
                            <AvatarFallback>{chatroom.user?.name?.charAt(0).toUpperCase() ?? "U"}</AvatarFallback>
                        </Avatar>
                        <div>
                            <h2 className="text-lg font-semibold">{chatroom.user?.name ?? "User"}</h2>
                            <p className="text-xs text-gray-500">{chatroom.user?.username}</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4 text-sm cursor-pointer" onClick={() => { setShouldScrollToEnd(true) }}>
                        {/* <PhoneIcon className="h-6 w-6 text-gray-600" /> */}
                        {/* <CameraIcon className="h-6 w-6 text-gray-600" /> */}
                        <p>Click to see the latest message.</p>
                        <MoveVerticalIcon className="h-6 w-6 text-gray-600" />
                    </div>
                </div>

                {isFetchingNextPage && (
                    <div className="w-full items-center">Loading more messages...</div>
                )}
                {currentChatroom?.pages?.slice().reverse().map((group, index) => (
                    <div className="flex-1 overflow-y-auto py-4" key={index}>
                        {group.chatroom?.messages?.slice().reverse().map((message, index) => (
                            <>
                                {message.communityId !== chatroom.communityId ? (
                                    <div className="flex items-start space-x-2 p-4">
                                        {message.image ? (
                                            <>
                                                <Avatar>
                                                    <AvatarImage alt={message?.user?.name as string} src={message?.user?.image as string} />
                                                    <AvatarFallback>{message?.user?.name?.charAt(0).toUpperCase()}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <Image
                                                        alt={message?.content}
                                                        className="rounded-lg"
                                                        height="300"
                                                        src={message?.image}
                                                        style={{
                                                            aspectRatio: "400/300",
                                                            objectFit: "cover",
                                                        }}
                                                        width="400"
                                                    />
                                                    <div className="bg-gray-200 rounded-tl-lg rounded-tr-lg rounded-br-lg p-2">
                                                        <p className="text-sm">
                                                            {message?.content}
                                                        </p>
                                                    </div>
                                                    <p className="text-xs text-gray-500 mt-1">{formatTime(message?.createdAt)}</p>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <Avatar>
                                                    <AvatarImage alt={message?.user?.name as string} src={message?.user?.image as string} />
                                                    <AvatarFallback>{message?.user?.name?.charAt(0).toUpperCase()}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <div className="bg-gray-200 rounded-tl-lg rounded-tr-lg rounded-br-lg p-2">
                                                        <p className="text-sm">
                                                            {message?.content}
                                                        </p>
                                                    </div>
                                                    <p className="text-xs text-gray-500 mt-1">{formatTime(message?.createdAt)}</p>
                                                </div>
                                            </>
                                        )
                                        }

                                    </div>
                                ) :
                                    (
                                        <div className="flex items-start space-x-2 p-4 justify-end">
                                            {message?.image ? (
                                                <>
                                                    <div className='my-auto'>
                                                        <AlertDialog>
                                                            <AlertDialogTrigger className="cursor-pointer flex justify-center items-center">
                                                                <Trash2 className="text-rose-500 w-5 h-5" />
                                                            </AlertDialogTrigger>
                                                            <AlertDialogContent>
                                                                <AlertDialogDescription>
                                                                    Are you sure you want to delete this
                                                                    message?
                                                                </AlertDialogDescription>

                                                                <AlertDialogFooter>
                                                                    <AlertDialogCancel
                                                                        asChild
                                                                        className="bg-zinc-100 text-zinc-900 hover:bg-zinc-200 outline outline-1 outline-zinc-300 active:scale-95 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:opacity-50 dark:focus:ring-slate-400 disabled:pointer-events-none dark:focus:ring-offset-slate-900"
                                                                    >
                                                                        <Button variant="outline">Cancel</Button>
                                                                    </AlertDialogCancel>
                                                                    <AlertDialogAction
                                                                        asChild
                                                                        className="bg-[#24643B]"
                                                                    >
                                                                        <Button
                                                                            variant="destructive"
                                                                            onClick={() => {
                                                                                startTransition(() => {
                                                                                    deleteMessage(message.id).then(
                                                                                        (data) => {
                                                                                            if (data.error)
                                                                                                toast({
                                                                                                    description: data.error,
                                                                                                    variant: "destructive",
                                                                                                });

                                                                                            if (data.success) {
                                                                                                toast({
                                                                                                    description: data.success,
                                                                                                });

                                                                                                queryClient.invalidateQueries(
                                                                                                    {
                                                                                                        queryKey: [
                                                                                                            "messages",
                                                                                                            chatroom.id,
                                                                                                        ],
                                                                                                    }
                                                                                                );
                                                                                            }
                                                                                        }
                                                                                    );
                                                                                });
                                                                            }}
                                                                        >
                                                                            Delete
                                                                        </Button>
                                                                    </AlertDialogAction>
                                                                </AlertDialogFooter>
                                                            </AlertDialogContent>
                                                        </AlertDialog>
                                                    </div>

                                                    <div>
                                                        <Image
                                                            alt={message?.content}
                                                            className="rounded-lg"
                                                            height="300"
                                                            src={message?.image}
                                                            style={{
                                                                aspectRatio: "400/300",
                                                                objectFit: "cover",
                                                            }}
                                                            width="400"
                                                        />
                                                        <div className="bg-blue-500 text-white rounded-tl-lg rounded-tr-lg rounded-bl-lg p-2">
                                                            <p className="text-sm">
                                                                {message?.content}
                                                            </p>
                                                        </div>
                                                        <p className="text-xs text-gray-500 mt-1">{formatTime(message?.createdAt)}</p>
                                                    </div>

                                                    <Avatar>
                                                        <AvatarImage alt={message?.community?.name} src={message?.community?.displayPhoto as string} />
                                                        <AvatarFallback>
                                                            {message?.community?.name.charAt(0).toUpperCase()}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                </>
                                            ) : (
                                                <>
                                                    <div>
                                                        <div className="bg-blue-500 text-white rounded-tl-lg rounded-tr-lg rounded-bl-lg p-2">
                                                            <p className="text-sm">
                                                                {message?.content}
                                                            </p>
                                                        </div>
                                                        <p className="text-xs text-gray-500 mt-1">{formatTime(message?.createdAt)}</p>
                                                    </div>
                                                    <Avatar>
                                                        <AvatarImage alt={message?.community?.name} src={message?.community?.displayPhoto as string} />
                                                        <AvatarFallback>
                                                            {message?.community?.name.charAt(0).toUpperCase()}
                                                        </AvatarFallback>
                                                    </Avatar>

                                                </>
                                            )}
                                        </div>
                                    )
                                }
                            </>
                        ))}
                        <div ref={index === currentChatroom.pages.length - 1 ? endOfMessagesRef : null} />
                    </div>
                ))}

                <div className="p-4 border-t bg-white flex items-center rounded-b-lg">

                    {/* <SmileIcon className="h-6 w-6 text-gray-600" /> */}
                    <Dialog>
                        <DialogTrigger>
                            <FileIcon className="h-6 w-6 text-gray-600" />
                        </DialogTrigger>
                        <DialogContent>
                            {imageUrl.length ? (
                                <div className="w-full flex flex-col items-center justify-center mt-5">
                                    <Image
                                        alt="product image"
                                        src={imageUrl}
                                        width={250}
                                        height={250}
                                        className="mb-3"
                                    />
                                    <Button variant="outline" onClick={() => setImageUrl("")}>
                                        Change
                                    </Button>
                                </div>
                            ) : (
                                <UploadDropzone
                                    className="text-green"
                                    appearance={{
                                        button: "bg-[#00B207] p-2 mb-3",
                                        label: "text-green",
                                        allowedContent:
                                            "flex h-8 flex-col items-center justify-center px-2 text-green",
                                    }}
                                    endpoint="imageUploader"
                                    onClientUploadComplete={(res) => {
                                        console.log("Files: ", res);
                                        if (res && res.length > 0 && res[0].url) {
                                            setImageUrl(res[0].url);
                                        } else {
                                            console.error("Please input a valid image.", res);
                                        }
                                    }}
                                    onUploadError={(error: Error) => {
                                        toast({
                                            title: "Error!",
                                            description: error.message,
                                            variant: "destructive",
                                        });
                                    }}
                                />
                            )}
                        </DialogContent>
                    </Dialog>
                    <Input
                        className="flex-1 mx-4"
                        placeholder="Write your message..."
                        type="text"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                    {/* <MicIcon className="h-6 w-6 text-gray-600" /> */}
                    {/* <FileIcon className="h-6 w-6 text-gray-600" /> */}
                    <Button
                        disabled={content.length < 1}
                        variant="newGreen"
                        onClick={() => {
                            sendMessage(
                                chatroom.id,
                                chatroom.communityId,
                                "community",
                                content,
                                imageUrl
                            ).then((callback) => {
                                if (callback.success) {
                                    setContent("");
                                    setImageUrl("");
                                    queryClient.invalidateQueries({
                                        queryKey: ["current-chatroom", chatroom.id],
                                    });
                                    queryClient.invalidateQueries({
                                        queryKey: ["usersWhoChatted"],
                                    })
                                }

                                if (callback.error) {
                                    toast({
                                        description: callback.error,
                                        variant: "destructive",
                                    });
                                }
                            });
                        }}
                    >
                        Send
                    </Button>
                </div>
            </main>
        </div>
    )
}
