import Order from "@/lib/database/models/order.model";
import { connectToDb } from "@/lib/utils/connect";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async(req:NextRequest, {params}: {params:{id:string}}) => {
    const {id} = params;
    console.log("updated id", id)

    try {
        await connectToDb();

        const body = await req.json()
        console.log(body)
        await Order.updateOne({...body, status:"Paid,Being prepared" },{status:201})
        return new NextResponse("ORDER HAS BEEN UPDATED", {status:200})

    } catch (error) {
        console.log(error)
        return new NextResponse("Something is wrong", {status:500})
    }

}