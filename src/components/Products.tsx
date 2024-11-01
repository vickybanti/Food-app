'use client'
import { ProductType } from "@/types/types";
import { Add, AddShoppingCartRounded } from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
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
import { Skeleton } from "./ui/skeleton";

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
  const limit = 6;

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
    <section className='2xl:max-container relative border-t-2 border-t-[#B78C56]
    flex flex-col py-5 lg:mb-10 lg:py-20 xl:mb-20 mx-20'>
      <div className="flex justify-between">
        <h2 className="mb-4 font-sans text-3xl font-semibold text-gray-900 ">All Products</h2>
        <Link href="/products" className="font-semibold font-[italics] hover:underline text-[#3b3b18]">
          View all
        </Link>
      </div>

      <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3'>
        {products.map((item) => (

          

          <Card key={item._id} className="overflow-hidden shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-1px_rgba(0,0,0,0.06)] w-80">
            <CardHeader className="p-0">
              {item.img && (
                <div className="relative w-full h-64">
                  {loading && (<Skeleton className="w-full h-full"/>)}
                  <Image 
                    src={item.img} 
                    alt="" 
                    fill 
                    className="object-cover"
                  />
                </div>
              )}
            </CardHeader>
            <CardContent className="flex flex-col gap-2 p-4 text-black">
              {loading && (<Skeleton className="w-4 h-4"/>)}
              <CardDescription className="font-semibold text-black">{item.title}</CardDescription>
              <CardDescription className="font-semibold text-gray-800">{item.desc}</CardDescription>

              <div className="flex gap-4">
              <p className="font-bold text-[#741102]">${item.price}</p> | 
              <p className="text-gray-500">{item.catSlug}</p>
              </div>
             
            </CardContent>
            <CardFooter className="flex justify-between">
              <div></div>
              <span className="mt-[-20px]">
                <Drawer>
                  <DrawerTrigger className="p-2 bg-[#042d29] rounded-full hover:bg-[#042d29]/90 transition-colors">
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
            onClick={() => setPage(prev => prev + 1)}
            disabled={loading}
          >
            {loading ? 
            
            <Image src="/temporary/p2.png" 
            alt="loading" 
            width={50} 
            height={50} 
            className='animate-spin bg-blend-multiply'/>
            
            : 'Show More'}
          </Button>
        </div>
      )}
    </section>
  );
};

export default Products;
