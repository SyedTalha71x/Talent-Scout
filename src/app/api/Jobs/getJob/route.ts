import Job from "@/utils/Models/job-model";
import { connectToDB } from "@/utils/db/route";
import { NextRequest, NextResponse } from "next/server";
import { cors } from '@/lib/cors'

export const GET = async (request: any) => {
    const corsHeaders = cors(request)
  
    try {
        await connectToDB();
        const fetchdata = await Job.find();
        return NextResponse.json({ jobs: fetchdata,  headers: corsHeaders })
    }
    catch (error: any) {
        console.log(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}


export async function OPTIONS(request: NextRequest) {
    const corsHeaders = cors(request)
    return NextResponse.json({}, { headers: corsHeaders })
  }

