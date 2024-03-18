'use client'
import React, { useState, useEffect, useRef } from 'react';
import Free from '../images/Free vegetables.png';
import Image2 from '../images/Image2.png';
import Image3 from '../images/Image3.png';
import Image4 from '../images/Image4.png';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';

interface ImageRefs {
  [key: number]: React.RefObject<HTMLImageElement>;
}

const Carousel = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(1); // Start with image 1
  const imagesRefs: ImageRefs = {
    1: useRef<HTMLImageElement>(null),
    2: useRef<HTMLImageElement>(null),
    3: useRef<HTMLImageElement>(null),
    4: useRef<HTMLImageElement>(null),
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex % 4) + 1); // Update the current index every 3 seconds
    }, 5000);

    return () => clearInterval(interval); // Cleanup on unmount or re-render
  }, []);

  const imageVariants = {
    initial: { opacity: 1, x: '100%' },
    animate: { opacity: 1, x: '0%', transition: { duration: 2, ease: 'easeInOut' } },
    exit: { opacity: 1, x: '-100%' },
  };

  return (
    <Link href={'/markethub/free-products'} className="relative w-full h-full flex overflow-hidden rounded-[1rem] border-[2px] border-gray-300 drop-shadow-md shadow-md">
      <div className='flex overflow-hidden'>
        <AnimatePresence>
        {currentImageIndex === 1 && (
            <motion.img
              key={currentImageIndex}
              src={Free.src}
              alt="Your image description"
              sizes='stretch'
              className="w-full h-full"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={imageVariants}
            />
          )}
        {currentImageIndex === 2 && (
            <motion.img
              key={currentImageIndex}
              src={Image2.src}
              alt="Your image description"
              className="w-full "
              initial="initial"
              animate="animate"
              exit="exit"
              variants={imageVariants}
            />
          )}
       {currentImageIndex === 3 && (
            <motion.img
              key={currentImageIndex}
              src={Image3.src}
              alt="Your image description"
              className="w-full"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={imageVariants}
            />
          )}
        {currentImageIndex === 4 && (
            <motion.img
              key={currentImageIndex}
              src={Image4.src}
              alt="Your image description"
              className="w-full"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={imageVariants}
            />
          )}
        </AnimatePresence>
      </div>
     
    </Link>
  );
};

export default Carousel;
