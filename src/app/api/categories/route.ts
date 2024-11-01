import { connectToDb } from "@/lib/utils/connect";
import Category from "@/lib/database/models/category.model";
import { NextRequest, NextResponse } from "next/server";


//FECTH ALL CATEGORIES
export const GET = async() => {

    try {
        await connectToDb();
        const allCategories = await Category.find();
        return new NextResponse(JSON.stringify(allCategories))
    } catch (error) {
        console.log(error)
        return new NextResponse(
            JSON.stringify("Somethong went wrong"), 
            {status:200})

    }
    return new NextResponse("Hello", {status:200})

}

export const POST = async(req:NextRequest) => {
    try {
        await connectToDb();
        const body = await req.json()
        const categoryData = {
            title: body.title,
            slug: body.slug,
            img: body.img,
            desc:body.desc,
        }
        
        const cat = await Category.create(categoryData)
        return new NextResponse(JSON.stringify(cat), {status:201})
    } catch (error) {
        console.log(error)
        return new NextResponse(
            JSON.stringify("Something went wrong"),
            {status:500})
    }
}
