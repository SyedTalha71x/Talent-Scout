import { NextResponse } from "next/server";
import Recuiter from "@/utils/Models/recuiter-model";
import {connectToDB} from "@/utils/db/route";

export const GET = async (request: any) => {
    try 
    {
        await connectToDB();
        const recuiters = await Recuiter.find();
        return NextResponse.json({ recuiters }, { status: 200 })
    }
    catch (error: any) {
        console.log(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }

}