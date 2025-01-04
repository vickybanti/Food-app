"use client"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { userCartStore } from '@/lib/utils/store';
import { Favorite, FavoriteBorderOutlined, TimerRounded } from '@mui/icons-material';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

type Restaurant = {
    [x: string]: any;
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

const Page = ({params}: {params: {location: string}}) => {



    const {location} = params;
    const decodedLocation = decodeURIComponent(location);

    const router = useRouter()

    const [res, setRes] = useState<Restaurant[]>([])
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")
    const [options, setOptions] = useState("");

    const handleOptionChange = (catSlug: string) => {
        // Set the selected category as the only option
        setOptions(catSlug);
      };
    
      console.log(options)

    useEffect(()=>{
        
            const getRes = async() => {
                setLoading(true)

                try {
                const fetchRes = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/location/${location}`,{
                    method:"GET",
                    headers:{"Content-Type":"application/json"}
                })
                let response = await fetchRes.json()
                setRes(response)
                setLoading(false)

                // Check if data is an object and contains products
                if (response && Array.isArray(response.products)) {
                    // Sort products based on category
                    if (options.length > 0) {
                      response.products.sort((a: { catSlug: string }, b: { catSlug: string }) => {
                        return a.catSlug.localeCompare(b.catSlug);
                      });
                    } else {
                      setRes(response)
    
                    }
                }
                   
                    
    
                    console.log("Sorted data:", response);
                    setRes(response)
            
        } catch (error) {
            console.error(error)
        
    }

    }
    getRes()

},[location])
   
      const uniqueCategories = Array.from(new Set(res.flatMap((restaurant) => restaurant.products?.map((pro: any) => pro.catSlug) || [])));


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
    
    
      

    console.log(res)

    const filteredRestaurants = res.filter((restaurant) => 
        restaurant.products?.some((product) => product.catSlug === options) || options.length === 0
    );

    useEffect(() => {
        if (filteredRestaurants.length === 0 && options.length > 0) {
            setMessage(`No restaurants found under the category: ${options}`);
        } else {
            setMessage(""); // Clear message if restaurants are found
        }
    }, [filteredRestaurants, options]);

    return (
        <div className="w-full my-20">
            <div className="px-20 mt-20 bg-green-950">
                <h1 className='flex justify-center py-10 lg:text-3xl md:text-md sm:text-md font-semibold text-white'>
                Order your delicious meals from restaurants in {decodedLocation}
                </h1>

                <p className="flex justify-center py-5 lg:text-2xl md:text-sm sm:text-sm text-gray-300">
                Choose from the top categories

                </p>

                <div className='flex justify-center w-full py-8'>
                <Button className={`mr-6 text-black rounded-2xl hover:text-white hover:bg-black ${!options ? 'bg-black text-white' :  'bg-white'}`} onClick={() => handleOptionChange("")}>
                    All

                   </Button>
                {uniqueCategories.map((catSlug: any) => (
                      
                       <Button className={`mr-6 text-black rounded-2xl hover:text-white hover:bg-black ${options.includes(catSlug) ? 'bg-black text-white' :  'bg-white'}`} key={catSlug}  onClick={() => handleOptionChange(catSlug)}>
                          {loading ? <Skeleton className="w-8 h-5" /> : catSlug}
                      </Button>
                  ))}
                  
                   {/* <Button className='mr-6 text-black bg-white rounded-2xl hover:text-white hover:bg-black'>
                    Parfait

                   </Button>

                   <Button className='mr-6 text-black bg-white rounded-2xl hover:text-white hover:bg-black'>
                    Soup

                   </Button>

                   <Button className='mr-6 text-black bg-white rounded-2xl hover:text-white hover:bg-black'>
                    Pizzas

                   </Button>

                   <Button className='mr-6 text-black bg-white rounded-2xl hover:text-white hover:bg-black'>
                    Burgers

                   </Button> */}
                </div>

            </div>

            

            <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 1.5 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false }}
        className="grid md:grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-6 px-4 sm:px-6 lg:px-10 my-10"
      >
            {filteredRestaurants.map((restaurant) => (
                <div
                    className="sm:w-[250px] lg:w-[390px] hover:shadow-lg cursor-pointer hover:rounded-md shadow-none border-none px-3"
                    key={restaurant._id}
                >
                    {message && message}
                    <div className="lg:w-[370px] lg:h-[160px] relative rounded-lg shadow-lg mb-5 m-auto">
                        {loading ? <Skeleton className="w-full h-full" /> :
                            <Image
                                src={restaurant.img}
                                fill
                                alt={restaurant.name}
                                className="object-cover rounded-lg"
                                onClick={() => router.push(`/restaurant/${restaurant._id}`)} />}
                        <div className="absolute rounded-full p-1.5 bg-green-600 top-0 my-2 left-3">
                            {savedProducts.some((fave) => fave._id === restaurant._id) ?
                                <Favorite sx={{ color: "white", fontSize: "20px" }} onClick={() => handleSaved(restaurant, 1)} />
                                :
                                <FavoriteBorderOutlined sx={{ color: "white", fontSize: "20px" }} onClick={() => handleSaved(restaurant, 1)} />}
                        </div>

                    </div>
                    <div className="mt-5 text-xl border-none">
                        <p className="text-lg">{loading ? <Skeleton /> : restaurant.name}</p>
                        {restaurant.products && restaurant.products.length > 0 && (
                            <><div className="flex px-2 mt-2">
                                <TimerRounded sx={{ color: "green" }} />

                                <span className="text-[15px] font-thin text-gray-700">{loading ? <Skeleton className="w-20 h-5" /> : `11-12 mins`}</span>
                            </div>
                                <div className="flex gap-2">

                                    <span className="text-sm text-green-400 uppercase">{loading ? <Skeleton className="w-20 h-5" /> : restaurant.products[0].catSlug}</span>

                                    {restaurant?.products[0]?.options?.map((pro) => (
                                        <div key={pro._id} className="text-sm text-green-300">

                                            <span className="text-green-300">{loading ? <Skeleton className="w-20 h-5" /> : pro.title}</span>
                                        </div>
                                    ))}
                                </div>

                            </>

                        )}
                    </div>
                </div>
            ))}



        </motion.div>
        </div>
    )

}
export default Page;