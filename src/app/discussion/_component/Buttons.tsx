'use client'
import React from 'react'
import { motion } from 'framer-motion'

export default function Buttons({
    text,
    textColor='white',
    disabled,
    bgColor = 'green',

    onClick,  
} : {
    text: string;
    disabled: boolean;
    bgColor: string;
    textColor: string;
    onClick : () => void;
}) {
  return (
    <motion.button
              whileHover={{
                scale: 1.1,
                transition: { duration: 0.1 },
              }}
              whileTap={{ scale: 0.9 }}
              onClick={onClick}
              className={`bg-${bgColor} text-${textColor} px-3 py-2 w-full rounded-lg drop-shadow-md shadow-sm`}
              
            >
            {text}
          </motion.button>
   
  )
}
