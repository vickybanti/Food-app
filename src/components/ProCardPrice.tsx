"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ProductType } from "@/types/types";
import { userCartStore } from "@/lib/utils/store";
import React, { useEffect, useState } from "react";
import Button from "./Button";
import Image from "next/image";
import { motion } from "framer-motion";
import { Terminal } from "@mui/icons-material";

const ProCardPrice = ({ product }: { product: ProductType }) => {
  const [total, setTotal] = useState(product.price);
  const [quantity, setQuantity] = useState(1);
  const [selected, setSelected] = useState(0);
  const [message, setMessage] = useState(false);

  const { addToCart, products, removeFromCart } = userCartStore();

  // Rehydrate store on mount
  useEffect(() => {
    userCartStore.persist.rehydrate();
  }, []);

  // Update total price when quantity or selected options change
  useEffect(() => {
    if (product.options?.length) {
      const additionalPrice = product.options[selected]?.additionalPrice || 0;
      setTotal(quantity * (Number(product.price) + Number(additionalPrice)));
    } else {
      setTotal(quantity * product.price);
    }
  }, [quantity, selected, product]);

  // Add product to cart
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
    <Alert>
    <Terminal className="w-4 h-4" />
    <AlertTitle>{product.title} added to cart</AlertTitle>
    
  </Alert>
  

    // Reset message after 3 seconds
  };

  const removeCart = () => {
    const productInCart = products.find((pro: any) => pro._id === product._id);
    if (productInCart) {
      removeFromCart(productInCart);
      setMessage(false);
<Alert>
    <Terminal className="w-4 h-4" />
    <AlertTitle>{product.title} removed from cart</AlertTitle>
    
  </Alert>    }

  };

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.75 }}
    >
      <div className="flex flex-col w-full gap-8 md:flex-row">
        {/* Product Image */}
        <div className="relative w-full h-44 md:w-60">
          <Image
            src={product.img || "/placeholder.jpg"}
            alt={product.title || "Product Image"}
            fill
            className="object-contain rounded-md"
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
                className="flex items-center justify-center w-10 h-10 text-white bg-gray-800 rounded-md"
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span className="text-lg font-medium text-[#741102]">{quantity}</span>
              <button
                onClick={() => setQuantity((prev) => Math.min(9, prev + 1))}
                className="flex items-center justify-center w-10 h-10 text-white bg-gray-800 rounded-md"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            {/* Add to Cart Button */}
            {message ? (
              <Button
                type="button"
                title="Remove from Cart"
                variant="btn_white"
                full
                bg="bg-[#042D29]"
                hover
                onClick={removeCart}
              />
            ) : (
              <Button
                type="button"
                title="Add to Cart"
                variant="btn_white"
                full
                bg="bg-[#042D29]"
                hover
                onClick={handleCart}
              />
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProCardPrice;
