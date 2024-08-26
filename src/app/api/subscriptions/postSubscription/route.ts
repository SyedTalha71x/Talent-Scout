import connectToDB from "@/utils/db/route";
import Subscription from "@/utils/Models/subscription-model";
import { NextResponse } from "next/server";

connectToDB();
export async function POST(request: any) {
  try {
    const reqBody = await request.json();
    const { name, bulletpoints, valid_till, price } = reqBody;

    const subscription = new Subscription({
      name,
      bulletpoints,
      valid_till,
      price,
    });
    await subscription.save();
    if (subscription) {
      return NextResponse.json(
        { message: "Subscription has been created" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Failed to create the Subscription" },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
