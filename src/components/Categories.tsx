"use client";

import { CategoryType } from '@/types/types';
import React, { useEffect, useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Skeleton } from './ui/skeleton';
import { motion } from 'framer-motion';
import { useMediaQuery } from '@/hooks/use-media-query';

const getData = () => {
  return fetch(`/api/categories`, {
    method: "GET",
    cache: "no-store",
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to fetch categories");
      }
      return res.json();
    });
};

const Categories = () => {
  const router = useRouter();
  const [allCategories, setAllCategories] = useState<CategoryType[]>([]);
  const [loading, setLoading] = useState(false);

  const isDesktop = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    setLoading(true);
    getData()
      .then((data) => setAllCategories(data))
      .catch((error) => console.error("Error fetching categories:", error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.75 }}
      >
        <div className="mx-5 md:mx-20 border-t-2 border-t-[#B78C56]">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 md:text-3xl">Categories</h2>
        </div>
        <div className="grid grid-cols-2 gap-4 px-5 mt-4 md:grid-cols-3 lg:grid-cols-4 md:px-40">
          {allCategories.map((category) => (
            <motion.div
              key={category._id}
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ ease: "easeInOut", duration: 1.5 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false }}
              className="relative w-full h-48 md:w-56 md:h-52"
            >
              <div
                className={`p-4 rounded-sm bg-${category.color}-100 relative overflow-hidden group w-full h-full cursor-pointer`}
                onClick={() => router.push(`/products?category=${category.slug}`)}
              >
                {loading ? (
                  <Skeleton className="w-full h-full" />
                ) : (
                  <Image
                    src={category.img || ''}
                    alt={category.title}
                    fill
                    className={`object-cover ${isDesktop ? 'w-full h-full' :'w-20 h-20'} transition-all duration-300`}
                  />
                )}
                <motion.div
                  whileHover={{
                    scale: 1,
                    transition: { duration: 0.3 },
                  }}
                  whileTap={{ scale: 1.3 }}
                  className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 transform translate-y-full transition-transform duration-300 group-hover:translate-y-0 flex items-center justify-center"
                >
                  <p className="hidden text-lg font-semibold md:block md:text-2xl">{category.title}</p>
                </motion.div>
                <div className="block md:hidden">
                  <p className="text-lg font-semibold">{category.title}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </>
  );
};

export default Categories;
