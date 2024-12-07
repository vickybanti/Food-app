import Category from "@/lib/database/models/category.model";
import Product from "@/lib/database/models/products.model";
import Restaurant from "@/lib/database/models/restaurants.model";
import { connectToDb } from "@/lib/utils/connect";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q");

  console.log("Received query:", query); // Log the received query

  if (!query) {
    return new NextResponse(JSON.stringify({ error: "Query parameter 'q' is required" }), { status: 400 });
  }

  try {
    await connectToDb()
    const products = await Product.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { desc: { $regex: query, $options: 'i' } },
        { catSlug: { $regex: query, $options: 'i' } },
      ],
    });

    const categories = await Category.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { desc: { $regex: query, $options: 'i' } },
      ],
    });

    const restaurants = await Restaurant.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { desc: { $regex: query, $options: 'i' } },
      ],
    })

    console.log("Found products:", products.length);
    console.log("Found categories:", categories.length);

    if (products.length === 0 && categories.length === 0) {
      // If no results, log the query used in Prisma
      console.log("Prisma query for products:", Product.find.toString());
      console.log("Prisma query for categories:", Category.find.toString());
    }

    return new NextResponse(JSON.stringify({ products, categories, restaurants }), { status: 200 });
  } catch (error) {
    console.error("Error in search:", error);
    return new NextResponse(JSON.stringify({ error: "Something went wrong" }), { status: 500 });
  }
};
