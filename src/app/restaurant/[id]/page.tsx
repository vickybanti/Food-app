"use client"

import { Address } from '@/components/Address';
import CartIcon from '@/components/CartIcon';
import ProCard from '@/components/ProCard';
import { userCartStore } from '@/lib/utils/store';
import { DeleteSweepSharp, NightsStay, Timelapse } from '@mui/icons-material';
import { Divider, Skeleton, ListItem, Box, List } from '@mui/material';
import { useSession } from 'next-auth/react';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import {Button} from '../../../components/ui/button';
import Link from 'next/link';



const Page = ({params}:{params:{id:string}}) => {
  const {products, totalItems, totalPrice, removeFromCart} = userCartStore()


    const {id} =params;


    const { data: session } = useSession()
    const router = useRouter()
    console.log(session)
  
    const userEmail = session?.user?.email
  console.log(userEmail)
  
  
  // useEffect(()=> {
  //   userCartStore.persist.rehydrate();
  // })
  
  const handleCheckout = async() => {
    setLoading(true)
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/orders`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },       
        body: JSON.stringify({
          price: totalPrice,
          products, 
          status: "Not paid",
          userEmail: userEmail,
          totalAmount: totalPrice,
          intentId: "pending"
        })
      });
      const getData = await res.json()
      console.log(getData)
      setLoading(false)
      router.push(`/pay/${getData._id}`)
    } catch (error) {    
  
      console.log(error)
      setLoading(false)
    }
  }

  const [options, setOptions] = useState("");

  const handleOptionChange = (catSlug: string) => {
    // Set the selected category as the only option
    setOptions(catSlug);
  };

  console.log(options)
  
  

    const [allProduct,setProduct] = useState<any>({})

    const [pickup, setPickup] = useState("")

    const [loading, setLoading] = useState(false)

    const handleChange = (e: any) => {
      setPickup(e.target.value);
    }

    

    useEffect(() => {
        const getProduct = async() => {
          setLoading(true)
            const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/products/restaurants/${id}`, {
                method: "GET",
                cache: "no-store"
            });
            let data = await res.json();

            // Check if data is an object and contains products
            if (data && Array.isArray(data.products)) {
                // Sort products based on category
                if (options.length > 0) {
                  data.products.sort((a: { catSlug: string }, b: { catSlug: string }) => {
                    return a.catSlug.localeCompare(b.catSlug);
                  });
                } else {
                  setProduct(data)
                  setLoading(false)

                }
               
                

                console.log("Sorted data:", data);
                setProduct(data); // Set the entire data object if needed
            } else {
                console.error("Expected data to be an object with a products array, but got:", data);
            }
        }
        getProduct();
    }, [id]);
    console.log(allProduct)

  const uniqueCategories = Array.from(new Set(allProduct.products?.map((pro: any) => pro.catSlug)));


  return (
    <div key={allProduct._id} className='relative flex justify-between px-5 mx-10 my-36'>

       
                    <div className='h-full relative w-[70%] mt-3 mr-10'>
                    <div className="relative flex flex-col h-60 rounded-xl">

        {loading ? <Skeleton className="w-40 h-20"/> : <Image src= {allProduct.img} fill alt={allProduct.name} className='object-cover rounded-xl'/>}
         {allProduct.open ? ""
         :

         <div className={`rounded-xl absolute bottom-0 left-0 right-0 ${allProduct.open? 'bg-none': 'bg-black bg-opacity-70 text-white'} p-2  h-full flex items-center justify-center`}>
                   {loading ? <Skeleton className="w-10 h-8"/> : <p className={`font-semibold text-[20px] hidden md:block md:m-auto md:items-center`}>Opens {allProduct.openTime} sundays-saturdays</p>}
                  </div>
}
         </div>
         



        <div className="justify-between w-[1200px] flex">
            <h1 className='py-5 text-[30px]'>{loading ? <Skeleton className="w-10 h-8"/> : allProduct.name}</h1>

           

           <Divider />

          
         </div>
         <div className='flex justify-between'>
        <div className="flex flex-col">
        {allProduct.open ?
         <><h1>Opening hours</h1><p className='font-thin text-gray-600'>

                <Timelapse sx={{ color: "greenyellow" }} />
                {loading ? <Skeleton className="w-10 h-8"/> : allProduct.openTime} to {loading ? <Skeleton className="w-10 h-8"/> : allProduct.closingTime}



              </p></>

           :
           <h1>Closed</h1>
        }
           </div>
              <span className='right-0 font-medium text-black font-extrathin'>
                Min.Order- ${loading ? <Skeleton className="w-8 h-5"/> : allProduct.lowestPrice}
              </span>
           </div>

           <div className='flex w-full mt-6'>
                <div className='flex flex-wrap w-full h-16 overflow-x-scroll text-green-500 text-md'>
                  <p className={`p-2 rounded-md cursor-pointer #`} onClick={() => handleOptionChange("")}>
                  All
                  </p>
                    {uniqueCategories.map((catSlug: any) => (
                      
                        <p key={catSlug} className={`p-2 rounded-md cursor-pointer ${options.includes(catSlug) ? 'bg-green-200' : 'bg-gray-100'}`} onClick={() => handleOptionChange(catSlug)}>
                            {loading ? <Skeleton className="w-10 h-5" /> : catSlug}
                        </p>
                    ))}
                </div>

           </div>

           <div className='grid grid-cols-2 gap-4 mt-10'>
            {allProduct.products?.filter((pro: any) => options.length === 0 || options.includes(pro.catSlug)).map((pro: any) => (
                <ProCard key={pro._id} item={pro} loading={false} href={`/product/${pro._id}`} img={pro.img} title={pro.title} desc={pro.desc} price={pro.price} catSlug={pro.catSlug}/>
            ))}
            <Link href={`/add/${allProduct._id}`}>
                Add more products
            </Link>
            </div>
            </div>
       

         <div className='sticky top-0 right-0 flex flex-col h-full overflow-y-scroll border-l-2 w-96'>
          <div className='flex justify-between border-b-2'>
          <h2 className='text-green-600'>{loading? <Skeleton className="w-10 h-5" /> : allProduct.name}</h2>
          </div>

        
         <List>
            
            {loading && (<Skeleton className="w-40 h-40"/>)}
        {products.length === 0 ? (<h1 className="flex items-center p-12 font-bold">No items in cart</h1>)
        :
        products.map((item) => (
          <ListItem className="flex items-center justify-between mb-4" key={item._id}>
        
          {item.img &&
          loading ? 
          <Skeleton className="w-10 h-8"/> :
          <Image src={item.img} alt="" width={80} height={80} className="cartImage" />
          }
          <div className="ml-5">
            <h1 className="text-sm font-semibold uppercase cartTitle">{loading ? <Skeleton className="w-10 h-8"/> : item.title} </h1>
            <span className="text-gray-400 cartoption"> {loading ? <Skeleton className="w-10 h-8"/> : item.quantity} </span>
            
            <span className="text-gray-400 cartoption">{loading ? <Skeleton className="w-10 h-8"/> : item.optionTitle}</span>
          </div>
          <h2 className="ml-3 font-bold">${loading ? <Skeleton className="w-10 h-8"/> : item.price}</h2>
          <span className="cursor-pointer font-[red] ml-3" onClick={()=>removeFromCart(item)}>
            <DeleteSweepSharp sx={{color:"red"}}/>
          </span>
        </ListItem>
        ))}
          </List>
          
          <Divider />
        
          <List>
            <ListItem>
              <div className="h-1/2 bg-[#400212]-50 flex flex-col gap-4 justify-between px-5 lg:h-full  2xl:w-1/2 2xl:gap-6">
            <div className="flex justify-between gap-14">
          <span className="">Subtotal {loading ? <Skeleton className="w-10 h-8"/> : totalItems}</span>
          <span className="ml-24 text-green-700">{loading ? <Skeleton className="w-10 h-8"/> : totalPrice}</span>
        </div>
        <div className="flex justify-between">
          <span className="">Service Cost</span>
          <span className="text-green-700">{loading ? <Skeleton className="w-10 h-8"/> : "$0.00"}</span>
        </div>
        <div className="flex justify-between">
          <span className="">Delivery Cost</span>
          <span className="text-green-500">FREE!</span>
        </div>
        <hr className="my-2" /> 
        <div className="flex justify-between">
          <span className="">TOTAL(INCL. VAT)</span>
          <span className="font-bold text-green-700">{loading ? <Skeleton className="w-10 h-8"/> : totalPrice}</span>
        </div>
        {session && (
          <Box>
          
          <Address />
          </Box>
        
        
        )}
        {session ? (
        <Button
        type="submit" 
        onClick={handleCheckout}
        title="Checkout"
        className="bg-[#042D29] text-white">
          {loading ? <Skeleton className="w-10 h-8"/> : "Checkout"} 
        </Button>
        ) : (
          <Link href="/login">
          <Button 
        type="submit" 
        
        className="bg-[#042D29] text-white">
          {loading ? <Skeleton className="w-10 h-8"/> : "Login to checkout"}
          </Button>
        </Link>
        )
        }
        </div>
        
        
            </ListItem>
          </List>
            </div>
         </div>



    

  )
}

export default Page