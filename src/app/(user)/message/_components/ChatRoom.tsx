"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/Ui/Avatar"
import { Button } from "@/app/components/Ui/Button"
import { Dialog, DialogContent, DialogTrigger } from "@/app/components/Ui/Dialog"
import { Input } from "@/app/components/Ui/Input"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogTrigger } from "@/app/components/Ui/alert-dialog"
import { LoadingComponent } from "@/components/LoadingComponent"
import { Card, CardContent } from "@/components/ui/card"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { toast } from "@/lib/hooks/use-toast"
import { formatTime, pusherClient } from "@/lib/pusher"
import { ChatRoomWithMessagesAndCommunity, CommunityWithMessages } from "@/lib/types"
import { UploadDropzone } from "@/lib/uploadthing"
import { useInfiniteQuery, useQuery, useQueryClient } from "@tanstack/react-query"
import { ImageDownIcon, Trash2 } from "lucide-react"
import Image from "next/image"
import { useEffect, useRef, useState, useTransition } from "react"
import { deleteMessage, fetchMessages, inspectChatRoom, sendMessage } from "../../../../../actions/chat"
import { fetchCommunities } from "../../../../../actions/community"

interface Props {
    chatroom: ChatRoomWithMessagesAndCommunity;
    userId: string
}

