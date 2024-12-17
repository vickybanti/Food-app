"use client"
import { PEOPLE_URL } from "@/constants";
import { ProductType } from "@/types/types";
import { AddShoppingCartRounded, ArrowForwardIos, FavoriteBorderRounded, Forward10Sharp } from "@mui/icons-material";
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
import { userCartStore } from "@/lib/utils/store";

type FontProps = {
  fontSize:string;
}


const Featured = () => {
  const router = useRouter()
  const [featuredProducts, setFeaturedProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(false)
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );
  const {savedProducts} = userCartStore()
  const[message, setMessage] = useState(false)

  
  useEffect(() => {
    userCartStore.persist.rehydrate()
  },[])

  useEffect(() => {
    const fetchData = async () => {
      console.log("savedProducts=", savedProducts);
      setLoading(true);

      const featured = savedProducts.flatMap(pro => 
        pro.products?.filter((product: ProductType) => product.isFeatured) || []
      );

      if (featured.length > 0) {
        setFeaturedProducts(featured);
      } else {
        setMessage(true);
      }

      setLoading(false);
      console.log("featuredProducts after fetch=", featuredProducts);
    };

    fetchData();
  }, [savedProducts]);

  console.log("featuredProducts=",featuredProducts)

  return (
    <section className='relative flex flex-col w-full h-full py-5 overflow-x-auto feature no-scrollbar 2xl:max-container lg:mb-10 lg:py-20 xl:mb-20 mt-14'>

<div className="flex justify-between mx-20 mb-5" >
<h2 className="font-sans text-3xl font-semibold text-gray-900 popularFont">Popular orders</h2>


</div>
<div className='flex items-start justify-start w-full h-full gap-8 px-2 mx-32 featuredPro mt-7'>
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
              <div className="hover:scale-x-105 transition-all duration-500 mt-[-160px] mix-blend-multiply w-52 h-8 mb-10 mx-auto featureImg">
                <Image src={item.img} alt="" width={170} height={100} className="object-cover bg-white " />
              </div>
            )}
            {/* TEXT CONTAINER */}
            <div className="flex flex-col items-center justify-center flex-1 gap-2 text-center" >
              <Link href={`/product/${item._id}`}>
              <h1 className="pt-32 pb-8 font-bold text-white uppercase text-md">{item.title}</h1>
              <span className="text-xl font-medium text-white rounded-full p-2 bg-[#741102]">
                {item.price}
              </span>
              </Link>
             
            </div>

            <span onClick = {()=>router.push(`/product/${item._id}`)} className="rounded-full bg-[#741102] p-4 text-white absolute mt-[190px] cursor-pointer featureLink" >
             <ArrowForwardIos fontSize="large" className="featureArrow"/>

             </span>
          </div>
        ))}
                {message && <span>Add more restaurants to favourites so see their featured products</span>}

      </div>
    </div>


   

    </section>
  );
};

export default Featured;
