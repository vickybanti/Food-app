import { prisma } from "@/lib/utils/connect";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q");

  console.log("Received query:", query); // Log the received query

  if (!query) {
    return new NextResponse(JSON.stringify({ error: "Query parameter 'q' is required" }), { status: 400 });
  }

  try {
    const products = await prisma.product.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { desc: { contains: query, mode: 'insensitive' } },
          { catSlug: { contains: query, mode: 'insensitive' } },
        ],
      },
    });

    const categories = await prisma.category.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { desc: { contains: query, mode: 'insensitive' } },
        ],
      },
    });

    console.log("Found products:", products.length);
    console.log("Found categories:", categories.length);

    if (products.length === 0 && categories.length === 0) {
      // If no results, log the query used in Prisma
      console.log("Prisma query for products:", prisma.product.findMany.toString());
      console.log("Prisma query for categories:", prisma.category.findMany.toString());
    }

    return new NextResponse(JSON.stringify({ products, categories }), { status: 200 });
  } catch (error) {
    console.error("Error in search:", error);
    return new NextResponse(JSON.stringify({ error: "Something went wrong" }), { status: 500 });
  }
};
