"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState,forwardRef } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Favorite, FavoriteBorderOutlined, TimerRounded } from "@mui/icons-material";
import { Skeleton } from "./ui/skeleton";
import { userCartStore } from "@/lib/utils/store";
import { motion } from "framer-motion";


type Restaurant = {
  _id: string;
  name: string;
  img: string;
  resProducts: [];
  products: Product[];
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

const Restaurants = () => {
  const [hasMore, setHasMore] = useState(true);
  const limit = 6;
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const [allRestaurants, setRestaurants] = useState<Restaurant[]>([]);
  const { saveProduct, savedProducts, removeSavedProduct } = userCartStore();

  useEffect(() => {
    userCartStore.persist.rehydrate();
  }, []);

  const handleSaved = (restaurant: Restaurant) => {
    const isAlreadySaved = savedProducts.some((product) => product._id === restaurant._id);

    if (isAlreadySaved) {
      removeSavedProduct({
          _id: restaurant._id,
          title: restaurant.name,
          img: restaurant.img,
          optionTitle: "",
          quantity: 1,
          products: restaurant.products.map((product) => ({
              ...product,
              id: product._id,
              restaurantId: restaurant._id,
          })),
          price: 0,
          savedProducts: []
      });
    } else {
      saveProduct({
          _id: restaurant._id,
          title: restaurant.name,
          img: restaurant.img,
          quantity: 1,
          products: restaurant.products.map((product) => ({
              ...product,
              id: product._id,
              restaurantId: restaurant._id,
          })),
          price: 0,
          savedProducts: []
      });
    }
  };

  useEffect(() => {
    const fetchRestaurants = async (page: number, limit: number) => {
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
        if (data && data.restaurants) {
          setRestaurants((prev) => [...prev, ...data.restaurants]);
          setHasMore(data.hasMore);
        }
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants(page, limit);
  }, [page]);

  const router = useRouter();
  return (
    <>
      {/* Admin Link */}
      <div className="flex justify-between mx-20 font-thin sm:px-6 lg:px-10">
        {session && session?.user.isAdmin && (
          <Link href="/add/restaurants" className="text-blue-600">
            Add new restaurants
          </Link>
        )}
      </div>

      {/* Restaurant Cards */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 1.5 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false }}
        className="grid gap-6 px-4 my-10 mx-14 md:grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 sm:px-6"
      >
        {allRestaurants.map((restaurant) => (
          <div
            className="sm:w-[250px] lg:w-[390px] hover:shadow-lg cursor-pointer hover:rounded-md shadow-none border-none px-3"
            key={restaurant._id}
          
          >
            <div className="relative w-full h-40 mb-5 rounded-lg shadow-lg lg:h-48">
              {loading ? (
                <Skeleton className="w-full h-full" />
              ) : (
                <Image
                  src={restaurant.img}
                  fill
                  alt={restaurant.name}
                  className="object-cover rounded-lg"
                  onClick={() => router.push(`/restaurant/${restaurant._id}`)}
                />
              )}
              <div className="absolute top-2 left-2 rounded-full p-2 bg-[#820000]">
                {savedProducts.some((fave) => fave._id === restaurant._id) ? (
                  <Favorite
                    sx={{ color: "white", fontSize: "20px" }}
                    onClick={() => handleSaved(restaurant)}
                  />
                ) : (
                  <FavoriteBorderOutlined
                    sx={{ color: "white", fontSize: "20px" }}
                    onClick={() => handleSaved(restaurant)}
                  />
                )}
              </div>
            </div>
            <div className="text-base lg:text-lg">
              <p>{loading ? <Skeleton /> : restaurant.name}</p>
              {restaurant.products.length > 0 && (
                <>
                  <div className="flex items-center mt-2 text-sm text-gray-600">
                    <TimerRounded sx={{ color: "green" }} />
                    <span className="ml-1">11-12 mins</span>
                  </div>
                  <div className="flex gap-2 mt-1 text-sm">
                    <span className="text-green-500 uppercase">
                      {restaurant.products[0].catSlug}
                    </span>
                    {restaurant.products[0].options?.map((option) => (
                      <span key={option._id} className="text-green-300">
                        {option.title}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        ))}

        {/* Show More Button */}
        {hasMore && (
          <div className="flex justify-center col-span-full">
            <Button
              variant="ghost"
              onClick={() => setPage((prev) => prev + 1)}
              disabled={loading}
            >
              Show More
            </Button>
          </div>
        )}
      </motion.div>
    </>
  );
};

export default Restaurants;