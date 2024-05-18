import User from "@/lib/models/User";
import { connectDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export const POST = async(req:NextRequest) => {
    try {
        const {userId} = auth();
        if (!userId) {
            return new NextResponse("Unauthorized",{status:401})
        }
        await connectDB();
        let user = await User.findOne({clerkId:userId});
        if (!user) {
            return new NextResponse("User not found",{status:404})
        }
        const {productId} = await req.json();
        if (!user) {
            return new NextResponse("productId is required",{status:400})
        }
        const isLiked = user.wishlist.includes(productId);
        if (isLiked) {
            user.wishlist = user.wishlist.filter((id:string) => id !== productId);
        }
        else{
            user.wishlist.push(productId)
        }
        await user.save();
        return NextResponse.json(user,{status:200})
    } catch (error) {
        console.log('[whishlist_POST',error);
        return new NextResponse("Internal server error",{status:500})
    }
}