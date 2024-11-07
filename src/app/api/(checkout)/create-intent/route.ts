import Order from "@/lib/database/models/order.model";
import { connectToDb } from "@/lib/utils/connect";
import { NextResponse } from "next/server";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export const POST = async (req: Request) => {
  try {
    await connectToDb()
    const { orderId } = await req.json();  // Parsing the incoming JSON request
    console.log("Received order ID:", orderId);

    if (!orderId) {
      return new NextResponse(JSON.stringify({ message: "Order ID is missing" }), { status: 400 });
    }

    // Fetch the order from Prisma
    const order = await Order.findById(orderId);

    console.log("Order fetched:", order);

    if (!order) {
      return new NextResponse(JSON.stringify({ message: "Order not found" }), { status: 404 });
    }

    // Create Stripe Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 100 * 100,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    });

    console.log("PaymentIntent created:", paymentIntent);

    // Update the order with the Payment Intent ID
    await Order.findByIdAndUpdate( orderId, { intentId: paymentIntent.id });

    console.log("Order updated with Payment Intent ID:", paymentIntent.id);

    // Send back the client secret
    return new NextResponse(
      JSON.stringify({ clientSecret: paymentIntent.client_secret }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error occurred in create-intent API:", error);

    // Handling specific Stripe errors if they occur
    if (error instanceof stripe.errors.StripeInvalidRequestError) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid request to Stripe API",  error }),
        { status: 400 }
      );
    }

    // General error handling
    return new NextResponse(JSON.stringify({ message: "Internal Server Error",  error }), { status: 500 });
  }
};
