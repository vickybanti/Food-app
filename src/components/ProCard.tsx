import React from 'react'
import { Add } from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
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
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Skeleton } from "@mui/material";

const ProCard = ({item,loading,href,img,title,desc,price,catSlug}:{item:any,loading:boolean,href:string,img:string,title:string,desc:string,price:string,catSlug:string}) => {
  return (
    
    
<Card key={item._id} className="card shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-1px_rgba(0,0,0,0.06)] lg:w-[350px] lg:h-[350px] mx-auto">
<CardHeader className="cardHeader lg:w-full lg:h-[250px] p-0 ">
 
    <div className="relative h-60 lg:w-full cardImage">
      {loading ? (<Skeleton className="w-full h-full rounded-full"/>):
      <Link href={href}>
      
      <Image 
        src={`${img}`} 
        alt="" 
        fill 
        className="object-contain"
        />
      
      </Link>
}

    
    </div>

</CardHeader>
<CardContent className="flex flex-col gap-2 p-4 text-black mt-[-20px]">
  {loading ? (<Skeleton className="w-10 h-4"/>):
  <CardDescription className="font-semibold text-black text-xl cardTitle">{title}</CardDescription>}
  {loading ? (<Skeleton className="w-10 h-4"/>) :
  <CardDescription className="catFont text-gray-800">
    {desc ? (desc.length > 50 ? desc.substring(0, 45) + "..." : desc) : 
    'Description not available'}
    </CardDescription>
}



  <div className="flex gap-4">
  {loading ? (<Skeleton className="w-8 h-4"/>):
  <p className="font-bold text-[#741102] priceFont">${price}</p> } | {loading ? (<Skeleton className="w-10 h-4"/>): 
  <p className="text-gray-500 catFont">{catSlug}</p>}
  </div>
 
</CardContent>
<CardFooter className="flex justify-between">
  <div></div>
  <span className="mt-[-60px] cartAddSpan">
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
    

  )
}

export default ProCard

