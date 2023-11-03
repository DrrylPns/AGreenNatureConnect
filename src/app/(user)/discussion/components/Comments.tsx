import RelativeDate from '@/app/components/RelativeDate'
import { Button } from '@/app/components/Ui/Button'
import { Post, Comment } from '@/lib/types'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import React, { useState } from 'react'
import {RxDividerVertical} from 'react-icons/rx'
import { motion } from 'framer-motion'
import { FaUser } from 'react-icons/fa6'
import { FiPlus } from 'react-icons/fi'
import { Discuss } from 'react-loader-spinner'
import DefaultImage from '@/../public/images/default-user.jpg'
import { BiComment, BiLike } from 'react-icons/bi'
import useLoginModal from '@/lib/hooks/useLoginModal'


export default function Comment({
    posts, 
    comments
 
}:{ 
    posts: Post, 
    comments: Comment,
}) {
  const loginModal = useLoginModal()
  const {data: session } = useSession()
  const [ commentValue, setCommentValue ] = useState('')

  const createComment = async () =>{
    try {
      await axios.post(`/api/post/${posts.id}/comments`, { 
        text: commentValue, 
        postId: posts.id, 
        authorId: session?.user.id  
      })
    } catch (error) {
      
    }
  }
  const addComment = () =>{
    createComment()
  }

  return (
    <div className={'w-full border-b border-gray-400 pb-5 shadow-sm drop-shadow-sm'}>
      {session ? (
        <div className='w-full relative'>
          <textarea 
            onChange={(e) => setCommentValue(e.target.value)} 
            value={commentValue} 
            className='bg-pale min-w-full p-4 pb-8 resize-none border border-gray-300 rounded-lg' 
            placeholder='Add your comment here'
          >
          </textarea>
          <div className='w-full flex justify-end items-center '>
            <Button onClick={()=>{}} variant={'green'} className='px-4 py-0 rounded-full text-sm'>
              Comment
            </Button>
          </div>
        </div>
      ):(
        
        <button onClick={loginModal.onOpen} className='flex gap-2 items-center justify-center rounded-full drop-shadow-md shadow-md px-2 hover:bg-gray-300' >
          <FiPlus/>
          Add Comment
        </button>
      )}
      
      {posts.comments.length < 1 && (
        <div className='text-gray-400 text-[1.3rem] text-center font-poppins font-semibold py-10'>
          <h3>There are no comments available right now!</h3>
        </div>
      )}
      <div className='p-2 w-full'>
        {posts.comments.map((comment: Comment) =>(
          <>
            <div className='flex gap-2 items-center' key={comment.id}>
              <div className='flex items-center justify-center w-[2rem] h-[2rem] rounded-full border border-black'> 
                <Image 
                  src={comment.author.image || DefaultImage}
                  alt={"User Image"}
                  width={20}
                  height={20}
                  className="w-full"
                />
              </div>
              <div>
                <h3 className='text-[1rem] text-gray-500 font-poppins font-light'>{comment.author.username}</h3>
                {comment.author.role === "STAFF" && (
                  <h6 className='text-lg font-poppins font-medium'>Urban Farming Member</h6>
                )}
              </div>
              <div className='text-gray-400 text-[0.7rem]'>
                <RelativeDate dateString={comment.createdAt}/>
              </div>
            </div>
            <div className='flex gap-5'>
              <div className='flex items-center justify-center h-[full] w-[2rem] text-gray-600 mt-2'>
                  <div className='w-[2px] h-full bg-gray-400 hover:bg-green'></div>
              </div>
              <div className='w-full'>
                <p className='font-poppins font-light'>{comment.text}</p>
                <div className='w-full flex justify-end'>
                  <motion.button 
                    whileTap={{ backgroundColor: 'ButtonShadow' }} 
                    type='button' 
                    className='flex gap-2 items-center justify-center text-[1rem] text-gray-400 px-2 py-1 hover:bg-gray-300'
                  >
                    <span className=''>
                        <BiLike />
                    </span>
                    Like
                  </motion.button>
                  <motion.button 
                    whileTap={{ backgroundColor: 'ButtonShadow' }} 
                    type='button' 
                    className='flex gap-2 items-center justify-center text-[1rem] text-gray-400 px-2 py-1 hover:bg-gray-300'
                  >
                      <span className=''>
                          <BiComment />
                      </span>
                      Reply
                  </motion.button>
                </div>
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  )
}
