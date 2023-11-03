import { Popover, Transition } from '@headlessui/react'
import { Like, Post, User } from '@prisma/client';
import React, { FC, Fragment } from 'react'
import { BiLike, BiComment, BiShare } from 'react-icons/bi'
import { FiLink } from 'react-icons/fi'
import { motion } from 'framer-motion'
interface PostButtonsProps {
    comments: number,
    likes: number
    topicName?: string;
    post?: Post & {
        author: User,
    }
}
        

const PostButtons: FC<PostButtonsProps> = ({comments, likes, topicName, post}) => {
    console.log(comments)
    console.log(likes)
  return (
    <div>
  
    {/**Like, Comment, Share Buttons */}
    <div className='flex items-center justify-end gap-4 border-t-2 border-gray-300 py-2 md:px-10 px-1'>
        <motion.button 
            whileTap={{ backgroundColor: 'ButtonShadow' }} 
            type='button' 
            className='flex gap-2 items-center justify-center px-3 py-1 font-poppins font-semibold w-[7rem] rounded-3xl bg-pale'
        >
            <span className='text-[1.5rem] text-gray-600'>
                <BiLike />
            </span>
            <h3>{likes}</h3>
        </motion.button>
        <motion.button 
            whileTap={{ backgroundColor: 'ButtonShadow' }} 
            type='button' 
            className='flex gap-2 items-center justify-center px-3 py-1 font-poppins font-semibold w-[7rem] rounded-3xl bg-pale'
        >
            <span className='text-[1.5rem] text-gray-600'>
                <BiComment />
            </span>
           <a href={`/discussion/topic/${topicName}/post/${post?.id}`}>
              <h3>{comments}</h3>
          </a>
        </motion.button>
        <Popover>
            {({open}) =>(
                <>
                    <motion.button 
                    whileTap={{ backgroundColor: 'ButtonShadow' }}
                    className='rounded-3xl font-poppins font-semibold w-[7rem]'
                    >
                        <Popover.Button type='button' className='flex gap-2 items-center px-3 py-1 font-normal w-full rounded-3xl bg-pale'>
                            <span className='text-[1.5rem] text-gray-600'>
                                <BiShare />
                            </span>
                            Share
                        </Popover.Button>
                    </motion.button>
                    <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                    >
                    <Popover.Panel className={`absolute md:right-52 lg:right-72 xl:right-80 z-40 bg-white right-6 flex gap-2 items-center  drop-shadow-sm shadow-sm`}>
                        
                        <button className='flex rounded-lg items-center px-4 py-2 gap-3 drop-shadow-lg shadow-md hover:bg-pale-white' > <FiLink className='text-[1.5rem]' /> Copy link</button>
                    </Popover.Panel>
                   </Transition>
                </>
            )}
           
        </Popover>
    </div>
</div>
  )
}

export default PostButtons