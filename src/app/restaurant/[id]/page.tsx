"use client"

import { Address } from '@/components/Address';
import CartIcon from '@/components/CartIcon';
import ProCard from '@/components/ProCard';
import { userCartStore } from '@/lib/utils/store';
import { DeleteSweepSharp, Timelapse } from '@mui/icons-material';
import { Divider, Skeleton, ListItem, Box, List } from '@mui/material';
import { useSession } from 'next-auth/react';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import Link from 'next/link';



const Page = ({params}:{params:{id:string}}) => {
  const {products, totalItems, totalPrice, removeFromCart} = userCartStore()


    const {id} =params;


    const { data: session } = useSession()
    const router = useRouter()
    console.log(session)
  
    const userEmail = session?.user?.email
  console.log(userEmail)
  
  const [loading, setLoading] = useState(false)
  
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

  const [options, setOptions] = useState("")

  const handleOptionChange = (catSlug: string) => {
    setOptions(catSlug);
  }

  console.log(options)
  
  

    const [allProduct,setProduct] = useState<any>({})

    useEffect(() => {
        const getProduct = async() => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/products/restaurants/${id}`,{
                method:"GET",
                cache:"no-store"
            })
            let data = await res.json();

            // Filter products by catSlug if options are set
            if (options) {
                // Filter products based on the selected category slug
                data = data.filter((product: any) => product.catSlug === options);
                
                // Sort by createdAt (newest first)
                data.sort((a:any, b:any) => b.catSlug - a.catSlug);
            }
                
            console.log("data,",data)
            setProduct(data)
        }
        getProduct()

    },[id, options])
    console.log(allProduct)

  const uniqueCategories = Array.from(new Set(allProduct.products?.map((pro: any) => pro.catSlug)));


  return (
    <div key={allProduct._id} className='relative flex justify-between px-5 mx-10 my-36'>

       
                    <div className='h-full relative w-[70%] mt-3 mr-10'>
                    <div className="relative flex flex-col h-60 rounded-xl">

         <Image src= {allProduct.img} fill alt={allProduct.name} className='object-cover rounded-xl'/>

         <div className={`rounded-xl absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-2  h-full flex items-center justify-center`}>
                    <p className={`font-semibold text-[20px] font-sans hidden md:block md:m-auto md:items-center`}>Opens at 2pm sundays-saturdays</p>
                  </div>
         </div>

        <div className="justify-between w-[1200px] flex">
            <h1 className='py-5 text-[30px]'>{allProduct.name}</h1>

           <div className='right-0 justify-between p-3 mt-3 ml-40 bg-gray-100 border-2 border-black rounded-lg h-14'>

            <span className='p-2 bg-green-500 text-[14px] mr-2 rounded-md border-1'>Pickup</span>
            <span className='p-2 text-[14px] ml-2'>Delivery now</span>


           </div>

           <Divider />

          
         </div>
         <div className='flex justify-between'>
        <div className="flex flex-col">
         <h1>Opening hours</h1>
           <p className='text-gray-300'>
                <Timelapse sx={{color:"greenyellow"}}/>
                2pm to 11pm
           </p>
           </div>
              <span className='right-0 font-medium text-green-500'>
                Min.Order- ${allProduct.lowestPrice}
              </span>
           </div>

           <div className='flex w-full mt-6'>
                <div className='flex flex-wrap w-full h-16 overflow-x-scroll text-green-500 text-md'>
                    {uniqueCategories.map((catSlug) => (
                        <p key={catSlug} className='p-2 bg-gray-100 rounded-md cursor-pointer' onChange={() => handleOptionChange(catSlug)}>
                            {catSlug}
                        </p>
                    ))}
                </div>

           </div>

           <div className='grid grid-cols-2 gap-4 mt-10'>
            {allProduct.products?.map((pro:any) => (
                <ProCard key={pro._id} item={pro} loading={false} href={`/product/${pro._id}`} img={pro.img} title={pro.title} desc={pro.desc} price={pro.price} catSlug={pro.catSlug}/>
              ))
              
              }
              <Link href={`/add/${allProduct._id}`}>
                Add more products
              </Link>
              </div>
            </div>

         <div className='sticky top-0 right-0 flex flex-col h-full overflow-y-scroll border-l-2 w-96'>
          <div className='flex justify-between border-b-2'>
          <h2 className='text-green-600'>{allProduct.name}</h2>
          </div>

        
         <List>
            
            {loading && (<Skeleton className="w-40 h-40"/>)}
        {products.length === 0 ? (<h1 className="flex items-center p-12 font-bold">No items in cart</h1>)
        :
        products.map((item) => (
          <ListItem className="flex items-center justify-between mb-4" key={item._id}>
        
          {item.img &&
          <Image src={item.img} alt="" width={80} height={80} className="cartImage" />
          }
          <div className="ml-5">
            <h1 className="text-sm font-semibold uppercase cartTitle">{item.title} </h1>
            <span className="text-gray-400 cartoption"> {item.quantity} </span>
            
            <span className="text-gray-400 cartoption">{item.optionTitle}</span>
          </div>
          <h2 className="ml-3 font-bold">${item.price}</h2>
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
          <span className="">Subtotal {totalItems}</span>
          <span className="ml-24 text-green-700">{totalPrice}</span>
        </div>
        <div className="flex justify-between">
          <span className="">Service Cost</span>
          <span className="text-green-700">$0.00</span>
        </div>
        <div className="flex justify-between">
          <span className="">Delivery Cost</span>
          <span className="text-green-500">FREE!</span>
        </div>
        <hr className="my-2" /> 
        <div className="flex justify-between">
          <span className="">TOTAL(INCL. VAT)</span>
          <span className="font-bold text-green-700">${totalPrice}</span>
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
          Checkout
        </Button>
        ) : (
          <Link href="/login">
          <Button 
        type="submit" 
        
        className="bg-[#042D29] text-white">
          Login to checkout
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