"use client"

import { Popover, PopoverContent, PopoverTrigger } from '@/app/components/Ui/popover'
import { ScrollArea } from '@/app/components/Ui/scroll-area'
import { UserAvatar } from "@/app/components/UserAvatar"
import { Button } from "@/components/ui/button"
import { toast } from '@/lib/hooks/use-toast'
import { NotificationsWithRelation } from '@/lib/types/extendedpost'
import { formatCreatedAt } from '@/lib/utils'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Bell, BellDot } from 'lucide-react'
import { useSession } from "next-auth/react"
import { fetchNotifications, notificationRead } from '../../actions/notification'
import Link from 'next/link'

export const UserNotifs = () => {
    const queryClient = useQueryClient()

    const { data: session, status } = useSession();

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
        }
    })



    if (isLoading) return <></>

    const hasUnread = notifications?.some(notification => notification.isRead == false);

    return (
        <Popover>
            <PopoverTrigger>
                <div className='relative'>

                    <Bell />

                    {hasUnread && (
                        <span className=' text-6xl absolute right-[-1px] top-[-1px] bg-green dark:bg-[#242526]'><BellDot /></span>
                    )}
                </div>
            </PopoverTrigger>
            <PopoverContent className='p-0'>
                <ScrollArea className="h-72 w-full rounded-md border bg-[#ffffff] dark:bg-[#424444] ">
                    <div className="p-1 py-4">
                        <h4 className="mb-2 text-[16px] leading-none ml-2 pb-3 font-semibold border-b-2  border-black dark:border-[#f8fdfd]">Notifications</h4>
                        <div className="px-4 text-center items-center">
                            <Button className="mr-2 bg-white dark:bg-[#424444] text-[#000000] dark:text-white hover:bg-slate-200 dark:hover:bg-slate-600">Show all</Button>
                            <Button className='bg-white dark:bg-[#424444] text-[#000000] dark:text-white hover:bg-slate-200 dark:hover:bg-slate-600'>Read all</Button>
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
                                        className={`flex flex-col items-start p-2 rounded-md bg-[#ffffff] dark:bg-[#424444] ${!notification.isRead ? "bg-[#c5eed1] dark:bg-[#555757]" : ""}`}

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
                                        </div>

                                        <time className={`ml-14 text-[13px] text-[#7f99b3] dark:text-gray ${!notification.isRead ? " text-[#4e67f3] dark:text-[#4e67f3]" : ""} `}>
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
    )
}

