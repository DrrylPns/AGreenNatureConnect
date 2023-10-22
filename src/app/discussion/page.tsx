'use client'
import React, { useState } from 'react'
import SIdebar from './_component/SIdebar'
import{ FiUser, FiThumbsUp } from "react-icons/fi" 
import{ BiLike, BiComment, BiShare, BiImageAdd, BiPaperclip } from "react-icons/bi" 
import Buttons from './_component/Buttons';
import Image from 'next/image';
import DisplayPhoto from './images/displayphoto.png'
import ImagePost1 from './images/imagepost1.png'
import ImagePost2 from './images/imagepost2.png'
import DisplayPhoto1 from './images/displayphoto3.png'
export default function Discussion() {
   const [isSideBarOpen, setIsSideBarOpen] = useState(true);
   const [expanded, setExpanded] = useState(false);

   const toggleExpand = () => {
     setExpanded(!expanded);
   };
   
   const toggleSideBar = () =>{
    setIsSideBarOpen(!isSideBarOpen)
   }

   const handlePost = () => {

   }
  return (
    <div className='relative bg-[#F0EEF6]'>
        {/**Left Section */}
        <section>
            <SIdebar toggled={isSideBarOpen} toggleSidebar={toggleSideBar}/>
        </section>
        {/**Middle Section, Scrollable */}
        {/**In every data Fetching, make sure that there are loading UI so that if the user has a poor internet connection they will know what is happening */}
        <section className='pl-[22%] pt-24 pr-[25%] min-w-min'> 
            {/*Create your post button*/}         
            <div className="flex justify-between items-center gap-5 bg-white rounded-lg drop-shadow-lg w-full px-5 py-5">
                {/*User Image, add default image if the user doesn't have DP, user image will comes from the backend*/}                
                <div className="border border-black rounded-full w-[10%] h-12 flex items-center justify-center">
                    {/*User Image, add default image if the user doesn't have DP user image will comes from the backend*/}
                    <FiUser/>
                </div>               
                <input type='text' placeholder='Create your post' disabled={true} value={''} className='bg-[#f0eef6] w-[70%] px-10 py-3 rounded-full' />
                <button type='button' className='col-span-2 flex justify-center gap-5 items-center text-[2.5rem] text-black'>
                    <BiImageAdd/>
                    <BiPaperclip/>
                </button>
            </div>      
            {/*POSTS, use Fetch api here and map through all post and display it depending on the filtering*/}
            {/**We can make component for this div in order for this page to become short and clean */}
            <div className='bg-white w-full rounded-xl p-5 mt-10 drop-shadow-md shadow-md'>
                <div className='flex items-center gap-5'>
                    <div className="rounded-full w-12 h-12 flex items-center justify-center">
                        {/*User Image, add default image if the user doesn't have DP user image will comes from the backend*/}
                        <Image 
                            src={DisplayPhoto}
                            alt='User Image'
                            layout='responsive'                        
                        />
                    </div>
                    <div className='flex items-baseline gap-3'>
                        {/*Username*/}
                        <h1 className='text-lg font-poppins font-medium'>leashane13</h1>
                        {/*Time created display in hours forx ex. just now, 10m ago, 7h ago */}
                        <h3 className='text-sm font-poppins'>7h</h3>
                    </div>                   
                </div>
                {/**Description & Images */}
                <div className='mt-2 w-full'>
                    {/**Description */}
                    <p className={expanded ? '' : 'overflow-hidden overflow-ellipsis line-clamp-3'}>GARDEN!! Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit, corporis quaerat. Aut velit corrupti adipisci dolorem dolor, libero vero consectetur iusto alias praesentium, molestiae ut pariatur nulla ullam neque esse?
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat nulla molestias fugit nisi fuga. Tenetur enim rerum possimus, cum provident, aspernatur qui, numquam obcaecati architecto aut sit quidem facere rem.</p>
                    <button onClick={toggleExpand} className='text-gray-400 font-poppins transition-all ease-in duration-100'> {expanded? 'See less' : 'See more...'}</button>
                    {/**if there is no image uploaded by the user dont display this element else display all but*/}
                    {/** the Image container has a fix height, if there are two image then it will dived into 2 section*/}
                    <div className='w-full my-3'>
                        <div className='mt-3 rounded-lg'>
                            <Image
                                src={ImagePost1}
                                alt='User posted Image'
                                layout='responsive'
                            />
                        </div>
                        <div className='mt-3 rounded-lg'>
                            <Image
                                src={ImagePost2}
                                alt='User posted Image'
                                layout='responsive'
                            />
                        </div>
                    </div>
                    {/**Like, Comment, Share(if there is any) Section*/}
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
                        <div className='flex justify-between items-center border-t-2 border-gray-300 py-2 px-10'>
                            {/**LIKE BUTTON */}
                            <button type='button' className='flex gap-2 items-center'>
                                <span className='text-[1.5rem] text-gray-600'>
                                    <BiLike/>
                                </span>
                                Like
                            </button>
                            {/**cOMMENT BUTTON */}
                            <button type='button' className='flex gap-2 items-center'>
                                <span className='text-[1.5rem] text-gray-600'>
                                    <BiComment/>
                                </span>
                               Comment
                            </button>
                            {/**SHARE BUTTON */}
                            <button type='button' className='flex gap-2 items-center'>
                                <span className='text-[1.5rem] text-gray-600'>
                                    <BiShare/>
                                </span>
                                Share
                            </button>
                        </div>
                    </div>
                </div>               
            </div>
             {/*POSTS, use Fetch api here and map through all post and display it depending on the filtering*/}
            {/**We can make component for this div in order for this page to become short and clean */}
            <div className='bg-white w-full rounded-lg p-5 mt-10 drop-shadow-sm shadow-md '>
                <div className='flex items-center gap-5'>
                    <div className="text-[2rem] border border-black rounded-full w-12 h-12 flex items-center justify-center">
                        {/*User Image, add default image if the user doesn't have DP user image will comes from the backend*/}
                        <FiUser/>
                    </div>
                    <div className='flex'>
                        {/*Username*/}
                        <h1>leashane13</h1>
                        {/*Time created display in hours forx ex. just now, 10m ago, 7h ago */}
                        <h3>7h</h3>
                    </div>                   
                </div>
                {/**Description & Images */}
                <div className='mt-2 w-full'>
                    {/**Description */}
                    <p>GARDEN!!</p>
                    {/**if there is no image uploaded by the user dont display this element else display all but*/}
                    {/** the Image container has a fix height, if there are two image then it will dived into 2 section*/}
                    <div className='w-full my-3'>
                        <div className='mt-3 rounded-lg'>
                            <Image
                                src={ImagePost1}
                                alt='User posted Image'
                                layout='responsive'
                            />
                        </div>
                        <div className='mt-3 rounded-lg'>
                            <Image
                                src={ImagePost2}
                                alt='User posted Image'
                                layout='responsive'
                            />
                        </div>
                    </div>
                    {/**Like, Comment, Share(if there is any) Section*/}
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
                        <div className='flex justify-between items-center border-t-2 border-gray-300 py-2 px-10'>
                            {/**LIKE BUTTON */}
                            <button type='button' className='flex gap-2 items-center'>
                                <span className='text-[1.5rem] text-gray-600'>
                                    <BiLike/>
                                </span>
                                Like
                            </button>
                            {/**cOMMENT BUTTON */}
                            <button type='button' className='flex gap-2 items-center'>
                                <span className='text-[1.5rem] text-gray-600'>
                                    <BiComment/>
                                </span>
                               Comment
                            </button>
                            {/**SHARE BUTTON */}
                            <button type='button' className='flex gap-2 items-center'>
                                <span className='text-[1.5rem] text-gray-600'>
                                    <BiShare/>
                                </span>
                                Share
                            </button>
                        </div>
                    </div>
                </div>               
            </div>
            <div className='text-gray-400 text-[1.3rem] text-center font-poppins font-semibold py-10'>
                <h3>There are no more available post right now.</h3>
            </div>
        </section>
        {/**Right Section, make this section as a component */}
        <section className=' fixed top-24 left-[77%] bg-[#F0EEF6] h-full w-[21%] '>
            <div className='bg-white rounded-xl p-3'>
                <h3 className='font-poppins font-semibold mb-3'>Community</h3>
                {/**Post from the community, display maximum of 2*/}
                <div className='border-b border-gray-600 mb-2'>
                    <div className='flex items-center gap-3'>
                        {/**User Image */}
                        <div className='h-12 w-12 rouded-full'>
                            <Image 
                                src={DisplayPhoto1}
                                alt='User Image'
                                layout='responsive'
                            />
                        </div>
                        {/**Username */}
                        <h3 className=''>GrahamBallz</h3>
                        {/**Time of the post created or updated ex. 1m ago, 2h ago, yesterday, Oct 22, 2023*/}
                        <h4>7h</h4>
                    </div>
                    {/**Description */}
                    <p className='overflow-hidden overflow-ellipsis line-clamp-2 mt-4 mb-1'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magni totam, omnis excepturi sapiente nisi, accusantium veritatis in quas illum reiciendis a quasi eligendi similique esse fugit. Porro excepturi aliquid dignissimos. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis nulla voluptates itaque consequuntur, rerum quae cum, quisquam tenetur expedita facere commodi dolorum molestiae? Illo laborum nihil, quas incidunt iure mollitia.</p>
                    <button type='button' className='text-gray-400 font-poppins mb-1'>See more...</button>
                </div>
                <div className='border-b border-gray-600'>
                    <div className='flex items-center gap-3'>
                        {/**User Image */}
                        <div className='h-12 w-12 rouded-full'>
                            <Image 
                                src={DisplayPhoto1}
                                alt='User Image'
                                layout='responsive'
                            />
                        </div>
                        {/**Username */}
                        <h3 className=''>GrahamBallz</h3>
                        {/**Time of the post created or updated ex. 1m ago, 2h ago, yesterday, Oct 22, 2023*/}
                        <h4>7h</h4>
                    </div>
                    {/**Description */}
                    <p className='overflow-hidden overflow-ellipsis line-clamp-2 mt-4 mb-1'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magni totam, omnis excepturi sapiente nisi, accusantium veritatis in quas illum reiciendis a quasi eligendi similique esse fugit. Porro excepturi aliquid dignissimos. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis nulla voluptates itaque consequuntur, rerum quae cum, quisquam tenetur expedita facere commodi dolorum molestiae? Illo laborum nihil, quas incidunt iure mollitia.</p>
                    <button type='button' className='text-gray-400 font-poppins mb-1'>See more...</button>
                </div>
            </div>
            <div className=''>
                <h3></h3>
            </div>
        </section>
    </div>
  )
}
