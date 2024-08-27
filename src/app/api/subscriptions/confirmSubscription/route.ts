import connectToDB from "@/utils/db/route";
import Subscription from "@/utils/Models/subscription-model";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import moment from "moment";
import UserSubscription from "@/utils/Models/user-subscription";

connectToDB();
const stripe = new Stripe(process.env.NEXT_SECRET_STRIPE_KEY || "");

export async function POST(request: any) {
  try {
    const userId = request.headers.get('X-User-ID');
    const userEmail = request.headers.get('X-User-Email');

    console.log("User ID from headers:", userId);
    console.log("User email from headers:", userEmail);

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is not available" },
        { status: 401 }
      );
    }

    // Extract the session ID from the request body
    const reqBody = await request.json();
    const { sessionId } = reqBody;

    if (!sessionId) {
      return NextResponse.json(
        { error: "SessionId is required" },
        { status: 422 }
      );
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (!session) {
      return NextResponse.json({ error: "Session not Found" }, { status: 400 });
    }

    if (session.payment_status !== "paid") {
      return NextResponse.json({ error: "Payment not found" }, { status: 400 });
    }

    const payment_intent_id = session.payment_intent;
    const subscriptionId = session.client_reference_id;

    if (!subscriptionId) {
      return NextResponse.json(
        { error: "SubscriptionId is missing" },
        { status: 400 }
      );
    }

    const subscription = await Subscription.findById(subscriptionId);
    if (!subscription) {
      return NextResponse.json(
        { error: "Subscription not found" },
        { status: 400 }
      );
    }

    const expiryDate = moment()
      .add(subscription.valid_till, "days")
      .format("YYYY-MM-DD");

    const user_subscription = new UserSubscription({
      subscription_id: subscriptionId,
      user_id: userId, // Use user ID from middleware
      payment_id: payment_intent_id,
      expiry_date: expiryDate,
    });

    await user_subscription.save();

    return NextResponse.json(
      { message: "Subscription confirmed Successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Subscription confirmation error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
