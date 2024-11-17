'use client'
import {  ProductType } from "@/types/types";
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

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar"

import { Button } from "@/components/ui/button";
import Price from "@/components/Price";


type FontProps = {
  fontSize:string;
}

import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

const getData = async(page: number, limit: number, category: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/products?page=${page}&limit=${limit}&category=${category}`, {
    cache: "no-store",
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!res.ok) {
    throw new Error("failed");
  }
  return res.json();
}

const ProductsPage = () => {
    const {data:session} = useSession()
  const [products, setProducts] = useState<ProductType[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const limit = 6;
  const searchParams = useSearchParams();
  const category = searchParams.get('category') || '';

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await getData(page, limit, category);
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
  }, [page, category]);

  return (
    <section className='relative flex flex-col py-5 mt-20 overflow-hidden border-t-2 2xl:max-container lg:mb-10 lg:py-20 lg:px-10 xl:mb-20 md:w-full sm:w-full md:mx-0 md:px-0'>
      <div className="proHeader flex justify-between">
                <h2 className="mb-4 font-sans text-3xl font-semibold text-gray-900 ">{category ? category : 'All Products'}</h2>
                {category && (
                    <Link href="/products" className="font-semibold hover:text-[#3b3b18] cursor-pointer">View All Products</Link>
                )}


                {session?.user.isAdmin && (


        <Menubar>
        <MenubarMenu>
          <MenubarTrigger className="cursor-pointer">Add New</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
            <Link href="/add" className="flex font-semibold font-[italics] hover:text-[#888840] text-black">
                  Add new product
                  <MenubarShortcut>⌘P</MenubarShortcut>
                </Link> 
              
            </MenubarItem>
            

            {category && session?.user.isAdmin &&  (
                <MenubarItem>
                    <Link href={`/add/categories/`}
                    className="font-semibold font-[italics] hover:text-[#3b3b18] text-black flex">
                      Add new Category
                      <MenubarShortcut>⌘C</MenubarShortcut>

                      </Link>
                </MenubarItem>
                )}
            <MenubarSeparator />
            
          </MenubarContent>
        </MenubarMenu>
        </Menubar>

                )}


              
              
                
      </div>

      <div className='grid w-full h-full gap-8 my-20 lg:grid-cols-4 sm:grid-cols-3 md:grid-cols-3'>
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
              <CardDescription className="catFont text-gray-800">
              {item.desc ? (item.desc.length > 10 ? item.desc.substring(0, 10) + "..." : item.desc) : 
              'Description not available'}
              </CardDescription>}

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
         
            {loading ? 
            
            <Image src="/temporary/p2.png" 
            alt="loading" 
            width={50} 
            height={50} 
            className='animate-spin bg-blend-multiply '/>
            
            : 

            <Button 
            variant="destructive" 
            onClick={() => setPage(prev => prev + 1)}
            disabled={loading}
            
                     >
              Show More
            
          </Button>
          }
        </div>
      )}
    </section>
  );
};

export default ProductsPage;
