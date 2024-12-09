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
    <div className="mt-4 py-7 md:mx-40 px-0 flex flex-wrap justify-between gap-4">


        {allCategories.map((category) => (

          <div key={category._id} className="w-56 h-52 px-2">

            <div
              className={`p-4 rounded-sm bg-${category.color}-100 relative overflow-hidden group w-full h-full cursor-pointer`}
              onClick={() => router.push(`/products?category=${category.slug}`)}
            >
              <Image
                src={category.img || ''}
                alt={category.title}
                fill
                className='object-cover w-full h-full transition-all duration-300 mdImg' />
              <div className={`absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 transform translate-y-full transition-transform duration-300 group-hover:translate-y-0 h-screen flex items-center justify-center categoryTitleLarge `}>
                <p className={`font-semibold text-[40px] font-sans pt-96 hidden md:block md:m-auto md:items-center`}>{category.title}</p>
              </div>

              <div className='md:hidden categoryTitle'>
                <p className={`font-semibold text-[40px] font-sans pt-16`}>{category.title}</p> {/* Visible on mobile */}
              </div>
            </div>
          </div>

        ))}

      </div></>
  )
}

export default Categories
