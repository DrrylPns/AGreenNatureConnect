'use client'
import Image from 'next/image';
import React, { useEffect, useState, useRef  } from 'react'
import DisplayPhoto from '@/app/(user)/discussion/images/displayphoto.png'
import PostButtons from './postButtons';
import { FaEllipsis } from 'react-icons/fa6'
import axios from 'axios';
import { Post, Block } from '@/lib/types'
import RelativeDate from '@/app/components/RelativeDate';
import Link from 'next/link';
import EditorOutput from '@/app/components/(user)/EditorOutput';

export default function Post() {
    const pref = useRef<HTMLDivElement>(null)
    const [posts, setPosts] = useState<Post[]>([]); 

    useEffect(()=>{
        getAllPosts()
    },[])

    const getAllPosts = async () => {
        try {
            const response = await axios.get('/api/user/post')
            setPosts(response.data)
        } catch (error) {
            console.log(error)

        }
    }
    return (
        <section className='sm:px-[3%] md:pl-[25%] lg:pr-[25%]'>
            {posts.map((post: Post) =>(
                <Link href={`/discussion/${post.topic.name}/${post.id}`}>
                <div key={post.id} className='bg-white w-full rounded-xl p-5 mt-3 drop-shadow-md shadow-md'>

                    <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-4'>
                            <div className='flex items-center overflow-hidden justify-center  rounded-full border w-userImage h-[2.5rem] border-black'>
                                {/*User Image, add default image if the user doesn't have DP user image will comes from the backend*/}
                                <Image
                                    src={post.author.image || DisplayPhoto}
                                    alt='User Image'
                                    width={40}
                                    height={40}

                                />
                            </div>

                            <div className='flex items-baseline gap-3'>
                                {/*Username*/}
                                <h1 className='text-lg font-poppins font-medium'>
                                    {post.author.username}
                                </h1>
                                {/*Time created display in hours forx ex. just now, 10m ago, 7h ago */}
                                <h3 className='text-[0.7rem] font-poppins'>
                                    <RelativeDate dateString={post.createdAt}/>
                                </h3>
                            </div>
                        </div>
                    <button type='button' onClick={() => { }}>
                        <FaEllipsis />
                    </button>
                </div>
                {/**Description & Images */}
                <h1 className='text-[1.5rem] font-poppins font-extrabold'>
                    {post.title}
                </h1>
                <div className='flex items-center font-poppins font-semibold gap-3 text-[0.5rem]'>
                    <span>Topic:</span>
                    <span className='text-[0.7rem px-2 py-1 rounded-full bg-muted-green text-white'>
                    {post.topic.name}
                    </span>
                </div>
                <div className='relative text-sm max-h-40 w-full overflow-clip' ref={pref}>
                    <EditorOutput content={post.content} />
                    {pref.current?.clientHeight === 160 ? (
                        <div
                            className='absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-white to-transparent'
                        />
                    ) : null}
                </div>
                    {/**Like, Comment, Share(if there is any) Section*/}
                    <PostButtons comments={post.comments.length} likes={post.likes.length} />
                </div>
                </Link>
            ))}
            <div className='text-gray-400 text-[1.3rem] text-center font-poppins font-semibold py-10'>
                <h3>There are no more available post right now.</h3>
            </div>
        </section>
    )
}