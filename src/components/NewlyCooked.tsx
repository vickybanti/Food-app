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
        <div className="relative h-full w-full">
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
      <CardContent className="flex flex-col gap-2 p-4">
        {loading ? (
          <Skeleton className="w-3/4 h-6" />
        ) : (
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        )}
        {loading ? (
          <Skeleton className="w-full h-4" />
        ) : (
          <CardDescription className="text-gray-600">
            {desc && desc.length > 50 ? `${desc.substring(0, 50)}...` : desc}
          </CardDescription>
        )}
        <div className="flex items-center gap-2 text-sm">
          {loading ? (
            <Skeleton className="w-10 h-4" />
          ) : (
            <p className="text-primary font-semibold">${price}</p>
          )}
          <span>|</span>
          {loading ? (
            <Skeleton className="w-10 h-4" />
          ) : (
            <p className="text-gray-500">{catSlug}</p>
          )}
        </div>
      </CardContent>

      {/* Footer Section with Drawer */}
      <CardFooter className="flex justify-end">
        <Drawer>
          <DrawerTrigger className="p-2 bg-primary rounded-full hover:bg-primary/90 transition-all">
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
