import Notification from "@/utils/Models/notification-model";
import { connectToDB } from "@/utils/db/route";
import { NextResponse } from "next/server";


export async function POST(request: any){
    try{
        await connectToDB();

        await Notification.updateMany({}, {$set: {readAll: 1}})

        return NextResponse.json({message: 'Successfully read all notification'}, {status: 200})

    }
    catch(error: any){
        console.log(error);
        return NextResponse.json({error: 'Internal Server Error'}, {status: 500})
    }

}