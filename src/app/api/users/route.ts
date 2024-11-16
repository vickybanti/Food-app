import { NextRequest } from "next/server";

import User from "@/lib/database/models/user.model";
import { connectToDb } from "@/lib/utils/connect";

import { NextResponse } from "next/server";

export const GET = async(req:NextRequest) => {
    try {
        await connectToDb();
        const allUsers = await User.find();
        console.log("allusers", allUsers)
        return new NextResponse(JSON.stringify(allUsers))
    } catch (error) {
        console.log(error)
        return new NextResponse(
            JSON.stringify("Somethong went wrong"), 
            {status:200})
  
    }
    return new NextResponse("Hello", {status:200})
  
  }


  export const PUT = async (req: Request) => {
    try {
      await connectToDb();
      const { body } = await req.json();  // Ensure this line is correct
      console.log("Received body:", body); // Check what is logged here
  
      const city = body.city;
      const street = body.street;
      const country = body.country;
      const phoneNumber = body.phoneNumber;
      const userId = body.id
      const email = body.userEmail
  
  
      
      // Fetch the user from the database
      const allUser = await User.findOne( {email:email} );
  
      console.log("User fetched:", allUser);
  
      if (!allUser) {
        return new NextResponse(JSON.stringify({ message: "user not found" }), { status: 404 });
      }
      if(allUser){
        const userId = allUser._id
      
  
      const updatedAddress = await User.findByIdAndUpdate(userId, { city:city, street:street, country:country, phoneNumber:phoneNumber});
  
      if(updatedAddress){
        console.log("Successfully updated address:", body);
        return new NextResponse(
            JSON.stringify(updatedAddress),
            { status: 200 }
          )
      }
  
      // Send back the updated address
      
    }
    } catch (error) {
      console.error("Error processing request:", error);
      return new NextResponse(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
    }
  }