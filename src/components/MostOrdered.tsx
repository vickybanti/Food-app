"use client"
import { PEOPLE_URL } from "@/constants";
import { ProductType } from "@/types/types";
import { AddShoppingCartRounded, ArrowForwardIos, Forward10Sharp } from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Autoplay from "embla-carousel-autoplay"
import { useState, useEffect } from "react";

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { useRouter } from "next/navigation";

type FontProps = {
  fontSize:string;
}

interface CampProps {
  backgroundImage: string;
  title:string;
  subtitle:string;
  peopleJoined:string;
}


const CampSite = ({ backgroundImage, title, subtitle, peopleJoined }: CampProps) => {
  return (
    <div className="w-full h-full bg-center bg-no-repeat bg-cover rounded-xl" 
         style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className='flex flex-col items-start justify-between h-full p-6'>  
        <div className='gap-4 flexCenter'>
          
          <div className='flex flex-col gap-1 rounded-full bg-[#741102] p-4'>
            <h4 className='text-white bold-18'>{title}</h4>
          </div>
          <p className='text-gray-100 regular-14'>{subtitle}</p>

        </div>
        <div className='gap-6 flexCenter'>
          <span className='flex -space-x-4 overflow-hidden'>
            {PEOPLE_URL.map((url) => (
              <Image 
                src={url}
                key={url}
                alt='person'
                width={52}
                height={52}
                className='inline-block w-10 h-10 rounded-full'
              />
            ))}
          </span>
          <p className='text-white bold-16 md:bold-20'>{peopleJoined}</p>
        </div>
      </div>
    </div>
  )
}

const MostOrdered = () => {
   const [loading, setLoading] = useState(false)
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );


return (
    <div className="rounded-xl"
    style={{backgroundImage: "url('/bread background.jpg')", backgroundSize: "cover"}}>
  <div className='relative w-full p-3 mx-auto overflow-hidden xl:px-5 xl:py-5 rounded-3xl'>
    <Carousel
      plugins={[plugin.current]}
      className="w-full max-w-4xl mx-auto"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {[
          { image: "/slide1.png", title: "Hot spicy pizza", subtitle: "", joined: "50+ Just ordered" },
          { image: "/slide2.png", title: "Juicy Burgers", subtitle:"Share with friends", joined: "40+ Just ordered" },
          { image: "/slide3.jpg", title: "Have pets?", subtitle: "Eat with pets", joined: "60+ just ordered" }
        ].map((slide, index) => (
          <CarouselItem key={index}>
            <div className="w-full p-1 md:h-1/2 sm:h-1/2">
              <Card className="border-none shadow-none">
                <CardContent className="p-0 w-full h-[270px]">
                  <CampSite
                    backgroundImage={slide.image}
                    title={slide.title}
                    subtitle={slide.subtitle}
                    peopleJoined={slide.joined}
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  </div>
</div>

  );
};

export default MostOrdered;
