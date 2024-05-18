import User from "@/lib/models/User";
import { connectDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export const GET = async(req:NextApiRequest) => {
    try {
        const {userId} = auth();
        if (!userId) {
            return new NextResponse("Unauthorized",{status:401})
        }
        await connectDB();
        let user = await User.findOne({clerkId:userId});
        if (!user) {
            user = await User.create({clerkId:userId});
            await user.save();
        }
        return NextResponse.json(user,{status:200})
    } catch (error) {
        console.log('[users_GET',error);
        return new NextResponse("Internal error",{status:500})
        
    }
}