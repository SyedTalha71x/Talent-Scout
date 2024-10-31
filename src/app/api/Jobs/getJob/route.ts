import Job from "@/utils/Models/job-model";
import { connectToDB } from "@/utils/db/route";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: any) => {
  
    try {
        await connectToDB();
        const fetchdata = await Job.find();
        return NextResponse.json({ jobs: fetchdata})
    }
    catch (error: any) {
        console.log(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
