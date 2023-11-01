'use client'
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  BiMenu,
  BiArrowBack,
  BiHome,
  BiStore,
  BiInfoCircle,
} from "react-icons/bi"
import { PiUsersThree, PiCaretDown } from 'react-icons/pi'
import { LiaBookReaderSolid, LiaBlogger } from 'react-icons/lia'
import { SlNotebook } from 'react-icons/sl'
import { AiOutlineQuestionCircle, AiOutlineFileProtect } from 'react-icons/ai'
import { LuFileSignature } from 'react-icons/lu'
import Link from 'next/link';
import { useRouter,usePathname, useSearchParams } from 'next/navigation';

export default function SIdebar() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [isDropdownrOpen, setIsDropdownrOpen] = useState(false);

  const toggleSideBar = () => {
  
    setIsSideBarOpen(!isSideBarOpen)
    
  }

  const toggleDropdown = () =>{
    if(!isSideBarOpen){ 
      setIsSideBarOpen(!isSideBarOpen)
    }
    setIsDropdownrOpen(!isDropdownrOpen)
  }


  const pathname = usePathname()
  const router = useRouter()

  return (
    <>

    <div className=''>
      {/**mobile view */}
      <div className='fixed w-full z-20 md:relative'>        
          <div className='pt-[5rem] w-full flex justify-around bg-white md:hidden'>
            <Link className={`link ${pathname === '/discussion' ? 'border-b border-yellow-400' : ''} flex justify-center items-center  w-full py-3`}  href={'/discussion'} >
              <div className='text-icons '>
                <BiHome />
              </div>
            </Link>
            <Link className={`link ${pathname === '/learningMaterials' ? 'border-b border-yellow-400' : ''} flex justify-center items-center  w-full py-3`}  href={'/learningMaterials'} >
              <div className='text-icons '>
                <SlNotebook/>
              </div>
            </Link>
            <Link className={`link ${pathname === '/blogs' ? 'border-b border-yellow-400' : ''} flex justify-center items-center  w-full py-3`}  href={'/blogs'} >
              <div className='text-icons '>
                <LiaBlogger/>
              </div>
            </Link>
          
            <Link className={`link ${pathname === '/marketplace' ? 'border-b border-yellow-400' : ''} flex justify-center items-center  w-full py-3`}  href={'/marketplace'} >
              <div className='text-icons '>
                <BiStore />               
              </div>
            </Link>
          </div>
        </div>       
      </div>
      {/**desktop view */}
        <motion.div
          initial={{ width: '5%' }} // Initial width when sidebar is open
          animate={{ width: isSideBarOpen ? '20%' : '5%',}} // Animate width to 0 when collapsed
          transition={{
            type: 'tween',
            duration: 1,
           }}
          className={`md:flex md:pt-[6rem]  hidden fixed flex-col pt-4 px-5 bg-white h-full w-[5%] ${isSideBarOpen? 'items-start' : 'items-center'}`}
        >
          <button onClick={toggleSideBar} className={`${isSideBarOpen && 'self-end'}`}>
            {isSideBarOpen ? (
              <div className='text-icons '>
                <BiArrowBack/>
              </div>
            ) : (
              <div className='text-icons '> 
                <BiMenu />
              </div>
            )}
          </button>
          {/**Home, Communities, Marketplace Icons and links */}
          <div className='flex flex-col items-start w-full'>
          <Link href={'/discussion'}  className={`flex items-center gap-4 w-full py-2 ${isSideBarOpen ? 'justify-start': 'justify-center'} hover:bg-pale`}>       
                <div className='text-icons '>
                  <BiHome />
                </div>
                <div className={`${isSideBarOpen?'block':'hidden' }`}>
                <motion.p 
                  initial={{ scale: 0,}} 
                  animate={{ scale: isSideBarOpen? 1 : 0, }}  // Target values (opacity: 1, translateY: 0)
                  transition={{
                    type:'tween',
                    stiffness: 1000,
                    damping: 20,
                    duration: 0.6,
                  }}
                  className={`font-poppins text-[1rem] `}
                  >
                  Home
                </motion.p>
                </div>
                        
            </Link>
            <button type='button' onClick={toggleDropdown}  className={`flex items-center gap-4 w-full py-2 ${isSideBarOpen ? 'justify-start': 'justify-center'} hover:bg-pale`}>            
              <div className='text-icons '>
                <LiaBookReaderSolid />
              </div>
              <div className={`${isSideBarOpen?'block':'hidden' }`}>
                <motion.p 
                  initial={{ scale: 0, }} 
                  animate={{ scale: isSideBarOpen? 1 : 0, }}  // Target values (opacity: 1, translateY: 0)
                  transition={{
                    type:'tween',
                    stiffness: 1000,
                    damping: 20,
                    duration: 0.6,
                      
                  }}
                  className={`font-poppins text-[1rem]`}
                >
                Read & Learn
                </motion.p>
              </div>
              <div className={`font-poppins text-[1rem] ${isSideBarOpen ? 'opacity-100 block self-end' : 'opacity-0 hidden'}`}>
                <div className='text-icons '>
                  <PiCaretDown />
                </div>
              </div>
            </button>
            <AnimatePresence>
            {isDropdownrOpen && (
              <motion.div 
              initial={{ opacity: 0, y:-50}} 
              animate={{ opacity: 1 , y: 0 }} 
              transition={{
                stiffness: 100,
                damping: 20,
                duration: 0.2,
                
              }}
              exit={{opacity: 0 , y:-50}}
              className={`${!isSideBarOpen && 'hidden'} ${isDropdownrOpen? 'flex': 'hidden'} flex-col `}>
                <Link href={'/learningMaterials'} className='flex gap-3 ml-5 py-2 '>
                <div className='text-icons'>
                  <SlNotebook/>
                  
                </div>        
                Learning Materials          
              </Link>
              <Link href={'/blogs'} className='flex gap-3 ml-5 py-2'>
                <div className='text-[1.5rem]'>
                  <LiaBlogger/>
                </div>
                Blogs
              </Link>
            </motion.div>
            )}
            </AnimatePresence>   
            <Link href={''}  className={`flex items-center gap-4 w-full py-2 ${isSideBarOpen ? 'justify-start': 'justify-center'} hover:bg-pale`}>       
              <div className='text-icons '>
                <BiStore />
              </div>             
              <div className={`${isSideBarOpen?'block':'hidden' }`}>
                <motion.p 
                  initial={{ scale: 0, }} 
                  animate={{ scale: isSideBarOpen? 1 : 0, }}  // Target values (opacity: 1, translateY: 0)
                  transition={{
                    type:'tween',
                    stiffness: 1000,
                    damping: 20,
                    duration: 0.6,
             
                  }}
                  className={`font-poppins text-[1rem]`}
                >
                Marketplace
                </motion.p>
              </div>
              
            </Link>
            <Link href={''}  className={`flex items-center gap-4 w-full py-2 ${isSideBarOpen ? 'justify-start': 'justify-center'} hover:bg-pale`}>                    
              <div className='text-icons '>
                  <BiInfoCircle />
                </div>                
                <div className={`${isSideBarOpen?'block':'hidden' }`}>
                  <motion.p 
                    initial={{ scale: 0,}} 
                    animate={{ scale: isSideBarOpen? 1 : 0, }}  // Target values (opacity: 1, translateY: 0)
                    transition={{
                      type:'tween',
                      stiffness: 1000,
                      damping: 20,
                      duration: 0.6,
              
                    }}
                    style={{ display: isSideBarOpen ? 'block' : 'none' }} 
                    className={`font-poppins text-[1rem]`}
                  >
                  About
                  </motion.p>
                </div>                
            </Link>
            <Link href={''}  className={`flex items-center gap-4 w-full py-2 ${isSideBarOpen ? 'justify-start': 'justify-center'} hover:bg-pale`}>        
              <div className='text-icons '>
                  <AiOutlineQuestionCircle />
                </div>                
                <div className={`${isSideBarOpen?'block':'hidden' }`}>
                  <motion.p 
                    initial={{ scale: 0,}} 
                    animate={{ scale: isSideBarOpen? 1 : 0, }}  // Target values (opacity: 1, translateY: 0)
                    transition={{
                      type:'tween',
                      stiffness: 1000,
                      damping: 20,
                      duration: 0.6,

                    }}
                    style={{ display: isSideBarOpen ? 'block' : 'none' }} 
                    className={`font-poppins text-[1rem]`}
                  >
                  Help
                  </motion.p>
                </div> 
            </Link>
            <Link href={''}  className={`flex items-center gap-4 w-full py-2 ${isSideBarOpen ? 'justify-start': 'justify-center'} hover:bg-pale`}>        
              <div className='text-icons '>
                <AiOutlineFileProtect />
              </div>                 
              <div className={`${isSideBarOpen?'block':'hidden' }`}>
                <motion.p 
                  initial={{ scale: 0,}} 
                  animate={{ scale: isSideBarOpen? 1 : 0, }}  // Target values (opacity: 1, translateY: 0)
                  transition={{
                    type:'tween',
                    stiffness: 1000,
                    damping: 20,
                    duration: 0.6,
                      
                  }}
                  style={{ display: isSideBarOpen ? 'block' : 'none' }} 
                  className={`font-poppins text-[1rem] line-clamp-1`}
                >
                Privacy Policy
                </motion.p>
              </div>
            </Link>
            <Link href={''}  className={`flex items-center gap-4 w-full py-2 ${isSideBarOpen ? 'justify-start': 'justify-center'} hover:bg-pale`}>       
              <div className='text-icons '>
                <LuFileSignature />
              </div>              
              <div className={`${isSideBarOpen?'block':'hidden' }`}>
                <motion.p 
                  initial={{ scale: 0,}} 
                  animate={{ scale: isSideBarOpen? 1 : 0, }}  // Target values (opacity: 1, translateY: 0)
                  transition={{
                    type:'tween',
                    stiffness: 1000,
                    damping: 20,
                    duration: 0.6,
                      
                  }}
                  style={{ display: isSideBarOpen ? 'block' : 'none' }} 
                  className={`font-poppins text-[1rem] line-clamp-1`}
                >
                User Agreement
                </motion.p>
              </div> 
            </Link>
          </div>
        </motion.div>
      </>
  );
}
