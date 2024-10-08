import {connectToDB} from "@/utils/db/route";
import Subscription from "@/utils/Models/subscription-model";
import { NextResponse } from "next/server";


export async function GET(request: any) {
  try {
    await connectToDB();
    const subscription = await Subscription.find();
    return NextResponse.json({ subscription });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
