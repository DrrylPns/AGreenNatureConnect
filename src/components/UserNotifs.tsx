"use client"

import { Popover, PopoverContent, PopoverTrigger } from '@/app/components/Ui/popover'
import { ScrollArea } from '@/app/components/Ui/scroll-area'
import { NotificationWithUser } from '@/lib/types'
import { formatCreatedAt } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { CiBellOn } from 'react-icons/ci'
import { GoDotFill } from "react-icons/go"
import { BeatLoader } from 'react-spinners'
import { fetchNotifications } from '../../actions/notification'

export const UserNotifs = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false)
    const [notifications, setNotifications] = useState<NotificationWithUser[]>([])
    const pathname = usePathname()

    const fetchNotificationsByUser = async () => {
        try {
            const notifs = await fetchNotifications();
            //@ts-ignore
            setNotifications(notifs as NotificationWithUser[]);
        } catch (error) {
            console.error('Error fetching notifications:', error);
            setError(true)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchNotificationsByUser()
    }, [])


    const hasUnread = notifications.some(notification => notification.isRead == false);

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
                <ScrollArea className="h-72 w-full rounded-md border">
                    <div className="p-1 py-4">
                        <h4 className="mb-2 text-[16px] leading-none ml-2 font-semibold">Notifications</h4>

                        {notifications.length === 0 && !loading && !error && (
                            <div className="text-gray-500 text-center">You currently have no notifications yet.</div>
                        )}

                        {loading && <div className="flex items-center justify-center"><BeatLoader /></div>}

                        {error && <div className="text-red-500">Error fetching notifications!</div>}

                        {!loading && !error && (
                            <>


                                {notifications.map((notification) => (
                                    <div key={notification.id} className="grid gap-1 p-1 text-sm">
                                        <Link
                                            className={`flex flex-col items-start p-2 rounded-md dark:bg-gray-800 ${!notification.isRead ? "bg-gray-100" : ""}`}
                                            href={`/order-status/${notification.transactionId}`}
                                        // onClick={async () => {
                                        //     notificationRead(notification.id, pathname)
                                        // }}
                                        >
                                            <div className='flex items-center'>
                                                {/* <MailIcon className="mr-2 h-7 w-7" /> */}
                                                {notification.type === "PENDING" && (
                                                    <div>Your order from <span className='font-bold'>{notification.community.name}</span> has been successfully issued.</div>
                                                )}

                                                {notification.type === "APPROVED" && (
                                                    <div><span className='font-bold'>{notification.community.name}</span> has approved your order.</div>
                                                )}

                                                {notification.type === "CANCELLED" && (
                                                    <div><span className='font-bold'>{notification.community.name}</span> has <span className='text-rose-500'>cancelled</span> your order.</div>
                                                )}

                                                {notification.type == "COMPLETED" && (
                                                    <div>Congratulations, you're order from <span className='font-bold'>{notification.community.name}</span> was successful!</div>
                                                )}

                                                {notification.type === "PICK_UP" && (
                                                    <div>You're order from {notification.community.name} has been picked up.</div>
                                                )}
                                            </div>

                                            <time className="text-[13px] text-gray-500 dark:text-gray-400">
                                                {formatCreatedAt(notification.createdAt)}
                                            </time>
                                        </Link>

                                    </div>
                                ))}
                            </>
                        )}
                    </div>
                </ScrollArea>
            </PopoverContent>
        </Popover>
    )
}
