"use client"
import { userCartStore } from '@/lib/utils/store';
import { useRouter } from 'next/navigation';
import React, { useState , useEffect } from 'react'
import { Button } from './ui/button';

type Restaurant = {
    _id: string;
    name: string;
    img: string;
    products?: Product[];
    resProducts:[];
    location: [];
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
    const router = useRouter()
    const limit = 6;
    const [page, setPage] = useState(1);

    useEffect(() => {
        userCartStore.persist.rehydrate()
      },[])

 useEffect(() => {
        const fetchRestaurants = async (page: number, limit: number) => {
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

                
                setRestaurants(data.restaurants)

                // Check if the data structure is as expected
              
            } catch (error) {
                console.error("Error fetching restaurants:", error);
            } finally {
            }
        };

        fetchRestaurants(page,limit);
    }, [allRestaurants]);


    const uniqueCategories = Array.isArray(allRestaurants) ? Array.from(new Set(allRestaurants.map((pro) => pro.location !== undefined))) : [];



    return (
        <><div className='px-10 mt-20'>
            <h1 className='text-3xl'>Best Restaurants</h1>
        </div><div className='w-full p-10'>
                <div>
                   <p className="text-sm text-gray-500"> By Location </p>
                </div>
                <div className='flex gap-5'>
                    {uniqueCategories.length > 0 && allRestaurants.map((loc: Restaurant) => (
                        <Button className={`mr-6 text-white rounded-2xl hover:text-white hover:bg-black `} key={loc._id} onClick={() => router.push(`/location/${loc.location}`)}>
                            {loc.location}
                        </Button>
                    ))}
                </div>
            </div></>
    )
}

export default Location;