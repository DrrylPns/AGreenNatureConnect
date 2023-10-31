
import React from 'react'
import {motion} from 'framer-motion'
import { CustomButtonProps } from '@/app/types'
const CustomButton: React.FC<CustomButtonProps> = ({title, containerStyles, btnType, handleClick}) => {
  
  return (
    <button 
      className={containerStyles}
      onClick={handleClick}
      type={btnType || 'button'}
    >
      
        {title}
     
      
    </button>
  )
}

export default CustomButton