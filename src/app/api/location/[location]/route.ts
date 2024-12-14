import Restaurant from "@/lib/database/models/restaurants.model";
import Product from "@/lib/database/models/products.model";
import { connectToDb } from "@/lib/utils/connect";
import mongoose from "mongoose";

import { NextRequest } from "next/server";

import { NextResponse } from "next/server";

export const GET = async(req: NextRequest, {params}: {params: {location: string}}) => {
    const {location} = params;

    console.log("location=", location);
    try {
        await connectToDb();
        const restaurants = await Restaurant.find({ location });
        console.log(restaurants);
        return new NextResponse(JSON.stringify(restaurants), { status: 200 });
    } catch (error) {
        console.error(error);
    }
}
