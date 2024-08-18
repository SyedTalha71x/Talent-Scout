import Job from '@/utils/Models/job-model';
import connectToDB from '@/utils/db/route';
import { NextResponse } from 'next/server';


connectToDB();
export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    const { id } = params;

    try {
        const document = await Job.findById(id);
        if (!document) {
            return NextResponse.json({ message: 'Job not Found' }, { status: 404 })
        }
        return NextResponse.json({ document }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
    }
}