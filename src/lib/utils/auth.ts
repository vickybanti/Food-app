import NextAuth, { getServerSession, NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook";
import { connectToDb } from "./connect"
import { PrismaAdapter } from "@auth/prisma-adapter"
import User from "../database/models/user.model";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      isAdmin: boolean;
    }
  }
}

declare module "next-auth/jwt"{
  interface JWT{
    
      isAdmin:Boolean;
    
  }
}

export const authOptions:NextAuthOptions = {
    // Configure one or more authentication providers
   
    session:{
    strategy:"jwt"
},
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_ID!,
        clientSecret: process.env.GOOGLE_SECRET!,
        httpOptions: {
          timeout: 10000, // 10 seconds
        },
      
      
      }),

      FacebookProvider({
        clientId: process.env.FACEBOOK_CLIENT_ID!,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
        httpOptions: {
          timeout: 10000, // 10 seconds
        },
      })
      
      // ...add more providers here
    ],
    callbacks:{
      async session({token, session}) {
        if(token){
          session.user.isAdmin = Boolean(token.isAdmin)
        }
        return session
      },
      async jwt({token}) {
        await connectToDb();
        const userInDb = await User.findOne({
          email:token.email!
        })
        token.isAdmin=userInDb?.isAdmin!
        return token
       
        },
      async signIn({ user, account, profile }) {
        try {
          await connectToDb();
          
          // Check if user already exists
          const existingUser = await User.findOne({ email: user.email });
          
          if (!existingUser) {
            // Create new user if doesn't exist
            await User.create({
              email: user.email,
              name: user.name,
              image: user.image,
              isAdmin: false,
              city:"pending",
              country:"pending",
              street:"pending",
              phoneNumber:"000 000 000" // Set default admin status

            });
          }
          
          return true;
        } catch (error) {
          console.error("Error during sign in:", error);
          return false;
        }
      }
    }
  }
  
  export const getAuthSession = () => getServerSession(authOptions)
