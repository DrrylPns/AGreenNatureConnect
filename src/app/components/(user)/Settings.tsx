'use client'
import React from 'react'
import {motion} from 'framer-motion'
import { FiSettings } from 'react-icons/fi'
export default function settings() {
  return (
 
    <motion.button
        whileHover={{
            scale: 1.2,
            transition: { duration: 0.3 },
        }}
        whileTap={{ scale: 0.9 }}
        onClick={() => { }}
        className="hidden text-icons md:block"
    >
        <FiSettings />
    </motion.button>
  )
}
