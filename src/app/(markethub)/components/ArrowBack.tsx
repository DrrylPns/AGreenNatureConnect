'use client'
import { useRouter } from 'next/navigation';
import React from 'react'
import { FaArrowLeft } from 'react-icons/fa'

function ArrowBack() {
    const router = useRouter()

    const handleGoBack = () => {
        router.back(); 
    };
  return (
    <button onClick={handleGoBack} >
        <FaArrowLeft/>
    </button>
  )
}

export default ArrowBack