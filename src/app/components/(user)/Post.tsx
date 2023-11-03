import PostButtons from '@/app/(user)/discussion/components/postButtons';
import { formatTimeToNow } from '@/lib/utils';
import { Like, Post, User } from '@prisma/client';
import { MessageSquare } from 'lucide-react';
import Image from 'next/image';
import React, { useRef } from 'react'
import { FaEllipsis } from 'react-icons/fa6';
import EditorOutput from './EditorOutput';

interface PostProps {
    topicName: string;
    post: Post & {
        author: User,
        likes: Like[]
    }
    commentAmt: number;
}

const Post: React.FC<PostProps> = ({ topicName, post, commentAmt }) => {

    const pref = useRef<HTMLDivElement>(null)

    return (
        <section className='w-full'>
            {/*POSTS, use Fetch api here and map through all post and display it depending on the filtering*/}
            <div className='bg-white w-full rounded-xl p-5 mt-3 drop-shadow-md shadow-md'>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-4'>
                        <div className='w-userImage rounded-full'>
                            {/*User Image, add default image if the user doesn't have DP user image will comes from the backend*/}
                            {/* todo ts error fix */}
                            <Image
                                src={post.author.image || "/images/avatar-placeholder.jpg"}
                                alt='User Image'
                                width={40}
                                height={40}
                                className='rounded-full'
                            />
                        </div>

                        <div className='flex items-baseline gap-3'>
                            {/*Username*/}
                            <h1 className='text-lg font-poppins font-medium'>{post.author.username}</h1>
                            {/*Time created display in hours forx ex. just now, 10m ago, 7h ago */}
                            <h3 className='text-sm font-poppins'>{formatTimeToNow(new Date(post.createdAt))}</h3>
                        </div>
                    </div>

                    <button type='button' onClick={() => { }}>
                        <FaEllipsis />
                    </button>
                </div>
                {/**Description & Images */}
                <div className='mt-2 w-full'>
                    <a href={`/discussion/topic/${topicName}/post/${post.id}`}>
                        {/**Description */}
                        <h1 className='text-lg font-semibold py-2 leading-6 text-gray-900'>
                            {post.title}
                        </h1>
                    </a>

                    <div className='relative text-sm max-h-40 w-full overflow-clip' ref={pref}>

                    <a href={`/discussion/topic/${topicName}/post/${post.id}`}>
                        <EditorOutput content={post.content} />
                    </a>

                        {pref.current?.clientHeight === 160 ? (
                            <div
                                className='absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-white to-transparent'
                            />
                        ) : null}
                    </div>
                    {/**if there is no image uploaded by the user dont display this element else display all but*/}

                    {/**Like, Comment, Share(if there is any) Section*/}
                    <PostButtons commentAmt={commentAmt} topicName={topicName} post={post} />

                </div>
            </div>
            {/*POSTS, use Fetch api here and map through all post and display it depending on the filtering*/}
            {/**We can make component for this div in order for this page to become short and clean */}
        </section>

        // <div className='rounded-xl bg-white shadow'>
        //     <div className='px-6 py-4 flex justify-between'>
        //         {/* TODO LIKE FUNCTIONALITY */}

        //         <div className='w-0 flex-1'>
        //             <div className='max-h-40 mt-1 text-xs text-gray-500'>
        //                 {topicName ? (
        //                     <>
        //                         <a href={`/discussion/topic/${topicName}`} className='underline text-zinc-900 text-sm underline-offset-2'>
        //                             {topicName}
        //                         </a>
        //                     </>
        //                 ) : null}
        //                 <div className='flex items-baseline gap-3'>
        //                     {/*Username*/}
        //                     <h1 className='text-lg font-poppins font-medium'>{post.author.name}</h1>
        //                     {/*Time created display in hours forx ex. just now, 10m ago, 7h ago */}
        //                     <h3 className='text-sm font-poppins'>7h</h3>
        //                 </div>
        //             </div>





        //             <div className='relative text-sm max-h-40 w-full overflow-clip'>

        //             </div>
        //         </div>
        //     </div>

        //     <div className='bg-gray-50 z-20 text-sm p-4 sm:px-6'>

        //     </div>
        // </div>
    )
}

export default Post