import { NextResponse } from "next/server";
import connectToDB from "@/utils/db/route";
import Job from "@/utils/Models/job-model"


connectToDB();
export const POST = async (request: any) => {
    try {
        const reqBody = await request.json();
        const { Company, Location, Type, Role, Description, Skills, Salary, SalaryType, JobCategory, JobArrival, Image } = reqBody;

        const jobPost = new Job({
            Company, Location, Type, Role, Description, Skills, Salary, SalaryType, JobCategory, JobArrival, Image
        })
        await jobPost.save();
        if (jobPost) {
            return NextResponse.json({ message: 'Job has been created' }, { status: 200 })
        }
        else {
            return NextResponse.json({ message: 'Failed to create the job' }, { status: 401 })
        }
    }
    catch (error: any) {
        console.log(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}