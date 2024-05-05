'use client'
import Autoplay from "embla-carousel-autoplay"
import Slider1 from "../images/NovaProper1.jpg";
import Slider2 from "../images/NovaProper2.jpg";
import Slider3 from "../images/NovaProper3.jpg";
import Slider4 from "../images/NovaProper4.jpg";

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

export function NovaProperCarousel() {
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
      <CarouselContent className="w-full">
        {images.map((image, index) => (
          <CarouselItem 
            key={index}
            className="w-full"
          >
            <div className="">
              <Image src={image} alt={`Image ${index + 1}`} className="w-full h-[25vh] md:h-[50vh] object-contain" />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      
    </Carousel>
  )
}
