"use client"

import { Popover, PopoverContent, PopoverTrigger } from '@/app/components/Ui/popover'
import { ScrollArea } from '@/app/components/Ui/scroll-area'
import { UserAvatar } from "@/app/components/UserAvatar"
import { Button } from "@/components/ui/button"
import { toast } from '@/lib/hooks/use-toast'
import { NotificationsWithRelation } from '@/lib/types/extendedpost'
import { formatCreatedAt } from '@/lib/utils'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { GoDotFill } from "react-icons/go"
import { Bell } from 'lucide-react'
import { useSession } from "next-auth/react"
import { fetchNotifications, notificationRead, notificationReadAll } from '../../actions/notification'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader } from './ui/dialog'
import { Input } from '@/app/components/Ui/Input'
import { sendProductRequestAnswer } from '../../actions/community'

export const UserNotifs = () => {
    const queryClient = useQueryClient()
    const { data: session, status } = useSession();
    const [isPending, startTransition] = useTransition()
    const [open, setOpen] = useState(false)
    const [requestStock, setRequestStock] = useState("")

    const router = useRouter();

    const handleButtonClick = () => {
        router.push('all-notification');
    }


    // const [notifications, setNotifications] = useState<NotificationWithUser[]>([])

    // const fetchNotificationsByUser = async () => {
    //     try {
    //         const notifs = await fetchNotifications();
    //         //@ts-ignore
    //         setNotifications(notifs as NotificationWithUser[]);
    //     } catch (error) {
    //         console.error('Error fetching notifications:', error);
    //         setError(true)
    //     } finally {
    //         setLoading(false);
    //     }
    // }

    // useEffect(() => {
    //     fetchNotificationsByUser()
    // }, [])



    const { data: notifications, isLoading } = useQuery({
        queryKey: ["notifications"],
        queryFn: async () => {
            try {
                const fetchedNotifications = await fetchNotifications()
                return fetchedNotifications as NotificationsWithRelation[]
            } catch (error) {
                throw new Error('Error fetching notifications');
            }
        },
        refetchInterval: 4 * 1000,
        staleTime: 4 * 1000,
    })


    if (isLoading) return <></>

    const hasUnread = notifications?.some(notification => notification.isRead == false);

    return (
        <>
            <Popover>
                <PopoverTrigger>
                    <div className='relative'>

                        <Bell className="w-6 h-6 md:w-7 md:h-7" />

                        {hasUnread && (
                            <span className='text-red-600 text-lg absolute right-[-2px] top-[-4px]'><GoDotFill /></span>
                        )}
                    </div>
                </PopoverTrigger>
                <PopoverContent className='p-0'>
                    <ScrollArea className="h-72 w-full rounded-md border bg-[#ffffff] dark:bg-[#424444] ">
                        <div className="p-1 py-4">
                            <h4 className="mb-2 text-[16px] leading-none ml-2 pb-3 font-semibold border-b-2  border-black dark:border-[#f8fdfd]">Notifications</h4>
                            <div className="px-4 text-center items-center">
                                <Button className="mr-2 bg-white dark:bg-[#424444] text-[#000000] dark:text-white hover:bg-slate-200 dark:hover:bg-slate-600" onClick={handleButtonClick}>Show all</Button>
                                <Button
                                    disabled={isPending}
                                    className='bg-white dark:bg-[#424444] text-[#000000] dark:text-white hover:bg-slate-200 dark:hover:bg-slate-600'
                                    onClick={() => {
                                        startTransition(() => {
                                            notificationReadAll(session?.user.id).then((callback) => {
                                                if (callback.error) {
                                                    toast({
                                                        description: callback.error,
                                                        variant: "destructive"
                                                    })
                                                }

                                                if (callback.success) {
                                                    toast({
                                                        description: callback.success
                                                    })
                                                }
                                            })
                                        })
                                    }}
                                >Read all</Button>
                            </div>
                            {notifications?.length === 0 && (
                                <div className="text-gray-500 dark:text-grey-200 text-center">You currently have no notifications yet.</div>
                            )}

                            {/* {loading && <div className="flex items-center justify-center"><BeatLoader /></div>}

                        {error && <div className="text-red-500">Error fetching notifications!</div>} */}

                            <>
                                {notifications?.map((notification) => (
                                    <div key={notification.id} className="grid gap-1 p-1 text-sm shadow">

                                        <div
                                            className={`flex flex-col items-start p-2 rounded-md ${!notification.isRead ? "bg-[#caf0f8] dark:bg-[#1b2026]" : "bg-[#ffffff] dark:bg-[#424444]"}`}

                                            // href={
                                            //     //@ts-ignore
                                            //     notification.type === "REACT" ? `/discussion/${notification?.Post?.topic?.name}/${notification?.Post?.id}` :
                                            //         //@ts-ignore
                                            //         notification.type === "COMMENT" ? `/discussion/${notification?.Comment?.post?.topic?.name}/${notification.Comment?.post?.id}` :
                                            //             //@ts-ignore
                                            //             notification.type === "REPLY" ? `/discussion/${notification?.Reply?.comment?.post?.topic?.name}/${notification?.Reply?.comment?.post.id}` :
                                            //                 `/order-status/${notification.transactionId}`
                                            // }

                                            onClick={async () => {
                                                notificationRead(notification.id).then((callback) => {
                                                    if (callback?.error) {
                                                        toast({
                                                            description: callback.error,
                                                            variant: "destructive"
                                                        })
                                                    }

                                                    if (callback?.success) {
                                                        toast({
                                                            description: callback.success
                                                        })
                                                        queryClient.invalidateQueries({ queryKey: ["notifications"] })
                                                    }
                                                })
                                            }}
                                        >


                                            <div className='flex items-center gap-3 text-[#1F2937] dark:text-[#ffffff]'>
                                                {/* <MailIcon className="mr-2 h-7 w-7" /> */}
                                                {notification.type === "PENDING" && notification.community && (
                                                    <Link className='flex gap-3 items-center' href={`/order-status/${notification.transactionId}`}>
                                                        <UserAvatar
                                                            user={{
                                                                name: session?.user.username || null,
                                                                image: notification.community.displayPhoto as string
                                                            }}
                                                            className="h-8 w-8"
                                                        />
                                                        <div>
                                                            Your order from <span className='font-bold text-[#15803D] dark:text-[#34D399]'>{notification.community.name}</span> has been successfully issued.
                                                        </div>
                                                    </Link>
                                                )}

                                                {notification.type === "APPROVED" && notification.community && (
                                                    <Link className='flex gap-3 items-center' href={`/order-status/${notification.transactionId}`}>
                                                        <UserAvatar
                                                            user={{
                                                                name: session?.user.username || null,
                                                                image: notification.community.displayPhoto as string
                                                            }}
                                                            className="h-8 w-8"
                                                        />
                                                        <div>
                                                            <span className='font-bold text-[#15803D] dark:text-[#34D399]'>{notification.community.name}</span> has approved your order.
                                                        </div>
                                                    </Link>
                                                )}

                                                {notification.type === "CANCELLED" && notification.community && (
                                                    <Link className='flex gap-3 items-center' href={`/order-status/${notification.transactionId}`}>
                                                        <UserAvatar
                                                            user={{
                                                                name: session?.user.username || null,
                                                                image: notification.community.displayPhoto as string
                                                            }}
                                                            className="h-8 w-8"
                                                        />
                                                        <div>
                                                            <span className='font-bold text-[#15803D] dark:text-[#34D399]'>{notification.community.name}</span> has <span className='text-rose-500'>cancelled</span> your order.
                                                        </div>
                                                    </Link>
                                                )}

                                                {notification.type == "COMPLETED" && notification.community && (
                                                    <Link className='flex gap-3 items-center' href={`/order-status/${notification.transactionId}`}>
                                                        <UserAvatar
                                                            user={{
                                                                name: session?.user.username || null,
                                                                image: notification.community.displayPhoto as string
                                                            }}
                                                            className="h-8 w-8"
                                                        />
                                                        <div>
                                                            Congratulations, you're order from <span className='font-bold text-[#15803D] dark:text-[#34D399]'>{notification.community.name}</span> was successful!
                                                        </div>
                                                    </Link>
                                                )}

                                                {notification.type === "PICK_UP" && notification.community && (
                                                    <Link className='flex gap-3 items-center' href={`/order-status/${notification.transactionId}`}>
                                                        <UserAvatar
                                                            user={{
                                                                name: session?.user.username || null,
                                                                image: notification.community.displayPhoto as string
                                                            }}
                                                            className="h-8 w-8"
                                                        />
                                                        <div>
                                                            You're order from <span className='font-bold text-[#15803D] dark:text-[#34D399]'>{notification.community.name}</span> has been picked up.
                                                        </div>
                                                    </Link>
                                                )}

                                                {notification.type === "REACT" && notification.Reaction && (
                                                    <Link className='flex gap-3 items-center' href={`/discussion/${notification?.Reaction?.post.topic.name}/${notification?.Reaction?.post.id}`}>
                                                        <UserAvatar
                                                            user={{
                                                                name: session?.user.username || null,
                                                                image: notification.Reaction.user.image as string
                                                            }}
                                                            className="h-8 w-8"
                                                        />
                                                        <div>
                                                            {notification.Reaction.user.name} Has reacted to your post.
                                                        </div>
                                                    </Link>
                                                )}

                                                {notification.type === "COMMENT" && notification.Comment && (
                                                    <Link className='flex gap-3 items-center' href={`/discussion/${notification?.Comment?.post?.topic?.name}/${notification.Comment?.post?.id}`}>
                                                        <UserAvatar
                                                            user={{
                                                                name: session?.user.username || null,
                                                                image: notification.Comment.author.image as string
                                                            }}
                                                            className="h-8 w-8"
                                                        />
                                                        <div>
                                                            {notification.Comment.author.name} Has commented to your post.
                                                        </div>
                                                    </Link>
                                                )}

                                                {notification.type === "REPLY" && notification.Reply && (
                                                    <Link className='flex gap-3 items-center' href={`/discussion/${notification?.Reply?.comment?.post?.topic?.name}/${notification?.Reply?.comment?.post.id}`}>
                                                        <UserAvatar
                                                            user={{
                                                                name: session?.user.username || null,
                                                                image: notification.Reply.user.image as string
                                                            }}
                                                            className="h-8 w-8"
                                                        />
                                                        <div>
                                                            {notification.Reply.user.name} Has replied to your comment.
                                                        </div>
                                                    </Link> // Reply.author.name
                                                )}

                                                {notification.type === "CONSIGNOR_ACCEPTED" && notification.consignor && (
                                                    <Link className='flex gap-3 items-center' href={``}>
                                                        <UserAvatar
                                                            user={{
                                                                name: notification.consignor.urbanFarm.name || null,
                                                                image: notification.consignor.urbanFarm.displayPhoto as string
                                                            }}
                                                            className="h-8 w-8"
                                                        />
                                                        <div>
                                                            <span className='font-bold text-[#15803D] dark:text-[#34D399]'>
                                                                {notification.consignor.urbanFarm.name} {" "}
                                                            </span>
                                                            has accepted your request to be a consignor!
                                                        </div>
                                                    </Link>
                                                )}

                                                {notification.type && notification.productRequest && (
                                                    <>
                                                        <div
                                                            className='flex gap-3 items-center cursor-pointer'
                                                            onClick={() => setOpen(true)}
                                                        >
                                                            <UserAvatar
                                                                user={{
                                                                    name: notification.productRequest.urbanFarm.name || null,
                                                                    image: notification.productRequest.urbanFarm.displayPhoto || null
                                                                }}
                                                                className="h-8 w-8"
                                                            />
                                                            <div>
                                                                <span className='font-bold text-[#15803D] dark:text-[#34D399]'>
                                                                    {notification.productRequest.urbanFarm.name} {" "}
                                                                </span>
                                                                {notification.productRequest.request}
                                                            </div>
                                                        </div>

                                                        <Dialog open={open} onOpenChange={setOpen}>
                                                            <DialogContent>
                                                                <DialogHeader className='font-semibold'>
                                                                    Respond to Product Request
                                                                </DialogHeader>
                                                                <p className='text-sm text-muted-foreground'>How many stocks do you want to send?</p>
                                                                <Input
                                                                    value={requestStock}
                                                                    onChange={(e) => setRequestStock(e.target.value)}
                                                                    placeholder="Enter stocks"
                                                                />
                                                                <DialogFooter>
                                                                    <Button
                                                                        type='submit'
                                                                        disabled={isPending}
                                                                        onClick={() => {
                                                                            startTransition(() => {
                                                                                sendProductRequestAnswer(notification.productRequestId as string, requestStock).then((callback) => {
                                                                                    if (callback.error) {
                                                                                        toast({
                                                                                            description: callback.error,
                                                                                            variant: "destructive"
                                                                                        })
                                                                                    }

                                                                                    if (callback.success) {
                                                                                        toast({
                                                                                            description: callback.success
                                                                                        })
                                                                                    }
                                                                                })
                                                                            })
                                                                        }}
                                                                    >
                                                                        Send Stock
                                                                    </Button>
                                                                </DialogFooter>
                                                            </DialogContent>
                                                        </Dialog>
                                                    </>
                                                )}



                                                {/* {notifications.map((notification) => (
                                                <div key={notification.id}>
                                                    {notification.type === "REQUEST" && (

                                                        notification.consignor && notification.consignor.urbanFarm && (
                                                            <Link href={``} className='flex gap-3 items-center'>
                                                                <UserAvatar
                                                                    user={{
                                                                        name: notification.consignor.urbanFarm.name || null,
                                                                        image: notification.consignor.urbanFarm.displayPhoto as string
                                                                    }}
                                                                    className="h-8 w-8"
                                                                />
                                                                <div>

                                                                    {notification.consignor.urbanFarm.ProductRequest && (

                                                                        notification.consignor.urbanFarm.ProductRequest.map((request, index) => {
                                                                            console.log('Request:', request)
                                                                            console.log("UF Name:", notification.consignor?.urbanFarm.name)
                                                                            return (
                                                                                <div key={index}>
                                                                                    {notification.consignor?.urbanFarm.name} has requested a product: {request.request}
                                                                                </div>
                                                                            )
                                                                        }
                                                                        )
                                                                    )}
                                                                </div>
                                                            </Link>
                                                        )
                                                    )}
                                                </div>
                                            ))} */}

                                                {/* {notification.type === "URBANFARM_ACCEPTED" && notification.urbanFarmApplication && (
                                                <Link className='flex gap-3 items-center' href={``}>
                                                    <UserAvatar
                                                        user={{
                                                            name: notification.consignor.urbanFarm.name || null,
                                                            image: notification.consignor.urbanFarm.displayPhoto as string
                                                        }}
                                                        className="h-8 w-8"
                                                    />
                                                    <div>
                                                        {notification.consignor.urbanFarm.name} has accepted your request to be a consignor!
                                                    </div>
                                                </Link> // Reply.author.name
                                            )} */}
                                            </div>

                                            <time className={`ml-14 text-[13px]  ${!notification.isRead ? " text-[#4662ff]" : "text-[#7f99b3] dark:text-gray"} `}>
                                                {formatCreatedAt(notification.createdAt)}
                                            </time>
                                        </div>

                                    </div>
                                ))}
                            </>
                        </div>
                    </ScrollArea>
                </PopoverContent>
            </Popover>
        </>
    )
}

