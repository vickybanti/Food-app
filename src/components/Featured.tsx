"use client";

import { ProductType } from "@/types/types";
import { ArrowForwardIos } from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import { useRouter } from "next/navigation";
import { userCartStore } from "@/lib/utils/store";

const Featured = () => {
  const router = useRouter();
  const [featuredProducts, setFeaturedProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(false);
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));
  const { savedProducts } = userCartStore();

  useEffect(() => {
    userCartStore.persist.rehydrate();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const featured =
        savedProducts?.flatMap((pro) =>
          pro.products?.filter((product: ProductType) => product.isFeatured) || []
        ) || [];
      setFeaturedProducts(featured);
      setLoading(false);
    };

    fetchData();
  }, [savedProducts]);

  useEffect(() => {
    setMessage(featuredProducts.length === 0);
  }, [featuredProducts]);

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-full mx-auto">
        <Image
          src="/temporary/p10.png"
          alt="loading"
          width={150}
          height={150}
          className="animate-spin bg-blend-multiply"
        />
      </div>
    );
  }

  if (message) {
    return (
      <section className="relative flex flex-col items-center h-full py-5 lg:w-full md:w-1/2">
        <h1 className="font-sans text-xl font-semibold text-gray-900 md:text-3xl">
          Popular Orders
        </h1>
        <span className="mt-2 text-sm text-center text-gray-500 md:text-base">
          Add more restaurants to favorites to see their featured products.
        </span>
      </section>
    );
  }

  return (
    <section className="relative flex flex-col h-full py-5 mx-20 mt-16 overflow-x-auto lg:w-full md:w-1/2">
      <div className="flex justify-between px-5 mb-5">
        <h2 className="font-sans text-2xl font-semibold text-gray-900 md:text-2xl">
          Featured Restaurant Orders
        </h2>
      </div>

      <div className="flex items-start justify-start w-full gap-4 px-5 overflow-x-auto md:px-20 mt-7 no-scrollbar">
        {featuredProducts.map((item) => (
         
          <div
            key={item._id}
            className="featureCard rounded-md px-4 h-[280px] sm:h-[320px] w-[160px] sm:w-[170px] flex flex-col items-center py-4 transition-transform duration-300 hover:scale-105 bg-[#B78C56] shadow-lg"
          >
             <Link href={`/product/${item._id}`}>
            {item.img && (
              <div className="relative mb-3 w-36 sm:w-36 h-28 sm:h-36">
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  className="object-cover rounded-md"
                />
              </div>
            )}
            <div className="flex flex-col items-center text-center">
              
                <h1 className="mb-2 text-sm font-bold text-white uppercase sm:text-md">
                  {item.title}
                </h1>
                <span className="text-lg sm:text-xl font-medium text-white p-2 rounded-full bg-[#741102]">
                  ${item.price}
                </span>
            </div>
            </Link>

          </div>
        ))}
      </div>
      <p className="text-[12px] text-center">Add more restaurants to favorites to see their featured products</p>
    </section>
  );
};

export default Featured;