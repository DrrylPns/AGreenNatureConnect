"use client"

import { Popover, PopoverContent, PopoverTrigger } from '@/app/components/Ui/popover'
import { ScrollArea } from '@/app/components/Ui/scroll-area'
import { toast } from '@/lib/hooks/use-toast'
import { formatCreatedAt } from '@/lib/utils'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'
import { useState } from 'react'
import { CiBellOn } from 'react-icons/ci'
import { GoDotFill } from "react-icons/go"
import { BeatLoader } from 'react-spinners'
import { fetchNotifications, notificationRead } from '../../actions/notification'
import { NotificationWithUser } from '@/lib/types'
import { NotificationWithRelations } from '@/lib/types/extendedpost'
import { UserAvatar } from "@/app/components/UserAvatar";
import { useSession } from "next-auth/react";



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
                return fetchedNotifications as NotificationWithRelations[]
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
                    <CiBellOn />
                    {hasUnread && (
                        <span className='text-red-600 text-lg absolute right-[-1px] top-[-1px]'><GoDotFill /></span>
                    )}
                </div>
            </PopoverTrigger>
            <PopoverContent className='p-0'>
                <ScrollArea className="h-72 w-full rounded-md border bg-[#E6F4EA] dark:bg-[#1B4332] ">
                    <div className="p-1 py-4">
                        <h4 className="mb-2 text-[16px] leading-none ml-2 pb-3 font-semibold border-b-2 border-black dark:border-white">Notifications</h4>

                        {notifications?.length === 0 && (
                            <div className="text-gray-500 text-center">You currently have no notifications yet.</div>
                        )}

                        {/* {loading && <div className="flex items-center justify-center"><BeatLoader /></div>}

                        {error && <div className="text-red-500">Error fetching notifications!</div>} */}

                        <>
                            {notifications?.map((notification) => (
                                <div key={notification.id} className="grid gap-1 p-1 text-sm shadow ">

                                    <Link

                                        className={`flex flex-col items-start p-2 rounded-md bg-[#E6F4EA] dark:bg-[#1B4332] ${!notification.isRead ? "bg-[#d3f2dc] dark:bg-[#266048]" : ""}`}
                                        href={
                                            //@ts-ignore
                                            notification.type === "REACT" ? `/discussion/${notification?.Post?.topic?.name}/${notification?.Post?.id}` :
                                                //@ts-ignore
                                                notification.type === "COMMENT" ? `/discussion/${notification?.Comment?.post?.topic?.name}/${notification.Comment?.post?.id}` :
                                                    //@ts-ignore
                                                    notification.type === "REPLY" ? `/discussion/${notification?.Reply?.comment?.post?.topic?.name}/${notification?.Reply?.comment?.post.id}` :
                                                        `/order-status/${notification.transactionId}`
                                        }
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
                                            <UserAvatar
                                                user={{
                                                    name: session?.user.username || null,
                                                    image: session?.user.image || null,
                                                }}
                                                className="h-8 w-8"
                                            />

                                            {/* <MailIcon className="mr-2 h-7 w-7" /> */}
                                            {notification.type === "PENDING" && (
                                                <div>Your order from <span className='font-bold text-[#15803D] dark:text-[#34D399]'>{notification.community.name}</span> has been successfully issued.</div>
                                            )}

                                            {notification.type === "APPROVED" && (
                                                <div><span className='font-bold text-[#15803D] dark:text-[#34D399]'>{notification.community.name}</span> has approved your order.</div>
                                            )}

                                            {notification.type === "CANCELLED" && (
                                                <div><span className='font-bold text-[#15803D] dark:text-[#34D399]'>{notification.community.name}</span> has <span className='text-rose-500'>cancelled</span> your order.</div>
                                            )}

                                            {notification.type == "COMPLETED" && (
                                                <div>Congratulations, you're order from <span className='font-bold text-[#15803D] dark:text-[#34D399]'>{notification.community.name}</span> was successful!</div>
                                            )}

                                            {notification.type === "PICK_UP" && (
                                                <div>You're order from <span className='font-bold text-[#15803D] dark:text-[#34D399]'>{notification.community.name}</span> has been picked up.</div>
                                            )}

                                            {notification.type === "REACT" && (
                                                <div>{notification.user.name} Has reacted to your post.</div>
                                            )}

                                            {notification.type === "COMMENT" && (
                                                <div>{notification.Comment.author.name} Has commented to your post.</div>
                                            )}

                                            {notification.type === "REPLY" && (
                                                <div>{notification.user.name} Has replied to your comment.</div>
                                            )}
                                        </div>

                                        <time className={`ml-14 text-[13px] text-[#7f99b3] dark:text-gray-400 ${!notification.isRead ? " text-[#dca745] dark:text-[#FEF9C3]" : ""} `}>
                                            {formatCreatedAt(notification.createdAt)}
                                        </time>
                                    </Link>

                                </div>
                            ))}
                        </>
                    </div>
                </ScrollArea>
            </PopoverContent>
        </Popover>
    )
}

