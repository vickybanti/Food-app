"use client";

import { toast } from "@/hooks/use-toast";
import { ProductType } from "@/types/types";
import { userCartStore } from "@/lib/utils/store";
import React, { useEffect, useState } from "react";
import Button from "./Button";
import Image from "next/image";
import { motion } from "framer-motion";

const ProCardPrice = ({ product }: { product: ProductType }) => {
  const [total, setTotal] = useState(product.price);
  const [quantity, setQuantity] = useState(1);
  const [selected, setSelected] = useState(0);
  const [message, setMessage] = useState(false);

  const { addToCart } = userCartStore();

  // Prevent hydration issues
  useEffect(() => {
    userCartStore.persist.rehydrate();
  }, []);

  // Calculate total price based on quantity and selected options
  useEffect(() => {
    if (product.options?.length) {
      const additionalPrice = product.options[selected]?.additionalPrice || 0;
      setTotal(quantity * (Number(product.price) + Number(additionalPrice)));
    } else {
      setTotal(quantity * product.price);
    }
  }, [quantity, selected, product]);

  const handleCart = () => {
    addToCart({
      _id: product._id,
      title: product.title,
      price: total,
      img: product.img,
      ...(product.options?.length && { optionTitle: product.options[selected].title }),
      quantity,
    });

    setMessage(true);
    toast({ title: "Added to cart!", description: `${product.title} has been added to your cart.` });
  };

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.75 }}
    >
      <div className="flex flex-col md:flex-row gap-8 w-full">
        {/* Product Image */}
        <div className="relative w-full h-44 md:w-60">
          <Image
            src={product.img || ""}
            alt={product.title}
            fill
            className="object-contain"
          />
        </div>

        {/* Price and Options */}
        <div className="flex flex-col justify-between flex-1 gap-6">
          {/* Total Price */}
          <h2 className="text-2xl font-semibold text-[#741102]">${total.toFixed(2)}</h2>

          {/* Options */}
          {Array.isArray(product.options) && product.options.length > 0 && (
  <div className="flex flex-wrap gap-4">
    {product.options.map((option, index) => (
      <button
        key={option.title}
        className={`min-w-[6rem] px-4 py-2 border rounded-md ${
          selected === index
            ? "bg-gray-800 text-white border-gray-800"
            : "bg-white text-gray-800 border-gray-200"
        } transition-all duration-300`}
        onClick={() => setSelected(index)}
        aria-pressed={selected === index}
      >
        {option.title}
      </button>
    ))}
  </div>
)}

          {/* Quantity and Cart Button */}
          <div className="flex items-center gap-6">
            {/* Quantity Controls */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                className="w-10 h-10 flex items-center justify-center bg-gray-800 text-white rounded-md"
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span className="text-lg font-medium text-[#741102]">{quantity}</span>
              <button
                onClick={() => setQuantity((prev) => Math.min(9, prev + 1))}
                className="w-10 h-10 flex items-center justify-center bg-gray-800 text-white rounded-md"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            {/* Add to Cart Button */}
            <Button
              type="button"
              title={message ? "Added to Cart" : "Add to Cart"}
              variant="btn_white"
              full
              bg="bg-[#042D29]"
              hover
              onClick={handleCart}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProCardPrice;
