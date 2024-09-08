import { connectToDB } from "@/utils/db/route";
import User from "@/utils/Models/user-model";
import { NextResponse } from 'next/server';

connectToDB();

export async function GET(request: any) {
    try {
        // console.log("API Headers:", request.headers); 
        const userId = request.headers.get('X-User-ID');
        console.log(userId);
        if (!userId) {
            return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
        }

        // Find the user by ID in the database
        const findUser = await User.findById(userId).select("-password"); // Exclude password

        // If the user is not found
        if (!findUser) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Return the user profile
        return NextResponse.json(findUser);
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
