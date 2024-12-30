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
  return (
    <>
     <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.75 }}
    >
    <div className='relative lg:flex lg:flex-col  md:grid md:grid-cols-2 sm:grid sm:grid-cols-2 py-5 lg:mx-20 md:mx-4 sm:mx-4 2xl:max-container lg:mb-10 lg:py-20 xl:mb-20'>
      <div className="flex justify-between md:px-4">
        <h2 className="mb-4 font-sans lg:text-xl md:text-sm sm:text-sm font-semibold text-gray-900 ">Newly cooked</h2>
        <Link href="/products" className="font-semibold hover:underline text-[#3b3b18]">
          View all
        </Link>
      </div>

      <div className='grid md:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:px-4 lg:px-10 my-10'>
      
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
