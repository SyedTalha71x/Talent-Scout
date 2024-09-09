import Notification from "@/utils/Models/notification-model";
import { connectToDB } from "@/utils/db/route";
import { NextResponse } from "next/server";

connectToDB();

export async function GET(request: any) {
  try {

    const notifications = await Notification.find()
    return NextResponse.json({ notifications }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Error fetching notifications" },
      { status: 500 }
    );
  }
}
