import Order from "@/lib/database/models/order.model";
import { getAuthSession } from "@/lib/utils/auth";
import { connectToDb } from "@/lib/utils/connect";
import { NextRequest, NextResponse } from "next/server";


//FECTH ALL ORDERS
export const GET = async() => {
    const session = await getAuthSession()

    if(!session) {
        return new NextResponse(
            JSON.stringify({ error: "Not authenticated" }), 
            { status: 401 }
        )
    }

    try {
        await connectToDb();
        
        if(session.user.isAdmin){
            const orders = await Order.find()
            return new NextResponse(JSON.stringify(orders), { status: 200 })
        }

        if (!('email' in session.user)) {
            return new NextResponse(
                JSON.stringify({ error: "User email not found" }), 
                { status: 400 }
            )
        }

        const orders = await Order.find({ userEmail: session.user.email })
        return new NextResponse(JSON.stringify(orders), { status: 200 })
        
    } catch (error) {
        console.error('Error fetching orders:', error)
        return new NextResponse(
            JSON.stringify({ error: "Database operation failed" }), 
            { status: 500 }
        )
    }
}

export const POST = async(req: NextRequest) => {
    const session = await getAuthSession()

    if(!session) {
        return new NextResponse(
            JSON.stringify({ error: "Not authenticated" }), 
            { status: 401 }
        )
    }

    try {
        await connectToDb();
        const body = await req.json()
        console.log(body)
        
        // Create the order directly with the products array
        const order = await Order.create({
            ...body,
            userEmail: session?.user?.email
        })
        return new NextResponse(JSON.stringify(order), { status: 201 })
        
    } catch (error) {
        console.error('Error creating order:', error)
        return new NextResponse(
            JSON.stringify({ 
                error: error instanceof Error ? error.message : "Order creation failed" 
            }), 
            { status: 500 }
        )
    }
}
