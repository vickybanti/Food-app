import Category from "@/lib/database/models/category.model";
import { connectToDb } from "@/lib/utils/connect";

import { NextRequest, NextResponse } from "next/server";

export const GET = async(request: NextRequest, {params}: {params: {slug: string}}) => {
    const {slug} = params;
    try {
        await connectToDb();
        const allCategories = await Category.find({
            parentCategory: slug
        }).populate('products');
        
        return new NextResponse(JSON.stringify(allCategories))
    } catch (error) {
        console.log(error)
        return new NextResponse(
            JSON.stringify("Something went wrong"), 
            {status: 500}
        )
    }
}