'use client'
import Autoplay from "embla-carousel-autoplay"
import Slider2 from "../images/BagbagImage1.jpg";
import Slider3 from "../images/NovaProper1.jpg";
import Slider4 from "../images/BagongSilangan1.jpg";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image";
import { useRef } from "react";

const images = [Slider2, Slider3, Slider4];

export function ShadcnCarousel() {
  const plugin = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false })
  )

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent className="w-full px-0">
        {images.map((image, index) => (
          <CarouselItem 
            key={index}
            className="w-full "
          >
           
              <Image src={image} alt={`Image ${index + 1}`} className=" h-[50vh]" />
       
          </CarouselItem>
        ))}
      </CarouselContent>
      
    </Carousel>
  )
}
