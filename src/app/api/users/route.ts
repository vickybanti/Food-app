import { NextRequest } from "next/server";

import User from "@/lib/database/models/user.model";
import { connectToDb } from "@/lib/utils/connect";
const bcrypt = require("bcrypt");


import { NextResponse } from "next/server";
import mongoose from "mongoose";

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

  export const POST = async(req:NextRequest) => {
    try {
        const body = await req.json();
        console.log("Request body:", body); // Log the request body for debugging

        const { email, firstName, lastName, password } = body; // Destructure the body

        // Validate required fields
        if (!email || !firstName || !lastName || !password) {
            return new NextResponse(
                JSON.stringify({ message: "All fields are required" }),
                { status: 400 } // Bad Request
            );
        }

        await connectToDb();
        const user = await User.findOne({ email: email });

        if (user) {
            return new NextResponse(
                JSON.stringify({ message: "User already exists" }),
                { status: 409 } // Conflict
            );
        }

        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const bcryptPassword = await bcrypt.hash(password, salt);

        const res = await User.create({
            _id: new mongoose.Types.ObjectId(),
            email: email,
            firstName: firstName,
            lastName: lastName,
            password: bcryptPassword
        });

        if (res) {
            return new NextResponse(
                JSON.stringify(res),
                { status: 201 } // Created
            );
        }

    } catch (error) {
        console.error("Error adding user:", error);
        return new NextResponse(
            JSON.stringify({ message: "Internal Server Error" }),
            { status: 500 } // Internal Server Error
        );
    }
  }