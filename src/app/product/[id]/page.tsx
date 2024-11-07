"use client"
import DeleteButton from "@/components/DeleteButton";
import Price from "@/components/Price";
import { Skeleton } from "@/components/ui/skeleton";
import { ProductType } from "@/types/types";
import Image from "next/image";
import React, { useState, useEffect } from "react";

const getData = async (id: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/products/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("failed");
  }
  return res.json();
}
const SingleProductPage = ({ params }: { params: { id: string } }) => {
  const [singleProduct, setSingleProduct] = useState<ProductType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const product = await getData(params.id);
        setSingleProduct(product);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id]);

  if (loading) return <Skeleton />; // Show a loading state

  return (
    <div className="relative flex flex-col justify-around h-screen p-4 text-red-500 mt-14 lg:px-20 xl:px-40 md:flex-row md:gap-8 md:items-center" key={singleProduct?._id}>
      {/* IMAGE CONTAINER */}
      {singleProduct?.img && (
        <div className="relative w-full h-1/2 md:h-[70%]">
          <Image
            src={singleProduct.img}
            alt=""
            className="object-contain"
            fill
          />
        </div>
      )}
      {/* TEXT CONTAINER */}
      <div className="pr-12 h-1/2 flex flex-col gap-4 md:h-[70%] md:justify-center md:gap-6 xl:gap-8">
        {singleProduct && (
          <>
            <h1 className="text-3xl font-bold text-black uppercase xl:text-5xl ">{singleProduct.title}</h1>
            <p className="text-gray-800">{singleProduct.desc}</p>
            <Price product={singleProduct} />
          </>
        )}
      </div>
      <div className="flex ml-24">
        {singleProduct && <DeleteButton id={singleProduct._id} />}
      </div>
    </div>
  );
};

export default SingleProductPage;
