import Product from "@/lib/database/models/products.model";
import { connectToDb } from "@/lib/utils/connect";
import { NextRequest, NextResponse } from "next/server";


//FECTH ALL CATEGORIES
export const GET = async(req:NextRequest) => {
    const {searchParams} = new URL(req.url)
    const cat = searchParams.get("cat")
    const page = searchParams.get("page") || "1"
    const limit = searchParams.get("limit") || "6"

    try {
        await connectToDb();
        const query = cat ? { catSlug: cat } : {};
        const products = await Product.find(query)
            .limit(parseInt(limit))
            .skip((parseInt(page) - 1) * parseInt(limit));

        const count = await Product.countDocuments(query);

        return new NextResponse(
            JSON.stringify({
                products,
                count,
                hasMore: parseInt(page) * parseInt(limit) < count
            }),
            {status:200}
        )
    } catch (error) {
        console.error(error);
        return new NextResponse(
            JSON.stringify({ error: "Something went wrong" }),
            {status:500}
        )
    }
}



export const POST = async(req:NextRequest) => {
    try {
        await connectToDb();
        const body = await req.json()
        const product = await Product.create(body)
        return new NextResponse(JSON.stringify(product), {status:201})
    } catch (error) {
        console.error(error);
        return new NextResponse(
            JSON.stringify({ error: "Something went wrong" }),
            {status:500}
        )
    }
}
