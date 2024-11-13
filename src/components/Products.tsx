'use client'
import { ProductType } from "@/types/types";
import { Add } from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "./ui/button";
import Price from "./Price";


type FontProps = {
  fontSize:string;
}

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Skeleton } from "@mui/material";

const getData = async(page: number, limit: number) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/products?page=${page}&limit=${limit}`,{
    cache:"no-store",
    headers: {
      'Content-Type': 'application/json',
    },
  })
  if(!res.ok){
    throw new Error("failed")
  }
  return res.json()
}

const Products = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const limit = 4;

  const router = useRouter()

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await getData(page, limit);
      setProducts(prev => [...prev, ...data.products]);
      setHasMore(data.hasMore);
    } catch (error) {
      console.error("Error loading products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [page]);
  return (
    <div className='2xl:max-container relative border-t-2 border-t-[#B78C56]
    flex flex-col py-5 lg:mb-10 lg:py-20 xl:mb-20 mx-20 prod'>
      <div className="flex justify-between prodHeader">
        <h2 className="mb-4 font-sans text-xl font-semibold text-gray-900 ">Newly cooked</h2>
        <Link href="/products" className="font-semibold hover:underline text-[#3b3b18]">
          View all
        </Link>
      </div>

      <div className='grid grid-cols-1 gap-8 proFeature sm:grid-cols-2 lg:grid-cols-3 md:grid-cols-2'>
      

        {products.map((item) => (

          

<Card key={item._id} className="card shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-1px_rgba(0,0,0,0.06)] lg:w-[250px] lg:h-[350px] mx-auto">
<CardHeader className="cardHeader lg:w-full lg:h-[250px] ">
  {item.img && (
    <div className="relative h-60 lg:w-full cardImage">
      {loading ? (<Skeleton className="w-full h-full rounded-full"/>):
      <Link href={`/product/${item._id}`}>
      
      <Image 
        src={item.img} 
        alt="" 
        fill 
        className="object-cover"
      />
      </Link>
    }
    </div>
  )}
</CardHeader>
<CardContent className="flex flex-col gap-2 p-4 text-black mt-[-20px]">
  {loading ? (<Skeleton className="w-10 h-4"/>):
  <CardDescription className="font-semibold text-black">{item.title}</CardDescription>}
  {loading ? (<Skeleton className="w-10 h-4"/>):
  <CardDescription className="catFont text-gray-800">{item.desc}</CardDescription>}

  <div className="flex gap-4">
  {loading ? (<Skeleton className="w-8 h-4"/>):
  <p className="font-bold text-[#741102] priceFont">${item.price}</p> } | {loading ? (<Skeleton className="w-10 h-4"/>): 
  <p className="text-gray-500 priceFont">{item.catSlug}</p>}
  </div>
 
</CardContent>
<CardFooter className="flex justify-between">
  <div></div>
  <span className="mt-[-60px]">
    <Drawer>
      <DrawerTrigger className="cartSize p-2 bg-[#042d29] rounded-full hover:bg-[#042d29]/90 transition-colors">
        <Add fontSize="large" className="text-white"/>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="flex flex-col gap-2 mx-auto">
          <DrawerTitle>
            <Price product={item}/>
          </DrawerTitle>
          <DrawerDescription></DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  </span>
</CardFooter>
</Card>
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-8">
          <Button 
            variant="outline" 
            onClick={()=>router.push('/products')}
            disabled={loading}
          >
            
            Show all
          </Button>
        </div>
      )}
    </div>
  );
};

export default Products;
