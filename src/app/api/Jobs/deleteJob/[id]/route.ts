import { connectToDB } from "@/utils/db/route";
import Job from "@/utils/Models/job-model";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    await connectToDB();
    if (!id) {
      return NextResponse.json({ error: "Job ID is not defined" }, { status: 400 });
    }
    const result = await Job.findByIdAndDelete(id);
    if (!result) {
      return NextResponse.json({ message: "Job not found" }, { status: 400 });
    }
    return NextResponse.json(
      { message: "Job has been deleted " },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
