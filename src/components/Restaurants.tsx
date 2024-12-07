"use client"
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Delete, Favorite, FavoriteBorderOutlined, FavoriteOutlined, TimerRounded } from "@mui/icons-material";
import { Skeleton } from "./ui/skeleton";
import { userCartStore } from "@/lib/utils/store";

// Define the type for a restaurant
type Restaurant = {
    _id: string;
    name: string;
    img: string;
    products?: Product[];
    resProducts:[]
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

// Assuming this is your SavedProductType definition
type SavedProductType = {
    savedProducts: { _id: string; name: string; img: string; optionTitle?: string; quantity: number,products:[] }[];
    // Add any other properties you need here
};

const Restaurants = () => {
    const [hasMore, setHasMore] = useState(true);
    const limit = 6;
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const { data: session } = useSession();
    const [allRestaurants, setRestaurants] = useState<Restaurant[]>([]);
    const {saveProduct,savedProducts, removeSavedProduct,clearSavedProduct} = userCartStore()

    useEffect(() => {
        userCartStore.persist.rehydrate()
      },[])

     
          
       const [fav, setFav] = useState(false);

       
         const checkIsFav = (item:Restaurant) => {
           const foundFav = savedProducts.find((fave) => fave._id === item._id);
           setFav(foundFav !== undefined);
         }
         // Removed the direct call to checkIsFav(item) as it's not needed in this context
    
       
       const isFav = fav;
        
     
    
       const handleSaved = (restaurant: Restaurant, quantity: number) => {

        const isAlreadySaved = savedProducts.some((product) => product._id === restaurant._id);
        
        if (isAlreadySaved) {
            setFav(true);
            removeSavedProduct({
                _id: restaurant._id,
                title: restaurant.name,
                img: restaurant.img,
                optionTitle: '',
                quantity: 1,
                products: [],
                savedProducts: [],
                price: 0
            });
        } else {
            saveProduct({
                _id: restaurant._id,
                title: restaurant.name,
                img: restaurant.img,
                quantity: quantity,
                savedProducts: [],
                products: [],
                price: 0
            });

        }
        // checkIsFav(restaurant);

    }
    console.log("saved", savedProducts)
    
    
      


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
                        className="w-[390px] mt-9 hover:shadow-lg cursor-pointer hover:rounded-md shadow-none border-none gap-10 px-3"
                       
                        key={restaurant._id}
                    >
                        <div className="lg:w-[384px] lg:h-[160px] relative rounded-lg shadow-lg mb-5 m-auto">
                           {loading ?<Skeleton className="w-full h-full"/>:
                            <Image
                                src={ restaurant.img}
                                fill
                                alt={restaurant.name}
                                className="object-cover rounded-lg"
                                onClick={() => router.push(`/restaurant/${restaurant._id}`)}
                            />
                           }
                            <div className="absolute rounded-full p-1.5 bg-green-600 top-0 my-2 left-3">
                            {savedProducts.some((fave) => fave._id === restaurant._id) ? 
        <Favorite sx={{color:"white", fontSize:"20px"}} onClick={() => handleSaved(restaurant,1)} />
    :
        <FavoriteBorderOutlined sx={{color:"white", fontSize:"20px"}} onClick={() => handleSaved(restaurant, 1)} />
    }
                            </div>

                           </div>
                        <div className="mt-5 border-none text-xl">
                            <p>{loading? <Skeleton /> : restaurant.name}</p>
                            {restaurant.products && restaurant.products.length > 0 && (
                                <><div className="mt-2 flex px-2">
                                    <TimerRounded sx={{ color: "green", fontSize:"small"}} />

                                    <span className="text-[15px] font-thin text-gray-300">{loading ? <Skeleton className="w-20 h-5"/> : `11-12 mins`}</span>
                                </div>
                                <div className="flex gap-2">
                                    
                                        <span className="text-sm text-green-400">{loading ? <Skeleton className="w-20 h-8"/> :restaurant.products[0].catSlug}</span>
                                
                                        {restaurant?.products[0]?.options?.map((pro) => (
                                            <div key={pro._id} className="text-sm text-green-300">
                                                
                                                <span className="text-green-300">{loading ? <Skeleton className="w-20 h-8"/> : pro.title}</span>
                                            </div>
                                        ))}
                                    </div>

                                    </>
                                    
                            )}
                        </div>
                    </div>
                ))}

                
            </div>
            {hasMore ? (
                    <div className="flex justify-center my-8">
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
                        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                        disabled={loading}
                    >
                        Show Less
                    </Button>
                )}
            </div>
                }
        </>
    )
}

export default Restaurants;