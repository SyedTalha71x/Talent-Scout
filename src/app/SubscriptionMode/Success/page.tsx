"use client";
import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

const SubscriptionSuccessPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState(null);
  const [sessionId, setSessionId] = useState("");

  useEffect(() => {
    // Extract session ID from the search params
    const id = searchParams.get("session_id");
    setSessionId(id || "");
  }, [searchParams]);

  useEffect(() => {
    const confirmSubscription = async () => {
      const token = localStorage.getItem("Token"); // Retrieve token from localStorage

      if (!token) {
        console.error("No token found");
        setError("Authentication token is missing");
        setLoading(false);
        return;
      }

      if (!sessionId) {
        setError("Session ID is missing");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("/api/subscriptions/confirmSubscription", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ sessionId }),
        });

        const data = await response.json();

        if (response.ok) {
          setMessage(data.message);
        } else {
          setError(data.error || "Subscription confirmation failed");
        }
      } catch (error) {
        setError("Internal Server Error");
        console.error("Error confirming subscription:", error);
      } finally {
        setLoading(false);
      }
    };

    if (sessionId) {
      confirmSubscription();
    }
  }, [sessionId]);

  return (
    <div className="bg-gray-100 h-screen flex justify-center items-center flex-col">
      <div className="bg-white p-6 md:mx-auto">
        <svg
          viewBox="0 0 24 24"
          className={`text-green-600 w-16 h-16 mx-auto my-6 ${
            message ? "" : "hidden"
          }`}
        >
          <path
            fill="currentColor"
            d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
          ></path>
        </svg>
        <div className="text-center">
          <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
            {loading ? "Processing..." : message ? "Payment Done!" : "Error"}
          </h3>
          <p className="text-gray-600 my-2">
            {loading
              ? "Please wait while we process your payment."
              : message
              ? "Thank you for completing your secure online payment."
              : error}
          </p>
          {!loading && (
            <div className="py-10 text-center">
              <Link
                href="/"
                className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3"
              >
                GO BACK
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default function PageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SubscriptionSuccessPage />
    </Suspense>
  );
}
