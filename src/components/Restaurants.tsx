"use client"
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { TimerRounded } from "@mui/icons-material";
import { Skeleton } from "./ui/skeleton";

// Define the type for a restaurant
type Restaurant = {
    _id: string;
    name: string;
    img: string;
    products?: Product[];
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

    useEffect(() => {
        const fetchRestaurants = async (page: number, limit: number) => {
            setLoading(true);
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/products/restaurants?page=${page}&limit=${limit}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                // Log the response status and data
                console.log("Response Status:", res.status);
                const data = await res.json();
                console.log("Fetched restaurants data:", data);

                // Check if the data structure is as expected
                if (data && data.restaurants) {
                    setRestaurants((prevRestaurants) => [...prevRestaurants, ...data.restaurants]);
                    setHasMore(data.hasMore);
                } else {
                    console.error("Unexpected data structure:", data);
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
            <div className="flex justify-between px-10">
                <h1>Best restaurants</h1>
                {session && session?.user.isAdmin && (
                    <Link href="/add/restaurants">Add new restaurants</Link>
                )}
            </div>
            <div className="w-full h-full grid grid-cols-3 px-10 my-10 gap-6">
                {allRestaurants.map((restaurant) => (
                    <div
                        className="w-[390px] mt-9 hover:shadow-lg cursor-pointer hover:rounded-md shadow-none border-none gap-10"
                        onClick={() => router.push(`/restaurant/${restaurant._id}`)}
                        key={restaurant._id}
                    >
                        <div className="lg:w-[384px] lg:h-[160px] relative rounded-lg shadow-lg mb-5 m-auto">
                           {loading ?<Skeleton className="w-full h-full"/>:
                            <Image
                                src={ restaurant.img}
                                fill
                                alt={restaurant.name}
                                className="object-cover rounded-lg"
                            />
                           }
                            
                           </div>
                        <div className="mt-5 border-none text-xl">
                            <p>{loading? <Skeleton /> : restaurant.name}</p>
                            {restaurant.products && restaurant.products.length > 0 && (
                                <><div className="mt-2 flex px-2">
                                    <TimerRounded sx={{ color: "green" }} />

                                    <span className="text-[15px]">{loading ? <Skeleton className="w-20 h-8"/> : `11-12 mins`}</span>
                                </div>
                                <div className="flex justify-between gap-2">
                                    
                                        <span className="text-[12px] text-green-400">{loading ? <Skeleton className="w-20 h-8"/> :restaurant.products[0].catSlug}</span>
                                
                                        {restaurant?.products[0]?.options?.map((pro) => (
                                            <div key={pro._id} className="text-sm text-green-400">
                                                
                                                <span className="text-green flex">{loading ? <Skeleton className="w-20 h-8"/> : pro.title}</span>
                                            </div>
                                        ))}
                                    </div></>
                            )}
                        </div>
                    </div>
                ))}

                {hasMore ? (
                    <div className="flex justify-center mt-8">
                        {loading ? (
                            <Image
                                src="/temporary/p2.png"
                                alt="loading"
                                width={50}
                                height={50}
                                className="animate-spin bg-blend-multiply"
                            />
                        ) : (
                            <Button
                                variant="destructive"
                                onClick={() => setPage((prev) => prev + 1)}
                                disabled={loading}
                            >
                                Show More
                            </Button>
                        )}
                    </div>
                ) : 
                
                <div className="flex justify-center mt-8 px-auto">
                {loading ? (
                    <Image
                        src="/temporary/p1.png"
                        alt="loading"
                        width={50}
                        height={50}
                        className="animate-spin bg-blend-multiply"
                    />
                ) : (
                    <Button
                        variant="destructive"
                        onClick={() => setPage((prev) => prev - 1)}
                        disabled={loading}
                    >
                        Show Less
                    </Button>
                )}
            </div>
                }
            </div>
        </>
    );
};

export default Restaurants;