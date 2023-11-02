import { Like, Post, User } from '@prisma/client';
import React from 'react'
import { BiLike, BiComment, BiShare } from 'react-icons/bi'

interface PostButtonsProps {
    commentAmt?: number;
    topicName?: string;
    post?: Post & {
        author: User,
        likes: Like[]
    }
}

const PostButtons: React.FC<PostButtonsProps> = ({ commentAmt, topicName, post }) => {
    return (
        <div>
            {/**Fetch the number of like, Comments, and Share */}
            <div className='flex justify-between items-center pl-1 pr-5 py-1'>
                {/**number of Likes */}
                <div className='text-gray-600'>
                    <h3>{post?.likes.length} likes</h3>
                </div>
                <div className='flex gap-10 text-gray-600'>
                    {/**number of Comments */}
                    <a
                        className='w-fit flex items-center gap-2'
                        href={`/discussion/topic/${topicName}/post/${post?.id}`}>
                        <h3>{commentAmt} Comments</h3>
                    </a>
                    {/**number of Shares */}
                    <h3>100 Shares</h3>
                </div>
            </div>
            {/**Like, Comment, Share Buttons */}
            <div className='flex justify-between items-center border-t-2 border-gray-300 py-2 px-10'>
                {/**LIKE BUTTON */}
                <button type='button' className='flex gap-2 items-center'>
                    <span className='text-[1.5rem] text-gray-600'>
                        <BiLike />
                    </span>
                    Like
                </button>
                {/**cOMMENT BUTTON */}
                <button type='button' className='flex gap-2 items-center'>
                    <span className='text-[1.5rem] text-gray-600'>
                        <BiComment />
                    </span>
                    Comment
                </button>
                {/**SHARE BUTTON */}
                <button type='button' className='flex gap-2 items-center'>
                    <span className='text-[1.5rem] text-gray-600'>
                        <BiShare />
                    </span>
                    Share
                </button>
            </div>
        </div>
    )
}

export default PostButtons