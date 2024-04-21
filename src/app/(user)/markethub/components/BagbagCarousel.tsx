'use client'
import Autoplay from "embla-carousel-autoplay"
import Slider1 from "../images/BagbagImage1.jpg";
import Slider2 from "../images/BagbagImage2.jpg";
import Slider3 from "../images/BagbagImage3.jpg";
import Slider4 from "../images/BagbagImage4.jpg";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image";
import { useRef } from "react";
import { CommunityImage } from "@/lib/types";

const images = [Slider1, Slider2, Slider3, Slider4];

export function BagbagCarousel({
  carouselImage
}:{
  carouselImage: CommunityImage[] | undefined
}) {
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
        {carouselImage !== undefined && carouselImage.map((image, index) => (
          <CarouselItem 
            key={index}
            className="w-full"
          >
            <div className="">
              <Image src={image.imageUrl} width={700} height={400} alt={`Image ${index + 1}`} className="w-full h-[25vh] md:h-[50vh]" />
            </div>  
          </CarouselItem>
        ))}
      </CarouselContent>
      
    </Carousel>
  )
}
