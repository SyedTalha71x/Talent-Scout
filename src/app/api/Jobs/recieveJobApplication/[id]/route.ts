import { connectToDB } from "@/utils/db/route";
import ApplyForJob from "@/utils/Models/job-apply-model";
import { NextResponse } from "next/server";

export async function GET(
  request: any,
  { params }: { params: { id: string } }
) {
  try {


    await connectToDB();
  
    const { id } = params;
   
    const application = await ApplyForJob.findById(id);
    if (!application) {
      return NextResponse.json(
        { error: "Application not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(application, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
