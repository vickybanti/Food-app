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
                const orders = await Order.find()
                return new NextResponse(JSON.stringify(orders), {status:200})

            }
            if (session?.user && 'email' in session.user) {
                const orders = await Order.find(
                    {userEmail:session?.user.email}
                );
                return new NextResponse(JSON.stringify(orders), {status:200});
            } else {
                return new NextResponse(
                    JSON.stringify("User email not found"), 
                    {status:400}
                );
            }
        } catch (error) {
            return new NextResponse(
                JSON.stringify("Something went wrong"), 
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
            await connectToDb();
            const body = await req.json()
            if(session.user){
                const order = await Order.create(body)
                return new NextResponse(JSON.stringify(order), {status:200});

            }
           
        } catch (error) {
            return new NextResponse(
                JSON.stringify("Something went wrong"), 
                {status:500})
    
        }
    } else {
        return new NextResponse(
            JSON.stringify("Not authenticated"), 
            {status:401})

    }

    
}
