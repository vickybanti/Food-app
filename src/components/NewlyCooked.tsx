import React from "react";
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
} from "@/components/ui/card";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "./ui/button";
import { Skeleton } from "@mui/material";
import ProCardPrice from "./ProCardPrice";

const NewCooked = ({
  item,
  loading,
  href,
  img,
  title,
  desc,
  price,
  catSlug,
  className = "", // Accept className prop for external styling
}: {
  item: any;
  loading: boolean;
  href: string;
  img: string;
  title: string;
  desc: string;
  price: string;
  catSlug: string;
  className?: string;
}) => {
  return (
    <Card
      key={item._id}
      className={`relative shadow-lg rounded-lg overflow-hidden newcookedcard ${className}`}
    >
      {/* Header with Image */}
      <CardHeader className="w-full h-[200px] p-4">
        <div className="relative w-full h-full">
          {loading ? (
            <Skeleton className="w-full h-full rounded-lg" />
          ) : (
            <Link href={href}>
              <Image
                src={img}
                alt={title || "Product Image"}
                fill
                className="object-cover rounded-sm"
              />
            </Link>
          )}
        </div>
      </CardHeader>

      {/* Content Section */}
      <CardContent className="flex flex-col gap-2 p-1">
        <div className="flex justify-between w-1/2 mt-1">
        {loading ? (
          <Skeleton className="w-3/4 h-6" />
        ) : (
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        )}
   <span>|</span>
{loading ? (
            <Skeleton className="w-10 h-4" />
          ) : (
            <p className="mt-1 font-semibold text-primary">${price}</p>
          )}
         </div>
        {loading ? (
          <Skeleton className="w-full h-4" />
        ) : (
          <CardDescription className="text-gray-600">
            {desc && desc.length > 50 ? `${desc.substring(0, 50)}...` : desc}
          </CardDescription>
        )}
       
      </CardContent>

      {/* Footer Section with Drawer */}
      <CardFooter className="flex justify-end mt-[-88px]">
        <Drawer>
          <DrawerTrigger className="p-2 transition-all rounded-full bg-primary hover:bg-primary/90">
            <Add fontSize="large" className="text-white" />
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader className="flex flex-col items-center gap-2">
              <DrawerTitle>
                <ProCardPrice product={item} />
              </DrawerTitle>
            </DrawerHeader>
            <DrawerFooter>
              <DrawerClose>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </CardFooter>
    </Card>
  );
};

export default NewCooked;
