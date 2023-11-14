"use client"
import { Blogs } from '@/lib/types/blogs'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import BlogCard from './BlogCard'
import { Session } from 'next-auth'

interface BlogPostsProps {
    session: Session | null
}

const BlogPosts: React.FC<BlogPostsProps> = ({ session }) => {

    const { data, isLoading, isError, } = useQuery({
        queryKey: ['getBlogs'],
        queryFn: async () => {
            const { data } = await axios.get('api/user/blogs')
            // console.log(data)
            return data as Blogs[]
        }
    })

    // if isLoading === pa render nlng ng skeleton or any etc..
    if (isLoading) return <div>Load blogs...</div>

    // if Error === pa render nlng kung ano mgiging itsura sa ui
    if (isError) return <>Error fetching blogs...</>

    return (
        <div className='grid grid-cols-1 gap-5'>
            {/* <Button onClick={() => refetch()}>Refetch that shi</Button> */}
            {data.map((blog) => (
                <BlogCard key={blog.id} session={session} {...blog} />
            ))}
        </div>
    )
}

export default BlogPosts