'use client'
import Autoplay from "embla-carousel-autoplay"
import Slider1 from "/public/images/Slider 1.png";
import Slider2 from "/public/images/Slider 2.png";
import Slider3 from "/public/images/Slider 3.png";
import Slider4 from "/public/images/Slider 4.png";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image";
import { useRef } from "react";

const images = [Slider1, Slider2, Slider3, Slider4];

export function ShadcnCarousel() {
  const plugin = useRef(
    Autoplay({ delay: 2000, stopOnInteraction: false })
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
              <Image src={image} alt={`Image ${index + 1}`} className="w-full h-[100vh]" />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      
    </Carousel>
  )
}
