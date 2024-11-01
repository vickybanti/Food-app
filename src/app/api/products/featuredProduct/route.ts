import Product from "@/lib/database/models/products.model"
import { connectToDb } from "@/lib/utils/connect"
import { NextRequest, NextResponse } from "next/server"

export const GET = async(req:NextRequest) => {
    const {searchParams} = new URL(req.url)
    const cat = searchParams.get("cat")

    try {
        await connectToDb();
        const products = await Product.find({ isFeatured: true })
        return new NextResponse(JSON.stringify(products), { status: 200 })
    } catch (error) {
        console.log(error)
        return new NextResponse(
            JSON.stringify("Something went wrong"), 
            { status: 500 }
        )
    }
}