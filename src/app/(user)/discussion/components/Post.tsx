'use client'
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import DisplayPhoto from '@/app/(user)/discussion/images/displayphoto.png'
import ImagePost1 from '../images/imagepost1.png'
import ImagePost2 from '../images/imagepost2.png'
import PostButtons from './postButtons';
import { FaEllipsis } from 'react-icons/fa6'
import axios from 'axios';
import { Post, Block } from '@/lib/types'
import RelativeDate from '@/app/components/RelativeDate';
import Link from 'next/link';

export default function Post() {
    const [isLoading ,setIsLoading] = useState(true);
    const [posts, setPosts] = useState<Post[]>([]); 

    useEffect(()=>{
        getAllPosts()
    },[])
    
    const getAllPosts = async () => {
        try {
            const response = await axios.get('/api/post/')
            setPosts(response.data)
        } catch (error) {
            console.log(error)

        }
    }
    return (
        <section className='sm:px-[3%] md:pl-[25%] lg:pr-[25%]'>
            {posts.map((post: Post) =>(
                <Link href={`/discussion/${post.id}`}>
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
                    <div className='mt-2 w-full'>
                    {/**Description */}
                    {post.content.blocks.map((block: Block) => (
                    <>  {block.type === 'paragraph' && (
                        <div>
                            <p>{block.data.text}</p>
                        </div>
                        )}
                        {block.data.file?.url && (
                        <div className={'w-full'}>
                            <Image
                                src={block.data.file?.url}
                                alt={block.data.caption}
                                width={100}
                                height={100}
                                className='w-full h-20 object-fill'
                                quality={100}
                            />
                            {block.data.caption}
                        </div>
                        )}
                        
                    </>
                    ))}
                   
                        
                        {/**Like, Comment, Share(if there is any) Section*/}
                        <PostButtons likes={post.likes.length} comments={post.comments.length} />
                    </div>
                </div>
                </Link>
            ))}
            <div className='text-gray-400 text-[1.3rem] text-center font-poppins font-semibold py-10'>
                <h3>There are no more available post right now.</h3>
            </div>
        </section>
    )
}
