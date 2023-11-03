"use client"
import { ExtendedPost } from '@/lib/types/extendedpost'
import React, { useRef } from 'react'
import { useIntersection } from "@mantine/hooks"
import { useInfiniteQuery } from '@tanstack/react-query'
import { INFINITE_SCROLLING_PAGINATION_RESULTS } from '@/config'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import Post from './Post'


interface TopicPostsFeed {
    initialPosts: ExtendedPost[]
    topicName?: string
}

const TopicPosts: React.FC<TopicPostsFeed> = ({ initialPosts, topicName }) => {

    const lastPostRef = useRef<HTMLElement>(null)
    const { ref, entry } = useIntersection({
        root: lastPostRef.current,
        threshold: 1
    })

    const { data: session } = useSession()

    const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
        ['infinite-query'],
        async ({ pageParam = 1 }) => {
            const query = `/api/user/posts?limit=${INFINITE_SCROLLING_PAGINATION_RESULTS}&page=${pageParam}` +
                (!!topicName ? `&topicName=${topicName}` : '')

            const { data } = await axios.get(query)
            return data as ExtendedPost[]
        },
        {
            getNextPageParam: (_, pages) => {
                return pages.length + 1
            },

            initialData: { pages: [initialPosts], pageParams: [1] },
        }
    )

    // if data?.pages.flatMap((page) => page) is null or undefined then render intialPosts
    const posts = data?.pages.flatMap((page) => page) ?? initialPosts

    return (
        <ul className='flex flex-col col-span-2 space-y-6'>
            {posts.map((post, index) => {
                // like functionality to revise

                const likesAmt = post.likes.reduce((acc, like) => {
                    if (like) return acc + 1

                    if (!like) return acc - 1

                    return acc
                }, 0)

                //check logic kung nakapag like na ba or hindi
                const currentLike = post.likes.find(
                    (like) => like.userId === session?.user.id
                )

                if (index === posts.length - 1) {
                    return (
                        <li
                            key={post.id}
                            ref={ref}>
                            <Post topicName={post.topic.name} post={post} commentAmt={post.comments.length} />
                        </li>
                    )
                } else {
                    return <Post topicName={post.topic.name} post={post} commentAmt={post.comments.length} />
                }
            })}
        </ul>
    )
}

export default TopicPosts