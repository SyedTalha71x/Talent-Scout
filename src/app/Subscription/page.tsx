"use client";
import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import Banner from "../Components/Partials/Banner/banner";
import axios from "axios";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY || " ");

const Page = () => {
  const [data, setData] = useState([]);
  const port = process.env.NEXT_PUBLIC_API_KEY;

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
    const token = localStorage.getItem("Token");

    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      const response = await fetch("/api/subscriptions/purchaseSubscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, 
        },
        body: JSON.stringify({ subscriptionId }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Subscription purchased successfully:", data);

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
      <div className="lg:w-[80%] md:w-[90%] sm:w-full w-full mx-auto -z-50">
        <div className="space-y-5 px-4 sm:px-8 md:px-8 lg:px-10 py-6 sm:py-12 lg:py-10">
          <div className="mt-5 text-left mb-14">
            <h1 className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-extrabold text-gray-800 mb-2">
              Explore our best Subscription Plans
            </h1>
            <p className="text-sm sm:text-base md:text-sm lg:text-base leading-relaxed xl:w-full lg:w-full w-full mx-auto text-gray-500">
              Get started with our latest and affordable subscription plans and pursue your career
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {data.map((item: any) => (
              <div
                key={item._id}
                className="rounded-lg md:rounded-xl lg:rounded-xl bg-[#f7f4f4] overflow-hidden border border-gray-200 p-4 sm:p-6 md:p-6 lg:p-8 relative"
              >
                <div className="h-full">
                  <div className="relative">
                    <div className="flex flex-col justify-between h-full space-y-4 sm:space-y-5 md:space-y-5 lg:space-y-6">
                      <div className="flex flex-col">
                        <div className="text-lg sm:text-xl md:text-xl lg:text-2xl font-bold text-gray-900">
                          {item.name}
                        </div>
                        <div className="pt-3 sm:pt-5 text-sm sm:text-base md:text-sm lg:text-base text-gray-500 font-medium space-y-1">
                          <div className="flex items-center">
                            <span className="text-lg sm:text-xl md:text-xl lg:text-2xl font-bold text-gray-900">
                              ${(item.price / 100).toFixed(2)}
                            </span>
                            <span className="text-sm sm:text-base md:text-sm lg:text-base ml-1"> per month</span>
                          </div>
                          <div className="text-sm sm:text-base md:text-sm lg:text-base">billed annually</div>
                        </div>
                        <ul className="space-y-2 pt-6 sm:pt-8 lg:pt-8 text-sm sm:text-base md:text-sm lg:text-base">
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
                      <div className="pt-4 sm:pt-6 lg:pt-6">
                        <button
                          onClick={() => handleSubscriptionClick(item._id)}
                          type="button"
                          className="appearance-none inline-flex hover:shadow-lg nav-btns transition-all duration-300 items-center group space-x-2.5 bg-purple-600 text-white py-2 sm:py-2 px-4 sm:px-5 rounded-lg md:rounded-xl lg:rounded-xl cursor-pointer"
                        >
                          <span className="font-semibold text-sm sm:text-base md:text-base lg:text-[16px]">
                            Choose {item.name}
                          </span>
                          <svg
                            className="inline-block h-5 sm:h-6 md:h-6 lg:h-7"
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
            <div className="rounded-lg md:rounded-xl lg:rounded-xl bg-[#f7f4f4] overflow-hidden border border-gray-200 p-4 sm:p-6 md:p-6 lg:p-8 relative sm:col-span-2 lg:col-span-1">
              <div className="h-full">
                <div className="flex flex-col justify-between h-full space-y-4 sm:space-y-5 md:space-y-5 lg:space-y-6">
                  <div className="flex flex-col">
                    <div className="text-lg sm:text-xl md:text-xl lg:text-2xl font-bold text-gray-900">
                      Enterprise
                    </div>
                    <div className="pt-3 sm:pt-5 text-sm sm:text-base md:text-sm lg:text-base">
                      Contact us for a custom quote and a custom onboarding process.
                    </div>
                  </div>
                  <div className="pt-4 sm:pt-6 lg:pt-6">
                    <a
                      href="#"
                      type="button"
                      className="appearance-none inline-flex hover:shadow-lg nav-btns transition-all duration-300 items-center group space-x-2.5 bg-purple-600 text-white py-2 sm:py-2 px-4 sm:px-5 rounded-lg md:rounded-xl lg:rounded-xl cursor-pointer"
                    >
                      <span className="font-semibold text-sm sm:text-base md:text-base lg:text-lg">
                        Contact Sales
                      </span>
                      <svg
                        className="inline-block h-5 sm:h-6 md:h-6 lg:h-7"
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
