'use client'
import { useRouter } from 'next/navigation';
import React from 'react'
import { FaArrowLeft } from 'react-icons/fa6';

function Back() {
    const router = useRouter()
    const handleGoBack = () => {
        router.back(); 
      };
  return (
    <button onClick={handleGoBack} className="inline-flex items-center border border-emerald-600 rounded-lg mb-4 px-3 py-2 text-sm font-medium text-gray-900 hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-gray-600">
    <FaArrowLeft/>
  </button>
  )
}

export default Back