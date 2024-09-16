// pages/api/payment.js
import { NextResponse } from "next/server";
import Stripe from "stripe";
import Subscription from "@/utils/Models/subscription-model";
import { configDotenv } from "dotenv";
import { connectToDB } from "@/utils/db/route";

configDotenv();
const stripe = new Stripe(process.env.NEXT_SECRET_STRIPE_KEY || "");

export const POST = async (request: any) => {
  try {
    await connectToDB();
    const reqBody = await request.json();
    const { subscriptionId } = reqBody;

    const subscription = await Subscription.findById(subscriptionId);
    if (!subscription) {
      return NextResponse.json(
        { message: "Subscription not found" },
        { status: 400 }
      );
    }

    const unitAmount = Math.round(subscription.price * 100);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: subscription.name },
            unit_amount: unitAmount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/SubscriptionMode/Success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/SubscriptionMode/Cancel`,
      client_reference_id: subscriptionId, // Store the subscriptionId in the session
    });

    if (session) {
      return NextResponse.json({ sessionId: session.id }, { status: 200 });
    } else {
      return NextResponse.json(
        { error: "Failed to create Stripe session" },
        { status: 400 }
      );
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
