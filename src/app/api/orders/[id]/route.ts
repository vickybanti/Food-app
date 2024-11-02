import Order from "@/lib/database/models/order.model";
import { connectToDb } from "@/lib/utils/connect";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async(req:NextRequest, {params}: {params:{_id:string}}) => {
    const {_id} = params;

    try {
        await connectToDb();

        const body = await req.json()
        await Order.updateOne({ _id},{status:body})
        return new NextResponse("ORDER HAS BEEN UPDATED", {status:200})

    } catch (error) {
        console.log(error)
        return new NextResponse("Something is wrong", {status:500})
    }

}