export const ChatRoom = ({ chatroom, userId }: Props) => {
    const [content, setContent] = useState<string>("")
    const queryClient = useQueryClient()
    const endOfMessagesRef = useRef<HTMLDivElement>(null)
    const [imageUrl, setImageUrl] = useState<string>("")
    const [isPending, startTransition] = useTransition()

    const imageIsEmpty = imageUrl.length === 0

    const { data: communities, isError, isLoading } = useQuery({
        queryKey: ["communities"],
        queryFn: async () => await fetchCommunities() as CommunityWithMessages[]
    })

    // this is how I fetched my messages
    const {
        data: messages,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status,
    } = useInfiniteQuery(
        ['messages', chatroom.id],
        ({ pageParam = 0 }) => fetchMessages(chatroom.id, pageParam, 20), // 20 messages limit then take na if umangat si user
        {
            getNextPageParam: (lastPage) => lastPage.nextPage,
            // refetchInterval: 4 * 1000,
            // staleTime: 4 * 1000,
        }
    )

    useEffect(() => {
        pusherClient.subscribe(chatroom.id);
        endOfMessagesRef.current?.scrollIntoView();

        const messageHandler = (newMessage: any) => {
            // Parse the createdAt string into a Date object
            const createdAtDate = new Date(newMessage.createdAt);

            // Use queryClient to optimistically update the messages query data
            queryClient.setQueryData(['messages', chatroom.id], (oldData: any) => {
                // Prepend the new message to the start of the messages array
                const newPages = oldData.pages.map((page: any, pageIndex: any) => {
                    if (pageIndex === 0) { // Assuming the first page contains the newest messages
                        return { messages: [{ ...newMessage, createdAt: createdAtDate }, ...page.messages] };
                    }
                    return page;
                });

                return { ...oldData, pages: newPages };
            });

            // Optionally, scroll to the new message
            endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
        };

        pusherClient.bind('messages:new', messageHandler);

        return () => {
            pusherClient.unsubscribe(chatroom.id);
            pusherClient.unbind('messages:new', messageHandler);
        };
    }, [chatroom.id, queryClient, messages]);


    const handleScroll = (event: any) => {
        const { scrollTop } = event.currentTarget;

        if (scrollTop === 0 && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    };

    if (isError) {
        return <div>Error fetching communities</div>;
    }

    if (isLoading) {
        return <LoadingComponent />
    }

    const avatarFallback = chatroom.community.name.charAt(0)

    return (
        <div className="flex h-screen bg-white dark:bg-zinc-800">
            <aside className="w-80 border-r dark:border-zinc-700 hidden lg:block">
                <div className="p-4 space-y-4 flex flex-row lg:flex-col">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold">Messages</h2>

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
                                                {latestMessage.userId === userId ? 'You sent: ' : ''}
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
                <header className="border-b dark:border-zinc-700 p-4">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <Avatar className="relative overflow-visible w-10 h-10">
                            <span className="absolute right-0 top-0 flex h-3 w-3 rounded-full bg-green-600" />
                            <AvatarImage alt="User Avatar" src="/placeholder-avatar.jpg" />
                            <AvatarFallback>{avatarFallback}</AvatarFallback>
                        </Avatar>
                        <div>
                            {chatroom.community.name}
                        </div>
                    </h2>
                </header>
                <main className="flex-1 overflow-auto p-0 md:p-4" onScroll={handleScroll}>
                    {isFetchingNextPage && <div className="w-full items-center">Loading more messages...</div>}
                    {messages?.pages?.slice().reverse().map((group, index) => (
                        <div key={index} className="space-y-4">
                            {group.messages?.slice().reverse().map((message, index) => (
                                <div className="space-y-4" key={index}>
                                    {message.userId === userId ? (
                                        <div className="flex items-start gap-2 justify-end w-[-50%]">
                                            {message.image ? (
                                                <div className="flex items-center gap-4">
                                                    <AlertDialog>
                                                        <AlertDialogTrigger className="cursor-pointer">
                                                            <Trash2 className="text-rose-500 w-5 h-5" />
                                                        </AlertDialogTrigger>
                                                        <AlertDialogContent>
                                                            <AlertDialogDescription>
                                                                Are you sure you want to delete this message?
                                                            </AlertDialogDescription>

                                                            <AlertDialogFooter>
                                                                <AlertDialogCancel asChild className="bg-zinc-100 text-zinc-900 hover:bg-zinc-200 outline outline-1 outline-zinc-300 active:scale-95 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:opacity-50 dark:focus:ring-slate-400 disabled:pointer-events-none dark:focus:ring-offset-slate-900">
                                                                    <Button
                                                                        variant="outline"
                                                                    >
                                                                        Cancel
                                                                    </Button>
                                                                </AlertDialogCancel>
                                                                <AlertDialogAction asChild className="bg-[#24643B]">
                                                                    <Button
                                                                        variant="destructive"
                                                                        onClick={() => {
                                                                            startTransition(() => {
                                                                                deleteMessage(message.id)
                                                                                    .then((data) => {
                                                                                        if (data.error) toast({
                                                                                            description: data.error,
                                                                                            variant: "destructive"
                                                                                        })

                                                                                        if (data.success) {
                                                                                            toast({
                                                                                                description: data.success
                                                                                            })

                                                                                            queryClient.invalidateQueries({ queryKey: ["messages", chatroom.id] })
                                                                                        }
                                                                                    })
                                                                            })
                                                                        }}
                                                                    >
                                                                        Delete
                                                                    </Button>
                                                                </AlertDialogAction>
                                                            </AlertDialogFooter>
                                                        </AlertDialogContent>
                                                    </AlertDialog>
                                                    <div>
                                                        <Image src={message.image} alt="Sent Image" className="w-80 h-80" width={320} height={320} />
                                                        <TooltipProvider>
                                                            <div className="rounded-b-lg bg-[#24643B] text-white p-2">
                                                                <Tooltip>
                                                                    <TooltipTrigger className="cursor-default">
                                                                        <p className="text-sm">{message.content}</p>
                                                                    </TooltipTrigger>
                                                                    <TooltipContent>
                                                                        {formatTime(message.createdAt)}
                                                                    </TooltipContent>
                                                                </Tooltip>
                                                            </div>
                                                        </TooltipProvider>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-4">

                                                    <AlertDialog>
                                                        <AlertDialogTrigger className="cursor-pointer">
                                                            <Trash2 className="text-rose-500" />
                                                        </AlertDialogTrigger>
                                                        <AlertDialogContent>
                                                            <AlertDialogDescription>
                                                                Are you sure you want to delete this message?
                                                            </AlertDialogDescription>

                                                            <AlertDialogFooter>
                                                                <AlertDialogCancel asChild className="bg-zinc-100 text-zinc-900 hover:bg-zinc-200 outline outline-1 outline-zinc-300 active:scale-95 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:opacity-50 dark:focus:ring-slate-400 disabled:pointer-events-none dark:focus:ring-offset-slate-900">
                                                                    <Button
                                                                        variant="outline"
                                                                    >
                                                                        Cancel
                                                                    </Button>
                                                                </AlertDialogCancel>
                                                                <AlertDialogAction asChild className="bg-[#24643B]">
                                                                    <Button
                                                                        variant="destructive"
                                                                        onClick={() => {
                                                                            startTransition(() => {
                                                                                deleteMessage(message.id)
                                                                                    .then((data) => {
                                                                                        if (data.error) toast({
                                                                                            description: data.error,
                                                                                            variant: "destructive"
                                                                                        })

                                                                                        if (data.success) {
                                                                                            toast({
                                                                                                description: data.success
                                                                                            })

                                                                                            queryClient.invalidateQueries({ queryKey: ["messages", chatroom.id] })
                                                                                        }
                                                                                    })
                                                                            })
                                                                        }}
                                                                    >
                                                                        Delete
                                                                    </Button>
                                                                </AlertDialogAction>
                                                            </AlertDialogFooter>
                                                        </AlertDialogContent>
                                                    </AlertDialog>



                                                    <TooltipProvider>
                                                        <div className="rounded-lg bg-[#24643B] text-white p-2">
                                                            <Tooltip>
                                                                <TooltipTrigger className="cursor-default">
                                                                    <p className="text-sm">{message.content}</p>
                                                                </TooltipTrigger>
                                                                <TooltipContent>
                                                                    {formatTime(message.createdAt)}
                                                                </TooltipContent>
                                                            </Tooltip>
                                                        </div>
                                                    </TooltipProvider>
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="flex items-start gap-2">
                                            {message.image ? (
                                                <div>
                                                    <Image src={message.image} alt="Sent Image" className="max-w-xs max-h-xs" width={320} height={320} />
                                                    <TooltipProvider>
                                                        <div className="rounded-lg bg-zinc-200 dark:bg-zinc-700 p-2">
                                                            <Tooltip>
                                                                <TooltipTrigger className="cursor-default">
                                                                    <p className="text-sm">{message.content}</p>
                                                                </TooltipTrigger>
                                                                <TooltipContent>
                                                                    {formatTime(message.createdAt)}
                                                                </TooltipContent>
                                                            </Tooltip>
                                                        </div>
                                                    </TooltipProvider>
                                                </div>
                                            ) : (
                                                <TooltipProvider>
                                                    <div className="rounded-lg bg-zinc-200 dark:bg-zinc-700 p-2">
                                                        <Tooltip>
                                                            <TooltipTrigger className="cursor-default">
                                                                <p className="text-sm">{message.content}</p>
                                                            </TooltipTrigger>
                                                            <TooltipContent>
                                                                {formatTime(message.createdAt)}
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    </div>
                                                </TooltipProvider>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ))}
                    <div ref={endOfMessagesRef} />
                </main>
                <footer className="border-t dark:border-zinc-700 p-4">
                    <div className="flex items-center gap-2">
                        <Dialog>
                            <DialogTrigger>
                                <ImageDownIcon className="cursor-pointer text-muted-foreground" />
                            </DialogTrigger>
                            <DialogContent>
                                {imageUrl.length ? <div className="w-full flex flex-col items-center justify-center mt-5">
                                    <Image
                                        alt='product image'
                                        src={imageUrl}
                                        width={250}
                                        height={250}
                                        className='mb-3'
                                    />
                                    <Button variant="outline" onClick={() => setImageUrl("")}>Change</Button>
                                </div> : <UploadDropzone
                                    className="text-green"
                                    appearance={{
                                        button: "bg-[#00B207] p-2 mb-3",
                                        label: "text-green",
                                        allowedContent: "flex h-8 flex-col items-center justify-center px-2 text-green",
                                    }}
                                    endpoint="imageUploader"
                                    onClientUploadComplete={(res) => {
                                        console.log('Files: ', res);
                                        if (res && res.length > 0 && res[0].url) {
                                            setImageUrl(res[0].url);
                                        } else {
                                            console.error('Please input a valid image.', res);
                                        }
                                    }}
                                    onUploadError={(error: Error) => {
                                        toast({
                                            title: 'Error!',
                                            description: error.message,
                                            variant: 'destructive',
                                        })
                                    }}

                                />
                                }
                            </DialogContent>
                        </Dialog>

                        <Input
                            className="flex-1"
                            placeholder="Type a message..."
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                        <Button
                            disabled={content.length < 1 && imageIsEmpty}
                            variant="newGreen"
                            onClick={() => {
                                sendMessage(chatroom.id, userId, "user", content, imageUrl).then((callback) => {
                                    if (callback.success) {
                                        setContent("")
                                        // queryClient.invalidateQueries({ queryKey: ["messages", chatroom.id] })
                                    }

                                    if (callback.error) {
                                        toast({
                                            description: callback.error,
                                            variant: "destructive"
                                        })
                                    }
                                })
                            }}>
                            Send
                        </Button>
                    </div>
                </footer>
            </section>
        </div>

    )
}
