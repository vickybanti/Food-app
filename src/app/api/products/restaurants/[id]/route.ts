import Restaurant from "@/lib/database/models/restaurants.model";
import Product from "@/lib/database/models/products.model";
import { connectToDb } from "@/lib/utils/connect";
import mongoose from "mongoose";

import { NextRequest } from "next/server";

import { NextResponse } from "next/server";

export const GET = async(req:NextRequest, {params}: {params:{id:string}}) => {
    const {id} = params;
    console.log("id=",id)
    try {
        await connectToDb();
        const restaurants = await Restaurant.findById({_id:id });
        console.log(restaurants)
        return new NextResponse(JSON.stringify(restaurants), { status: 200 });
    } catch (error) {
        console.error(error);
    }
}

export const PUT = async(req:NextRequest, {params}: {params:{id:string}}) => {
    const {id} = params;
    console.log("updated id", id)

    try {
        await connectToDb();

        const {productData} = await req.json()

        console.log(productData)

        const products = productData.map((prod: any) => ({
               _id: new mongoose.Types.ObjectId(),
               title: prod.title,
               img: prod.img,
               desc: prod.desc,
               price: prod.price,
               catSlug: prod.catSlug,
               isFeatured: prod.isFeatured,
               options: prod.options.map((opt: any) => ({
                   _id: opt._id ? new mongoose.Types.ObjectId(opt._id) : new mongoose.Types.ObjectId(),
                   title: opt.title,
                   additionalPrice: opt.additionalPrice
               })) || []
           }));

        const restaurant = await Restaurant.findByIdAndUpdate(
            {_id: id},
            {$addToSet: {products: {$each: products}}},
            {new: true}
        );

        await Product.insertMany(products); 

        return new NextResponse(JSON.stringify(restaurant), { status: 200 });

    } catch (error) {
        console.log(error)
        return new NextResponse("Something is wrong", {status:500})
    }
}
