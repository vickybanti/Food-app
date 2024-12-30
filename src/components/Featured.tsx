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
      <section className="relative flex flex-col items-center lg:w-full h-full py-5 md:w-1/2">
        <h1 className="text-xl md:text-3xl font-sans font-semibold text-gray-900">
          Popular Orders
        </h1>
        <span className="text-sm md:text-base text-gray-500 text-center mt-2">
          Add more restaurants to favorites to see their featured products.
        </span>
      </section>
    );
  }

  return (
    <section className="relative flex flex-col lg:w-full md:w-1/2 h-full py-5 overflow-x-auto mt-14">
      <div className="flex justify-between px-5 md:px-20 mb-5">
        <h2 className="font-sans text-xl md:text-3xl font-semibold text-gray-900">
          Popular Orders
        </h2>
      </div>

      <div className="flex items-start justify-start w-full gap-4 px-5 md:px-20 mt-7 overflow-x-auto no-scrollbar">
        {featuredProducts.map((item) => (
          <div
            key={item._id}
            className="featureCard rounded-md px-4 h-[280px] sm:h-[320px] w-[160px] sm:w-[200px] flex flex-col items-center py-4 transition-transform duration-300 hover:scale-105 bg-[#B78C56] shadow-lg"
          >
            {item.img && (
              <div className="relative w-28 sm:w-32 h-28 sm:h-32 mb-3">
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  className="object-cover rounded-md"
                />
              </div>
            )}
            <div className="flex flex-col items-center text-center">
              <Link href={`/product/${item._id}`}>
                <h1 className="font-bold text-white uppercase text-sm sm:text-md mb-2">
                  {item.title}
                </h1>
                <span className="text-lg sm:text-xl font-medium text-white p-2 rounded-full bg-[#741102]">
                  ${item.price}
                </span>
              </Link>
            </div>
            <button
              onClick={() => router.push(`/product/${item._id}`)}
              className="absolute bottom-3 sm:bottom-4 rounded-full bg-[#741102] p-2 sm:p-3 text-white"
            >
              <ArrowForwardIos fontSize="small" />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Featured;