import Notification from "@/utils/Models/notification-model";
import { connectToDB } from "@/utils/db/route";
import { NextResponse } from "next/server";

export async function GET(request: any) {
  try {

    await connectToDB();
    const notifications = await Notification.countDocuments({readAll: 0});
    return NextResponse.json({ notifications }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Error fetching notifications" },
      { status: 500 }
    );
  }
}
