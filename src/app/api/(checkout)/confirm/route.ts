import Order from "@/lib/database/models/order.model";
import { connectToDb } from "@/lib/utils/connect";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (req: NextRequest) => {
  // Check if params is defined
 
  
  try {
    const { intentId } = await req.json();  // Parsing JSON from request body
    console.log("Intent ID received:", intentId);

    if (!intentId) {
      return new NextResponse(
        JSON.stringify({ message: "Intent ID is missing" }),
        { status: 400 }
      );
    }
    await connectToDb();
    const order = await Order.updateOne({ intentId }, { status: "Being prepared" });

    if (!order) {
      return new NextResponse(
        JSON.stringify({ message: "Order not found" }),
        { status: 404 }
      );
    }

    console.log("Order updated:", order);

    return new NextResponse(
      JSON.stringify({ message: "Order has been updated" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in updating order:", error);

    return new NextResponse(
      JSON.stringify({ message: "Internal Server Error", error }),
      { status: 500 }
    );
  }
};
