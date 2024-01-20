'use client'
import React, { useState } from 'react'
import Image, { StaticImageData } from 'next/image';
import { Dialog } from '@headlessui/react'

function ProductModal({
    imageUrl,
    productName,
    barangay,
    toggle
}:{
    imageUrl: StaticImageData,
    productName: String,
    barangay:String,
    toggle: boolean
}) {

    const [isOpen, setIsOpen] = useState(toggle)
  return (
    <div>
        {isOpen}
    </div>
  )
}

export default ProductModal