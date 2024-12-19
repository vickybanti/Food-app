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
      <section className="relative flex flex-col items-center w-full h-full py-5">
        <h1 className="text-3xl font-sans font-semibold text-gray-900">
          Popular Orders
        </h1>
        <span className="text-sm text-gray-500">
          Add more restaurants to favorites to see their featured products
        </span>
      </section>
    );
  }

  return (
    <section className="relative flex flex-col w-full h-full py-5 overflow-x-auto feature no-scrollbar mt-14">
      <div className="flex justify-between mx-20 mb-5">
        <h2 className="font-sans text-3xl font-semibold text-gray-900">
          Popular orders
        </h2>
      </div>

      <div className="flex items-start justify-start w-full h-full gap-8 px-2 mx-32 mt-7">
        <div className="relative flex w-full mt-10 overflow-x-auto no-scrollbar">
          {savedProducts.map((product) => (
            product.products?.map((item) => (
              item.isFeatured && (
            <div
              key={item._id}
              className="featureCard rounded-md px-5 mx-10 my-14 h-[300px] w-[220px] flex flex-col items-center py-20 hover:bg-fuchsia-50 transition-all duration-300 bg-[#B78C56] shadow-[-10px_7px_0px_0px_#741102]"
            >
              {item.img && (
                <div className="hover:scale-x-105 transition-all duration-500 mt-[-130px] w-52 h-8 mb-10 mx-auto">
                  <Image
                    src={item.img}
                    alt={item.title}
                    width={170}
                    height={100}
                    className="object-cover mix-blend-multiply"
                  />
                </div>
              )}
              <div className="flex flex-col items-center justify-center flex-1 gap-2 text-center">
                <Link href={`/product/${item._id}`}>
                  <h1 className="pt-32 pb-8 font-bold text-white uppercase text-md">
                    {item.title}
                  </h1>
                  <span className="text-xl font-medium text-white rounded-full p-2 bg-[#741102]">
                    {item.price}
                  </span>
                </Link>
              </div>
              <button
                onClick={() => router.push(`/product/${item._id}`)}
                className="rounded-full bg-[#741102] p-4 text-white absolute mt-[190px] cursor-pointer"
              >
                <ArrowForwardIos fontSize="large" />
              </button>
            </div>
            )
            ))
          ))}
        </div>
      </div>
    </section>
  );
};

export default Featured;
