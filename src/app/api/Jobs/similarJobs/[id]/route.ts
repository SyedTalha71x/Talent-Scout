import connectToDB from "@/utils/db/route";
import Job from "@/utils/Models/job-model";
import { NextResponse } from "next/server";

connectToDB();
export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    const { id } = params;
    try {
        const currentJob = await Job.findById(id);
        if (!currentJob) {
            return NextResponse.json({ message: 'Job not Found' }, { status: 404 })
        }

        const similarJobs = await Job.find({
            _id: { $ne: id },
            $or: [
                { jobCategory: currentJob.jobCategory },
                { industry: currentJob.industry },
                { skills: { $in: currentJob.skills } }
            ]
        }).limit(8)

        if (!similarJobs) {
            return NextResponse.json({ message: 'Similar Jobs not FOund' }, { status: 404 })
        }
        else {
            return NextResponse.json({ similarJobs }, { status: 200 })
        }
    }
    catch (error: any) {
        console.log(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }

}