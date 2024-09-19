import { connectToDB } from "@/utils/db/route";
import Job from "@/utils/Models/job-model";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params; // Extract the job id from params
  try {
    await connectToDB();

    const userId = request.headers.get("X-User-ID");
    console.log('User id ---------------------', userId)

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const reqBody = await request.json();
    const {
      title,
      company,
      description,
      briefDescription,
      location,
      salary,
      jobType,
      experienceLevel,
      experience,
      skills,
      applicationDeadline,
      isRemote,
      status,
      industry,
      jobCategory,
      image,
    } = reqBody;

    const updatedJob: any = {};
    if (title) updatedJob.title = title;
    if (company) updatedJob.company = company;
    if (description) updatedJob.description = description;
    if (briefDescription) updatedJob.briefDescription = briefDescription;
    if (location) updatedJob.location = location;
    if (salary) updatedJob.salary = salary;
    if (jobType) updatedJob.jobType = jobType;
    if (experienceLevel) updatedJob.experienceLevel = experienceLevel;
    if (experience) updatedJob.experience = experience;
    if (skills) updatedJob.skills = skills;
    if (applicationDeadline)
      updatedJob.applicationDeadline = applicationDeadline;
    if (isRemote) updatedJob.isRemote = isRemote;
    if (status) updatedJob.status = status;
    if (industry) updatedJob.industry = industry;
    if (jobCategory) updatedJob.jobCategory = jobCategory;
    if (image) updatedJob.image = image;

    const editJob = await Job.findByIdAndUpdate(id, updatedJob, { new: true });

    if (!editJob) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    return NextResponse.json({ editJob }, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
