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
import ProCard from "./ProCard";
import { motion } from "framer-motion";
import NewCooked from "./NewlyCooked";
import { useMediaQuery } from "@/hooks/use-media-query";

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
  
  const [res,setRes] = useState("")

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


  const isDesktop = useMediaQuery("(min-width: 768px)");
  return (
    <>
     <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.75 }}
    >
    <div className='relative flex flex-col py-5 lg:mx-20 xl:mx-20 mt-5 2xl:max-container lg:mb-10 lg:py-20 xl:mb-20 '>
      <div className="flex justify-between ">
        <h2 className="pl-6 mb-4 font-sans font-semibold text-gray-900 lg:text-xl md:text-sm sm:text-sm">Newly cooked</h2>
        
      </div>
    {
       isDesktop ?
      <div className='grid w-full h-full grid-cols-3 gap-8'>
      
        {products.map((pro: ProductType) => (
          
           <ProCard 
            key={pro._id} 
            item={pro} 
            loading={false} 
            href={`/product/${pro._id}`} 
            img={pro.img || ''} 
            title={pro.title || ''} 
            desc={pro.desc || ''} 
            price={pro.price.toString()} 
            catSlug={pro.catSlug || ''}
          /> 
        ))}
          </div>
       

          :
          <div className="flex flex-1 w-full gap-4 overflow-x-auto no-scrollbar ml-6">
  {products.map((pro: ProductType) => (
    <NewCooked
      key={pro._id}
      item={pro}
      loading={false}
      href={`/product/${pro._id}`}
      img={pro.img || ""}
      title={pro.title || ""}
      desc={pro.desc || ""}
      price={pro.price.toString()}
      catSlug={pro.catSlug || ""}
      className="min-w-[75%] sm:min-w-[50%] md:min-w-[33.33%] lg:min-w-[25%]" // Adjust width as needed
    />
  ))}
</div>


      }

      

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
    </motion.div>
    </>
  );
};

export default Products;
