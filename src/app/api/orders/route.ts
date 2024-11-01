import Order from "@/lib/database/models/order.model";
import { getAuthSession } from "@/lib/utils/auth";
import { connectToDb } from "@/lib/utils/connect";
import { NextRequest, NextResponse } from "next/server";


//FECTH ALL ORDERS
export const GET = async() => {

    const session = await getAuthSession()

   

    if(session) {
        try {
            await connectToDb();
            if(session.user.isAdmin){
                const orders = await Order.findMany()
                return new NextResponse("ok", {status:200})

            }
            const orders = await Order.findMany({
                where:{
                    userEmail: session.user.email ?? undefined
                }
            })
            return new NextResponse(JSON.stringify(orders),{status:200})
        } catch (error) {
            return new NextResponse(
                JSON.stringify("Somethong went wrong"), 
                {status:500})
    
        }
    } else {
        return new NextResponse(
            JSON.stringify("Not authenticated"), 
            {status:401})

    }

    
}

export const POST = async(req:NextRequest) => {
    const session = await getAuthSession()

    if(session) {
        try {
            const body = await req.json()
            if(session.user){
                await connectToDb();
                const order = await Order.create({
                    data:body
                })
                return new NextResponse(JSON.stringify(order), {status:200});

            }
           
        } catch (error) {
            return new NextResponse(
                JSON.stringify("Somethong went wrong"), 
                {status:500})
    
        }
    } else {
        return new NextResponse(
            JSON.stringify("Not authenticated"), 
            {status:401})

    }

    
}
