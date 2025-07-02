"use client";
import { userCartStore } from "@/lib/utils/store";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, useMemo } from "react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { Skeleton } from "./ui/skeleton";

type Restaurant = {
  _id: string;
  name: string;
  img: string;
  products?: Product[];
  location: string;
};

type Product = {
  _id: string;
  title: string;
  desc: string;
  img: string;
  options?: { _id: string; title: string; additionalPrice: number }[];
  catSlug: string;
  isFeatured: boolean;
  price: number;
};

const Location = () => {
  const [allRestaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const limit = 6;
  const [page] = useState(1);

  useEffect(() => {
    userCartStore.persist.rehydrate();
  }, []);

  useEffect(() => {
    const fetchRestaurants = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/products/restaurants?page=${page}&limit=${limit}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await res.json();
        setRestaurants(data.restaurants || []);
      } catch (error) {
        setError("Failed to fetch restaurants. Please try again.");
        console.error("Error fetching restaurants:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, [page, limit]);

  const uniqueCategories = useMemo(() => {
    return Array.from(new Set(allRestaurants.map((restaurant) => restaurant.location)));
  }, [allRestaurants]);

  return (
    <>
      <div className="mt-20 lg:ml-20 xl:ml-20 sm:px-6 md:px-6 font-extralight">
        <h1 className="pl-4 text-2xl">Best Restaurants</h1>
      </div>
      <div className="flex w-full lg:p-10 xl:p-10 md:p-5 sm:p-5 mt-4 overflow-x-auto no-scrollbar">
        <div className="mx-20 lg:py-2 md:px-2 md:py-1">
          <p className="text-xs text-gray-500">By Location</p>
        </div>

        <motion.div
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ ease: "easeInOut", duration: 1.5 }}
          className="flex gap-5"
        >
          {loading ? (
            Array.from({ length: limit }).map((_, index) => (
              <Skeleton key={index} className="w-20 h-8" />
            ))
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : uniqueCategories.length > 0 ? (
            uniqueCategories.map((location) => (
              <Button
                className="lg:mr-6 xl:mr-6 md:pl-0 sm:pl-0 text-white rounded-2xl hover:text-white hover:bg-black"
                key={location}
                onClick={() => router.push(`/location/${location}`)}
              >
                {location}
              </Button>
            ))
          ) : (
            <p className="text-gray-500">No locations found</p>
          )}
        </motion.div>
      </div>
    </>
  );
};

export default Location;
