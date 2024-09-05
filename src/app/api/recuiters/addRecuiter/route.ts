import { NextResponse } from "next/server";
import Recuiter from "@/utils/Models/recuiter-model";
import {connectToDB} from "@/utils/db/route";

connectToDB();
export const POST = async (request: any) => {
    try {
        const reqBody = await request.json();
        const { name, location, activation, image } = reqBody;

        const recuiters = new Recuiter({
            name, location, activation, image
        })
        await recuiters.save();
        return NextResponse.json({ message: 'Recuiters have been created' }, { status: 200 })
    }
    catch (error: any) {
        console.log(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }

}