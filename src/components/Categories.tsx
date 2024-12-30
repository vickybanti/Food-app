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
import {motion} from 'framer-motion'

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
    <>
     <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.75 }}
    >
    <div className='mx-20'>
      <h2 className="mb-4 font-sans text-3xl font-semibold text-gray-900 ">Categories</h2>
    </div>
    <div className="flex flex-wrap cats px-0 mt-4 py-7">


        {allCategories.map((category) => (

          <motion.div
          initial={{ x: -30, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 1.5 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false }}
          key={category._id} className="px-2 h-52 md:w-7 md:h-36 sm:h-36">

            <div
              className={`lg:p-4 md:p-1 rounded-sm bg-${category.color}-100 relative overflow-hidden group h-full cursor-pointer`}
              onClick={() => router.push(`/products?category=${category.slug}`)}
            >
              {loading ? <Skeleton className='w-20 h-20'/> : (
                <Image
                  src={category.img || ''}
                  alt={category.title}
                  fill
                  className='object-cover transition-all duration-300 mdImg' />
              )}
              <motion.div
              whileHover={{
                scale: 1,
                transition: { duration: 0.3 },
              }}
              whileTap={{ scale: 1.3 }} 
              className={`absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 transform translate-y-full transition-transform duration-300 group-hover:translate-y-0 h-screen flex items-center justify-center categoryTitleLarge `}>
                <p className={`font-semibold text-[40px] font-sans pt-96 hidden md:block md:m-auto md:items-center`}>{category.title}</p>
              </motion.div>

              <div className='md:hidden'>
                <p className={`font-semibold text-[40px] font-sans pt-16 categoryTitle`}>{category.title}</p> {/* Visible on mobile */}
              </div>
            </div>
          </motion.div>

        ))}

      </div>
      </motion.div>
      </>
      
  )
}

export default Categories
