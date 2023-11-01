import React from 'react'
import { BiLike, BiComment, BiShare } from 'react-icons/bi'
export default function PostButtons() {
  return (
    <div>
    {/**Fetch the number of like, Comments, and Share */}
    <div className='flex justify-between items-center pl-1 pr-5 py-1'>
        {/**number of Likes */}
        <div className='text-gray-600'>
            <h3>100 likes</h3>
        </div>
        <div className='flex gap-10 text-gray-600'>
            {/**number of Comments */}
            <h3>100 Comments</h3>
            {/**number of Shares */}
            <h3>100 Shares</h3>
        </div>
    </div>
    {/**Like, Comment, Share Buttons */}
    <div className='flex justify-between items-center border-t-2 border-gray-300 py-2 md:px-10 px-3'>
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
