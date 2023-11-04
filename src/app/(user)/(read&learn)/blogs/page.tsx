'use client'
import CustomButton from '@/app/components/Buttons/CustomButton'
import React from 'react'

function Blogs() {
    const handleClick = () =>{
        console.log('Clciked')
    }
  return (
    <div className='pt-56 pl-56'>
        <CustomButton title='EXAMPLE' handleClick={handleClick} btnType='button'/>
    </div>
  )
}

export default Blogs