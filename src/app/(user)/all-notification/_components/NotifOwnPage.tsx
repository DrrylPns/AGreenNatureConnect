"use client"

import { Button } from "@/components/ui/button"
import { CardTitle, CardDescription, CardHeader, CardFooter, Card } from "@/components/ui/card"
import { NotificationWithUser } from "@/lib/types"
import { UserAvatar } from "@/app/components/UserAvatar"
import { toast } from '@/lib/hooks/use-toast'
import Link from 'next/link'
import { getAuthSession } from "@/lib/auth"
import { formatCreatedAt } from "@/lib/utils"
import { NotificationsWithRelation } from "@/lib/types/extendedpost"
import { useTransition } from 'react'
import { notificationReadAll } from "../../../../../actions/notification"
import { User } from "@prisma/client"

interface Props {
    allNotification: any;
    user: User;
}

export const NotifOwnPage = ({
    allNotification,
    user,
}: Props) => {
    const [isPending, startTransition] = useTransition()
  return (
    <>
    <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Notifications</h1>
        <Button className="bg-white dark:bg-[#18191A] text-[#000000] dark:text-white"
         onClick={() => {
          startTransition(() => {
              notificationReadAll(user.id).then((callback) => {
                  if(callback.error) {
                      toast({
                          description: callback.error,
                          variant: "destructive"
                      })
                  }

                  if(callback.success) {
                      toast({
                          description: callback.success
                      })
                  }
              })
          })
      }}
        >
          Mark all as read
        </Button>
      </div>
      <div className="space-y-4">
        {allNotification.length === 0 ? (
          <div className="text-gray-500 dark:text-grey-200 text-center">You currently have no notifications yet.</div>
        ) : (
          <div className="grid gap-1 p-1 text-sm shadow">
            {allNotification.map((notification: NotificationsWithRelation) => (
              <div className="" key={notification.id}>
                <div className={`p-2 rounded-md ${!notification.isRead ? "bg-[#caf0f8] dark:bg-[#1b2026]" : "bg-[#ffffff]"}`}>
                <div className='flex items-center gap-3 pl-3 pt-2 mt-2 text-[#1F2937] dark:text-[#ffffff]'>
                                            {/* <MailIcon className="mr-2 h-7 w-7" /> */}
                                            {notification.type === "PENDING" && notification.community && (
                                                <Link className='flex gap-3 items-center' href={`/order-status/${notification.transactionId}`}>
                                                    <UserAvatar
                                                        user={{
                                                            name: user?.username || null,
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
                                                            name: user?.username || null,
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
                                                            name: user?.username || null,
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
                                                            name: user?.username || null,
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
                                                            name: user?.username || null,
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
                                                            name: user?.username || null,
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
                                                            name: user?.username || null,
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
                                                            name: user?.username || null,
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

                                        <time className={`ml-14 text-[13px] ${!notification.isRead ? " text-[#4662ff]" : "text-[#7f99b3] dark:text-gray"} `}>
                                            {formatCreatedAt(notification.createdAt)}
                                        </time>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
