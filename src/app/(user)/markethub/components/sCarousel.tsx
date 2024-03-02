'use client'
import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import FreeImage from '../images/Free vegetables.png';
import Image2 from '../images/Image2.png';
import Image3 from '../images/Image3.png';
import Image4 from '../images/Image4.png';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image";

const images = [FreeImage, Image2, Image3, Image4];

export function ShadcnCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 5000})
  )

  return (
    <Carousel
        plugins={[plugin.current]}
      className="w-full"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent className="w-full">
        {images.map((image, index) => (
          <CarouselItem 
            key={index}
            className="w-full"
          >
            <div className="">
              <Image src={image} alt={`Image ${index + 1}`} className="w-full h-[50vh]" />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      
    </Carousel>
  )
}
