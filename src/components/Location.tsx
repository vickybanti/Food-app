"use client";
import { userCartStore } from "@/lib/utils/store";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { Skeleton } from "./ui/skeleton";

type Restaurant = {
  _id: string;
  name: string;
  img: string;
  products?: Product[];
  resProducts: [];
  location: string; // Ensure this is properly typed
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
  const [uniqueCategories, setUniqueCategories] = useState<string[]>([]);
  const router = useRouter();

  const limit = 6;
  const [page] = useState(1);

  useEffect(() => {
    userCartStore.persist.rehydrate();
  }, []);

  useEffect(() => {
    const fetchRestaurants = async () => {
      setLoading(true);

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

        // Log fetched data
        console.log("Fetched restaurants data:", data);

        setRestaurants(data.restaurants || []);

        // Extract unique locations
        const locations = Array.from(
          new Set(data.restaurants?.map((restaurant: Restaurant) => restaurant.location))
        );
        setUniqueCategories(locations);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, [page, limit]);

  return (
    <>
      <div className="px-10 mt-20 font-extralight">
        <h1 className="text-3xl">Best Restaurants</h1>
      </div>
      <div className="w-full p-10">
        <div>
          <p className="text-sm text-gray-500">By Location</p>
        </div>

        <motion.div
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ ease: "easeInOut", duration: 1.5 }}
          className="flex gap-5"
        >
          {loading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <Skeleton key={index} className="w-20 h-8" />
            ))
          ) : uniqueCategories.length > 0 ? (
            uniqueCategories.map((location) => (
              <Button
                className="mr-6 text-white rounded-2xl hover:text-white hover:bg-black"
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
