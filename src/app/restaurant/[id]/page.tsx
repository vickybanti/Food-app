"use client";

import { Address } from "@/components/Address";
import CartIcon from "@/components/CartIcon";
import ProCard from "@/components/ProCard";
import { userCartStore } from "@/lib/utils/store";
import { DeleteSweepSharp, NightsStay, Timelapse } from "@mui/icons-material";
import { Divider, Skeleton, ListItem, Box, List } from "@mui/material";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button } from "../../../components/ui/button";
import Link from "next/link";

const Page = ({ params }: { params: { id: string } }) => {
  const { products, totalItems, totalPrice, removeFromCart } = userCartStore();

  const { id } = params;

  const { data: session } = useSession();
  const router = useRouter();

  const userEmail = session?.user?.email;

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          price: totalPrice,
          products,
          status: "Not paid",
          userEmail: userEmail,
          totalAmount: totalPrice,
          intentId: "pending",
        }),
      });
      const getData = await res.json();
      setLoading(false);
      router.push(`/pay/${getData._id}`);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const [options, setOptions] = useState("");
  const handleOptionChange = (catSlug: string) => setOptions(catSlug);

  const [allProduct, setProduct] = useState<any>({});
  const [pickup, setPickup] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/products/restaurants/${id}`,
        {
          method: "GET",
          cache: "no-store",
        }
      );
      let data = await res.json();

      if (data && Array.isArray(data.products)) {
        if (options.length > 0) {
          data.products.sort((a: { catSlug: string }, b: { catSlug: string }) =>
            a.catSlug.localeCompare(b.catSlug)
          );
        }
        setProduct(data);
      } else {
        console.error(
          "Expected data to be an object with a products array, but got:",
          data
        );
      }
      setLoading(false);
    };
    getProduct();
  }, [id]);

  const uniqueCategories = Array.from(
    new Set(allProduct.products?.map((pro: any) => pro.catSlug))
  );

  return (
    <div className="relative flex flex-col lg:flex-row justify-between px-4 sm:px-6 md:px-8 mx-auto my-10 lg:my-20 max-w-[1200px]">
      {/* Main Section */}
      <div className="w-full lg:w-[70%] mt-3 lg:mr-10">
        {/* Restaurant Banner */}
        <div className="relative flex flex-col h-40 sm:h-60 rounded-lg overflow-hidden">
          {loading ? (
            <Skeleton className="w-full h-full" />
          ) : (
            <Image
              src={allProduct.img}
              fill
              alt={allProduct.name}
              className="object-cover"
            />
          )}
          {!allProduct.open && (
            <div className="absolute inset-0 bg-black bg-opacity-70 text-white flex items-center justify-center">
              <p className="font-semibold text-lg sm:text-xl">
                {loading ? (
                  <Skeleton className="w-20 h-5" />
                ) : (
                  `Opens ${allProduct.openTime}`
                )}
              </p>
            </div>
          )}
        </div>

        {/* Restaurant Info */}
        <div className="flex flex-col sm:flex-row justify-between mt-4">
          <h1 className="text-xl sm:text-2xl font-bold">
            {loading ? <Skeleton className="w-40 h-6" /> : allProduct.name}
          </h1>
          <span className="text-gray-700">
            Min. Order: $
            {loading ? <Skeleton className="w-16 h-5" /> : allProduct.lowestPrice}
          </span>
        </div>

        {/* Opening Hours */}
        <div className="flex justify-between items-center mt-4">
          {allProduct.open ? (
            <p className="text-sm text-gray-600">
              <Timelapse sx={{ color: "greenyellow" }} />
              {loading ? (
                <Skeleton className="w-40 h-5" />
              ) : (
                `${allProduct.openTime} - ${allProduct.closingTime}`
              )}
            </p>
          ) : (
            <p className="text-sm text-gray-600">Closed</p>
          )}
        </div>

        {/* Categories */}
        <div className="flex overflow-x-auto space-x-2 mt-6">
          <button
            onClick={() => handleOptionChange("")}
            className="px-3 py-1 bg-gray-200 rounded-md"
          >
            All
          </button>
          {uniqueCategories.map((catSlug: any) => (
            <button
              key={catSlug}
              onClick={() => handleOptionChange(catSlug)}
              className={`px-3 py-1 rounded-md ${
                options.includes(catSlug)
                  ? "bg-green-200"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {loading ? <Skeleton className="w-16 h-5" /> : catSlug}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
          {allProduct.products
            ?.filter(
              (pro: any) => options.length === 0 || options.includes(pro.catSlug)
            )
            .map((pro: any) => (
              <ProCard
                key={pro._id}
                item={pro}
                loading={loading}
                href={`/product/${pro._id}`}
                img={pro.img}
                title={pro.title}
                desc={pro.desc}
                price={pro.price}
                catSlug={pro.catSlug}
              />
            ))}
        </div>
      </div>

      {/* Cart Sidebar */}
      <div className="sticky top-0 w-full lg:w-96 mt-10 lg:mt-0 flex-shrink-0">
        <h2 className="text-lg font-bold">Your Cart</h2>
        <List>
          {products.length === 0 ? (
            <h1 className="p-6 text-center text-gray-500">No items in cart</h1>
          ) : (
            products.map((item) => (
              <ListItem
                key={item._id}
                className="flex justify-between items-center"
              >
               <Image
  src={item.img || "/placeholder-image.jpg"} // Replace with your placeholder image path
  alt={item.title || "Product Image"}
  width={50}
  height={50}
  className="rounded-md"
/>
                <div className="flex-1 ml-4">
                  <h1 className="font-semibold">{item.title}</h1>
                  <p className="text-gray-500 text-sm">{item.optionTitle}</p>
                  <p className="text-gray-500 text-sm">Qty: {item.quantity}</p>
                </div>
                <h2 className="font-bold">${item.price}</h2>
                <button onClick={() => removeFromCart(item)}>
                  <DeleteSweepSharp sx={{ color: "red" }} />
                </button>
              </ListItem>
            ))
          )}
        </List>
        <Divider className="my-4" />
        <div className="flex flex-col gap-4">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>${totalPrice}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery:</span>
            <span>FREE!</span>
          </div>
          <Button
            onClick={handleCheckout}
            className="w-full bg-green-500 text-white py-2 rounded-md"
          >
            Checkout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;