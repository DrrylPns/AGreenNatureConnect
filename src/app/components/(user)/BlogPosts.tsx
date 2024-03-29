import { Blogs } from '@/lib/types/blogs'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import BlogCard from './BlogCard'
import { Session } from 'next-auth'
import prisma from '@/lib/db/db'

interface BlogPostsProps {
    session: Session | null
}

const BlogPosts: React.FC<BlogPostsProps> = async ({ session }) => {
    // const [data, setData] = useState<Blogs[]>([]);
    // const [isLoading, setIsLoading] = useState(true);
    // const [isError, setIsError] = useState(false);

    const getBlogs = async () => {
        const blogs = await prisma.blog.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                author: true,
            }
        })

        return blogs
    }

    const blogs = await getBlogs();
    console.log(blogs)

    // using manual useEffect
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await axios.get('api/user/getBlogs');
    //             setData(response.data);
    //         } catch (error) {
    //             setIsError(true);
    //         } finally {
    //             setIsLoading(false);
    //         }
    //     };

    //     fetchData();
    // }, []);

    // if (isLoading) return <div>Load blogs...</div>;
    // if (isError) return <>Error fetching blogs...</>;

    // using tanstack query
    // const { data, isLoading, isError, } = useQuery({
    //     queryKey: ['getBlogs'],
    //     queryFn: async () => {
    //         const { data } = await axios.get('api/user/blogs')
    //         // console.log(data)
    //         return data as Blogs[]
    //     }
    // })

    // if isLoading === pa render nlng ng skeleton or any etc..
    // if (isLoading) return <div>Load blogs...</div>

    // // if Error === pa render nlng kung ano mgiging itsura sa ui
    // if (isError) return <>Error fetching blogs...</>

    return (
        <div className='grid grid-cols-1 gap-5'>

            {/* <Button onClick={() => refetch()}>Refetch that shi</Button> */}
            {blogs.map((blog) => (
                <>
                    {/* {blog.isApproved === "APPROVED" && ( */}
                    {/* //@ts-ignore */}
                    {/* <BlogCard key={blog.id} session={session} {...blog} /> */}
                    {/* )} */}
                </>
            ))}
        </div>
    )
}

export default BlogPosts