import { getAuthSession } from "@/lib/utils/auth";
import { connectToDb } from "@/lib/utils/connect";
import { NextRequest, NextResponse } from "next/server";
import Product from "@/lib/database/models/products.model"

export const GET = async(req:NextRequest, {params}: {params:{id:string}}) => {
    const {id} = params;

    try {
        await connectToDb();
        const product = await Product.findById({_id:id})
        console.log(product)
        return new NextResponse(JSON.stringify(product), {status:200})

    } catch (error) {
        console.log(error)
        return new NextResponse("Something is wrong", {status:500})

    }

}



export const DELETE = async(req:NextRequest, {params}: {params:{id:string}}) => {
    const {id} = params;
    const session = await getAuthSession()

    if(session?.user.isAdmin){



    try {
        await connectToDb();

        await Product.findByIdAndDelete({_id:id});
        return new NextResponse(JSON.stringify({message:"Product has been deleted"}), {status:200})

    } catch (error) {
        console.log(error)
        return new NextResponse("Something went wrong", {status:500})
    }

}else {
    return new NextResponse(JSON.stringify({message:"You're not allowed"}), {status:401})

}
}