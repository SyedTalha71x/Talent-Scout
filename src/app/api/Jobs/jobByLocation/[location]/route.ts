import { connectToDB } from "@/utils/db/route";
import Job from "@/utils/Models/job-model";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { location: string } }) {
    try {
        const { location } = params;

        if (!location) {
            return NextResponse.json({ error: 'Location parameter is required' }, { status: 400 });
        }

        // Split location into city and state
        const [city, state] = location.split(',').map(part => part.trim());

        if (!city || !state) {
            return NextResponse.json({ error: 'Invalid location format' }, { status: 400 });
        }

        // Fetch jobs that match the location
        const jobs = await Job.find({ location: new RegExp(`^${city}, ${state}$`, 'i') }).exec();

        if (jobs.length === 0) {
            return NextResponse.json({ message: 'No jobs found for the specified location' }, { status: 404 });
        }

        return NextResponse.json({ jobs });
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
