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

const Featured = () => {
  const router = useRouter()
  const [featuredProducts, setFeaturedProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(false)
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  useEffect(() => {
    const fetchData = () => {
      setLoading(true)
      fetch(`${process.env.NEXT_PUBLIC_URL}/api/products/featuredProduct`, {
        cache: "no-store",
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("failed to fetch data");
          }
          return res.json();
        })
        .then((data) => {
          setFeaturedProducts(data);
          setLoading(false)
        })
        .catch((error) => {
          console.error("Error fetching featured products:", error);
        });
    };

    fetchData();
  }, []);

  return (
    <section className='relative flex flex-col w-full h-full py-5 overflow-x-auto feature no-scrollbar 2xl:max-container lg:mb-10 lg:py-20 xl:mb-20 mt-14'>

<div className="flex justify-between mx-20 mb-5" >
<h2 className="font-sans text-3xl font-semibold text-gray-900 popularFont">Popular orders</h2>


</div>
<div className='featuredPro flex items-start justify-start w-full h-full gap-8 px-2 mx-32 mt-7'>
    {/* WRAPPER */}
    <div className="relative flex w-full mt-10 overflow-x-auto no-scrollbar popular">
        {/* SINGLE ITEM */}
        {loading && (
          <div className="flex items-center justify-center w-full h-full mx-auto">
    <Image src="/temporary/p10.png" 
    alt="loading" 
    width={150} 
    height={150} className="animate-spin bg-blend-multiply"/>

          </div>
        )}
        {featuredProducts.map((item) => (
          <div
            key={item._id}
            className="featureCard rounded-md gap-6 px-5 mx-10 my-14 h-[300px] w-[220px] flex flex-col items-center py-20 hover:bg-fuchsia-50 transition-all duration-300 bg-[#B78C56] shadow-[-10px_7px_0px_0px_#741102]"
          >
            {/* IMAGE CONTAINER */}
            {item.img && (
              <div className="hover:rotate-[60deg] transition-all duration-500 mt-[-140px] mix-blend-multiply">
                <Image src={item.img} alt="" width={200} height={150} className="object-cover bg-white " />
              </div>
            )}
            {/* TEXT CONTAINER */}
            <div className="flex flex-col items-center justify-center flex-1 gap-2 text-center" >
              <Link href={`/product/${item._id}`}>
              <h1 className="text-lg font-bold uppercase xl:text-lg 2xl:text-3xl">{item.title}</h1>
              <p className="p-2 2xl:p-4">{item.desc}</p>
              <span className="text-xl font-medium text-white rounded-full p-2 bg-[#741102] mt-10">${item.price}</span>
              </Link>
             
            </div>

            <span onClick = {()=>router.push(`/product/${item._id}`)} className="rounded-full bg-[#741102] p-4 text-white absolute mt-[190px] cursor-pointer" >
             <ArrowForwardIos fontSize="large"/>

             </span>
          </div>
        ))}
      </div>
    </div>


    <div className='flexEnd secondFeature  mt-10 px-6 lg:mt-20 lg:mr-6 bg-[rgba(0,0,0,0.1)]' 
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
            <div className="w-full p-1">
              <Card className="border-none shadow-none">
                <CardContent className="p-0 w-full h-[340px]">
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

    </section>
  );
};

export default Featured;
