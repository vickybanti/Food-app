import Restaurant from "@/lib/database/models/restaurants.model";
import { connectToDb } from "@/lib/utils/connect";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";


export const GET = async(req:NextRequest,{params}: {params:{id:string}}) => {
   const {id} = params;
    try {
        await connectToDb();
        const restaurant = await Restaurant.findById({_id:id}).populate('products');
        console.log(restaurant)
        return new NextResponse(JSON.stringify(restaurant), { status: 200 });
    } catch (error) {
        console.error(error);
        return new NextResponse("Error fetching restaurant", { status: 500 });
    }   
}