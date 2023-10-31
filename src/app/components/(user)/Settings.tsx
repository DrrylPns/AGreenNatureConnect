'use client'
import React from 'react'
import {motion} from 'framer-motion'
import { FiSettings } from 'react-icons/fi'
import Link from 'next/link'
export default function settings() {
  return (
    <div className='md:flex items-center hidden'>
    <motion.button
        whileHover={{
            scale: 1.2,
            transition: { duration: 0.3 },
        }}
        whileTap={{ scale: 0.9 }}
        onClick={() => { }}
        className="hidden text-icons md:block"
    >
      <Link href={'/settings'} >
        <FiSettings />
      </Link>
    </motion.button>
    </div>
  )
}
