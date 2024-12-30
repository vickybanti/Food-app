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
import ProCardPrice from './ProCardPrice';

const NewCooked = ({item,loading,href,img,title,desc,price,catSlug}:{item:any,loading:boolean,href:string,img:string,title:string,desc:string,price:string,catSlug:string}) => {
  return (
    
    
<Card key={item._id} className="shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-1px_rgba(0,0,0,0.06)] newcookedcard">
<CardHeader className="w-[100%] h-[200px] p-4 ">
 
    <div className="relative h-[200px] w-full">
      {loading ? (<Skeleton className="w-56 h-40 rounded-full"/>):
      <Link href={href}>
      
      <Image 
        src={`${img}`} 
        alt="" 
        fill 
        className="object-cover rounded-sm md:object-contain"
        />
      
      </Link>
}

    
    </div>

</CardHeader>
<CardContent className="flex flex-col gap-2 p-4 text-black mt-[-30px]">
  {loading ? (<Skeleton className="w-10 h-8"/>):
  <CardDescription className="text-xl text-black cardTitle">{title}</CardDescription>}
  {loading ? (<Skeleton className="w-10 h-8"/>) :
  <CardDescription className="font-thin text-gray-800 catFont">
    {desc ? (desc.length > 50 ? desc.substring(0, 45) + "..." : desc) : 
    'Description not available'}
    </CardDescription>
}



  <div className="flex gap-4">
  {loading ? (<Skeleton className="w-10 h-4"/>):
  <p className="font-thin text-[#741102] priceFont">${price}</p> } | {loading ? (<Skeleton className="w-10 h-4"/>): 
  <p className="text-gray-500 catFont">{catSlug}</p>}
  </div>
 
</CardContent>
<CardFooter className="flex justify-between">
  <div></div>
  <span className="mt-[-130px] ">
    <Drawer>
      <DrawerTrigger className="mt-[-860px] p-2 bg-[#042d29] rounded-full hover:bg-[#042d29]/90 transition-colors">
        <Add fontSize="large" className="text-white"/>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="flex flex-col gap-2 mx-auto">
          <DrawerTitle className='font-thin'>
            <ProCardPrice product={item}/>
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

export default NewCooked;

