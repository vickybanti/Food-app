"use client"
import { userCartStore } from "@/lib/utils/store";
import { ShoppingCartRounded } from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";

const CartIcon = () => {
  useEffect(() => {
    userCartStore.persist.rehydrate()
  },[])
  const {totalItems} = userCartStore()
  return (
    <Link href="/cart" className="flex items-center gap-4 ">
      <div className="relative w-8 h-8 md:w-5 md:h-5">
        <ShoppingCartRounded />
      </div>
      <span className="text-orange-500">{totalItems}</span>
    </Link>
  );
};

export default CartIcon;
