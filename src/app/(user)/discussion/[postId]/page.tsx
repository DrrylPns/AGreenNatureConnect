'use client'
import RelativeDate from '@/app/components/RelativeDate';
import { Post, Comment, Block } from '@/lib/types';
import axios from 'axios';
import Image from 'next/image';
import React, { FC, useEffect, useState } from 'react'
import DisplayPhoto from '../images/displayphoto.png'
import { FaEllipsis } from 'react-icons/fa6';
import PostButtons from '../components/postButtons';
import { RotatingLines } from 'react-loader-spinner';
import Link from 'next/link';


interface Props {
  params: { postId: string}
}

const page: FC<Props> = ({params}) => {
  const [posts, setPosts] = useState<Post>(); 

  useEffect(() => {
    fetchPost();
   
  }, [params.postId]);

  
  const fetchPost = async () => {
    try {
      const response = await axios.get(`/api/post/${params.postId}`);
      const data = response.data;
      setPosts(data);
    } catch (error) {
      console.error('Error fetching post:', error);
    }
  };

 
  return (
    <main className="pt-[8rem] md:px-[25%] md:pt-[6rem] px-[3%] ">
      {posts ? (
        <>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-4'>
              <Link href={''} className='flex items-center overflow-hidden justify-center  rounded-full border w-userImage h-[2.5rem] border-black'>
                {/*User Image, add default image if the user doesn't have DP user image will comes from the backend*/}
                <Image
                  src={posts.author.image || DisplayPhoto}
                  alt='User Image'
                  width={40}
                  height={40}
                />
              </Link>
              <div className='flex items-center gap-3'>
                {/*Username*/}
                <h1 className='text-lg font-poppins font-medium'>
                    {posts.author.username}
                </h1>
                <div className='rounded-full w-1 h-1 bg-black'></div>
                {/*Time created display in hours forx ex. just now, 10m ago, 7h ago */}
                <h3 className='text-[0.7rem] font-poppins text-gray-500'>
                    <RelativeDate dateString={posts.createdAt}/>
                </h3>
              </div>
            </div>
            <button type='button' onClick={() => { }}>
                <FaEllipsis />
            </button>
          </div>
          <h1 className='text-[1.5rem] font-poppins font-extrabold'>
            {posts.title}
          </h1>
          <div className='flex items-center font-poppins font-semibold gap-3 text-[0.5rem]'>
            <span>Topic:</span>
            <span className='text-[0.7rem px-2 py-1 rounded-full bg-muted-green text-white'>
              {posts.Topic.name}
            </span>
          </div>
          
          <div className='mt-2 w-full'>
            {/**Description */}
            <div className={'w-full'}>
            {posts.content.blocks.map((block: Block) => (
              <>  
                {block.type === 'paragraph' && (
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
            </div>
            {/**Like, Comment, Share(if there is any) Section*/}
            <div className='mt-10'>
              <PostButtons likes={posts.comments.length} comments={posts.likes.length} />
            </div>
          </div>
          {posts.comments.length < 1 ? (
            <div className='text-gray-400 text-[1.3rem] text-center font-poppins font-semibold py-10'>
              <h3>There are no more available post right now.</h3>
            </div>
          ):(
            <>
            {posts.comments.map((comment: Comment) =>(
              <div>
                <h1>{comment.author}</h1>
              </div>
            ))}
            </>
          )}
        </>
      ):(
        <>
        <div className='text-center flex justify-center'> 
                    <RotatingLines
                        strokeColor="grey"
                        strokeWidth="5"
                        animationDuration="0.75"
                        width="20"
                        visible={true}
                    />
               </div> 
        </>
      )}
      
    </main>
  )
}

export default page


