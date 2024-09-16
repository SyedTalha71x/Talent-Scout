import { NextResponse } from "next/server";
import {connectToDB} from "@/utils/db/route";
import Job from "@/utils/Models/job-model";

export const POST = async (request: any) => {
    try {
        await connectToDB();
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
            image // Assuming `image` is a field in your model
        } = reqBody;

        const jobPost = new Job({
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
            image
        });

        await jobPost.save();

        if (jobPost) {
            return NextResponse.json({ message: 'Job has been created' }, { status: 200 });
        } else {
            return NextResponse.json({ message: 'Failed to create the job' }, { status: 401 });
        }
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
};
