'use client'
import React, { useState, useEffect, useRef } from 'react';
import Free from '../../images/Free vegetables.png';
import Image2 from '../../images/Image2.png';
import Image3 from '../../images/Image3.png';
import Image4 from '../../images/Image4.png';
import Image from 'next/image';

interface ImageRefs {
  [key: number]: React.RefObject<HTMLImageElement>;
}

const YourComponent = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(1); // Start with image 1
  const imagesRefs: ImageRefs = {
    1: useRef<HTMLImageElement>(null),
    2: useRef<HTMLImageElement>(null),
    3: useRef<HTMLImageElement>(null),
    4: useRef<HTMLImageElement>(null),
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex % 4) + 1); // Update the current index every 2 seconds
    }, 3000);

    return () => clearInterval(interval); // Cleanup on unmount or re-render
  }, []);

  useEffect(() => {
    imagesRefs[currentImageIndex]?.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start',
    });
  }, [currentImageIndex, imagesRefs]);

  return (
    <div className="relative w-full flex h-full overflow-hidden rounded-[1rem]">
      <h1>{currentImageIndex}</h1>
      <Image
        src={Free}
        alt={'Free vegetables image'}
        className='w-full h-full'
        id='image1'
        ref={imagesRefs[1]}
      />
      <Image
        src={Image2}
        alt={'Free vegetables image'}
        className='w-full h-full'
        id='image2'
        ref={imagesRefs[2]}
      />
      <Image
        src={Image3}
        alt={'Free vegetables image'}
        className='w-full h-full'
        id='image3'
        ref={imagesRefs[3]}
      />
      <Image
        src={Image4}
        alt={'Free vegetables image'}
        className='w-full h-full'
        id='image4'
        ref={imagesRefs[4]}
      />
      {/* Replace 'Free', 'Image2', 'Image3', 'Image4' with your image variables */}
    </div>
  );
};

export default YourComponent;
