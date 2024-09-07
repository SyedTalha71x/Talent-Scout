import { connectToDB } from "@/utils/db/route";
import User from "@/utils/Models/user-model";
import { NextResponse } from "next/server";


connectToDB();
export async function GET(){
    try{
        const findUsers = await User.find();
        return NextResponse.json(findUsers)
    }
    catch(error: any){
        console.log(error);
        return NextResponse.json({error: 'Internal server error'}, {status: 500})

    }
}