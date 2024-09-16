import { connectToDB } from "@/utils/db/route";
import Subscription from "@/utils/Models/subscription-model";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDB();
    const { id } = params;
    console.log("----------------", id);

    if (!id) {
      return NextResponse.json(
        { error: "Subscription not found" },
        { status: 400 }
      );
    }

    const subscription = await Subscription.findByIdAndDelete(id);
    if (!subscription) {
      return NextResponse.json(
        { error: "Subscription not found" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Subscription has been deleted" },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
