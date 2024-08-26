"use client";
import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import Banner from "../Components/Partials/Banner/banner";
import axios from "axios";

// Initialize Stripe with your publishable key
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY || " ");

const Page = () => {
  const [data, setData] = useState([]);
  const port = process.env.BASE_PORT || "http://localhost:3000";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${port}/api/subscriptions/getSubscription`
        );
        setData(response.data.subscription);
      } catch (error) {
        console.log("Error -----------", error);
      }
    };
    fetchData();
  }, [port]);

  const purchaseSubscription = async (subscriptionId: any) => {
    const token = localStorage.getItem("Token"); // Retrieve token from localStorage

    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      const response = await fetch("/api/subscriptions/purchaseSubscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
        body: JSON.stringify({ subscriptionId }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Subscription purchased successfully:", data);

      // Optional: Redirect to payment confirmation page
      const stripe: any = await stripePromise;
      await stripe.redirectToCheckout({ sessionId: data.sessionId });
    } catch (error) {
      console.error("Failed to purchase subscription:", error);
    }
  };

  const handleSubscriptionClick = (subscriptionId: any) => {
    purchaseSubscription(subscriptionId);
  };

  return (
    <>
      <div className="lg:w-[90%] md:w-full sm:w-full w-full mx-auto">
        <div className="space-y-5 px-8 py-12">
          <div className="mt-5 text-left mb-14">
            <div>
              <h1 className="sm:text-3xl text-2xl font-extrabold title-font text-gray-800 mb-2">
                Explore our best Subscription Plans
              </h1>
              <p className="text-base leading-relaxed xl:w-full lg:w-full w-full mx-auto text-gray-500">
                Get started with our latest and affordable subscription plans
                and pursue your career
              </p>
            </div>
          </div>
          <div className="z-50 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {data.map((item: any) => (
              <div
                key={item._id}
                className="rounded-[30px] md:rounded-[36px] bg-[#f7f4f4] overflow-hidden border-[1px] border-gray-200 p-8 relative"
              >
                <div className="h-full">
                  <div className="h-full z-10 relative">
                    <div className="flex flex-col flex-1 justify-between h-full space-y-5">
                      <div className="flex justify-between flex-col">
                        <div className="text-xl md:text-2xl font-bold text-gray-900 flex justify-between">
                          <span>{item.name}</span>
                        </div>
                        <div className="pt-5 text-gray-500 font-medium text-base space-y-1">
                          <div className="flex items-center align-bottom">
                            <span className="pt-1.5">$</span>
                            <div className="ml-1 mr-2 text-2xl md:text-3xl font-bold text-gray-900">
                              <span>{(item.price / 100).toFixed(2)}</span>{" "}
                              {/* Convert price from cents to dollars */}
                            </div>
                            <span className="pt-1.5">per month</span>
                          </div>
                          <div className="text-base">billed annually</div>
                        </div>
                        <div>
                          <ul className="space-y-2 pt-8">
                            {item.bulletpoints.map((point: any, index: any) => (
                              <li
                                key={index}
                                className="flex items-center font-medium space-x-2 text-black"
                              >
                                <svg
                                  className="h-4 w-4"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M16.4444 3.03947C15.1056 2.37412 13.5965 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 11.6244 21.9793 11.2537 21.939 10.8889M9 11L12 14L22 4"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  ></path>
                                </svg>
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="pt-2">
                        <button
                          onClick={() => handleSubscriptionClick(item._id)}
                          type="button"
                          className="appearance-none inline-flex hover:shadow-2xl transition-all duration-300 nav-btns items-center group space-x-2.5 bg-purple-600 text-white py-3 px-6 rounded-2xl cursor-pointer"
                        >
                          <span className="w-full font-semibold text-base">
                            Choose {item.name}
                          </span>
                          <svg
                            className="inline-block h-6"
                            viewBox="0 0 24 25"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M3 12.4999H21L14 19.4999M14 5.5L18 9.5"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="rounded-[30px] md:rounded-[36px] bg-[#f7f4f4] overflow-hidden border-[1px] border-gray-200 p-8 relative sm:col-span-2 lg:col-span-1">
              <div className="h-full">
                <div className="flex flex-col justify-between h-full space-y-5">
                  <div className="flex justify-between flex-col">
                    <div className="text-xl md:text-2xl font-bold text-gray-900 flex justify-between">
                      <span>Enterprise</span>
                    </div>
                    <div className="pt-5">
                      Contact us for a custom quote and a custom onboarding
                      process.
                    </div>
                  </div>
                  <div className="pt-2">
                    <a
                      href="#"
                      type="button"
                      className="appearance-none inline-flex hover:shadow-2xl transition-all duration-300 items-center group space-x-2.5 bg-purple-600 text-white py-3 px-6 nav-btns rounded-2xl cursor-pointer"
                    >
                      <span className="w-full font-semibold text-base">
                        Contact Sales
                      </span>
                      <svg
                        className="inline-block h-6"
                        viewBox="0 0 24 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3 12.4999H21L14 19.4999M14 5.5L18 9.5"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Banner />
    </>
  );
};

export default Page;
