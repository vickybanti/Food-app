"use client";

import { CategoryType } from '@/types/types'
import React, {  useEffect, useState } from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Skeleton } from './ui/skeleton';

const getData = () => {
  return fetch(`/api/categories`, {
    method: "GET",
    cache: "no-store",
   
  })
  .then(res => {
    if (!res.ok) {
      throw new Error("Failed to fetch categories")
    }
    return res.json()
  })
}

const Categories = () => {
  const router = useRouter()
  const [allCategories, setAllCategories] = useState<CategoryType[]>([])
  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
    setLoading(true)
    getData()
      .then(data => setAllCategories(data))
      .catch(error => console.error("Error fetching categories:", error))
      setLoading(false)
  }, [])
  
  
  return (
    <><div className='mx-20 border-t-2 border-t-[#B78C56] '>
      <h2 className="mb-4 font-sans text-3xl font-semibold text-gray-900 ">Categories</h2>
    </div>
    <div className="mx-20 mt-4 md py-7 md:mx-20">

        <Carousel>
          <CarouselContent className='mdImg'>
            {allCategories.map((category) => (

              <CarouselItem key={category._id} className="lg:basis-1/3">

                <div
                  className={`p-4 rounded-sm bg-${category.color}-100 relative overflow-hidden group w-full h-[300px] cursor-pointer`}
                  onClick={() => router.push(`/products?category=${category.slug}`)}
                >
                  <Image
                    src={category.img || ''}
                    alt={category.title}
                    fill
                    className='object-cover w-full h-full transition-all duration-300 slideImg' />
                  <div className={`absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 transform translate-y-full transition-transform duration-300 group-hover:translate-y-0 h-screen flex items-center justify-center `}>
                    <p className={`font-semibold  text-[50px] font-sans pt-72`}>{category.title}</p>
                  </div>
                </div>

              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div></>
  )
}

export default Categories
