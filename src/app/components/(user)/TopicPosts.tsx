import { ExtendedPost } from '@/lib/types/extendedpost'
import React from 'react'
import { useIntersection } from "@mantine/hooks"

interface TopicPostsFeed {
    initialPosts: ExtendedPost[]
    topicName?: string
}

const TopicPosts: React.FC<TopicPostsFeed> = ({initialPosts, topicName}) => {

    const {} = useIntersection

  return (
    <div>TopicPosts</div>
  )
}

export default TopicPosts