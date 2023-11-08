import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { BiLike } from 'react-icons/bi'

export default function LikeButton() {
    useEffect(()=>{
        
    },[])
  return (
    <motion.button 
            whileTap={{ backgroundColor: 'ButtonShadow' }} 
            type='button' 
            className='flex gap-2 items-center justify-center px-4 py-2 font-poppins font-semibold w-[7rem] rounded-3xl bg-pale'
        >
            <span className='text-[1.5rem] text-gray-600'>
                <BiLike />
            </span>
            <h3>{}</h3>
    </motion.button>
  )
}
