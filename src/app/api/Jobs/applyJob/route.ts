// pages/api/Jobs/applyJob.ts
import { connectToDB } from "@/utils/db/route";
import JobApplication from "@/utils/Models/job-apply-model";
import Job from "@/utils/Models/job-model";
import Notification from "@/utils/Models/notification-model";
import { NextResponse } from "next/server";


export async function POST(request: any) {
  try {
    await connectToDB();
    
    const {
      jobId,
      name,
      email,
      phoneNo,
      currentPosition,
      currentSalary,
      coverLetter,
    } = await request.json();

    const userId = request.headers.get("X-User-ID");

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return NextResponse.json({ message: "Job not found" }, { status: 400 });
    }

    const newApplication = new JobApplication({
      userId: userId,
      jobId,
      name,
      email,
      phoneNo,
      currentPosition,
      currentSalary,
      coverLetter,
    });

    const savedApplication = await newApplication.save();

    // Create a notification for the admin
    const notificationMessage = `A new application for job "${job.title}" has been submitted by ${name}.`;

    const notification = new Notification({
      userId,
      jobId,
      applicationId: savedApplication._id,  // Store the application ID
      message: notificationMessage,
    });

    await notification.save();

    return NextResponse.json(
      { message: "You have successfully applied for this job" },
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
