"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const Page: React.FC = () => {
  const [loggedin, setLoggedin] = useState(false);
  const [isAdmin, setisAdmin] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Check if window is available
      const token = localStorage.getItem("Token");
      setLoggedin(!!token);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("Token");
    const fetchData = async () => {
      try {
        const response = await fetch("/api/Profile/showProfile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const resultData = await response.json();
        if (resultData.role !== "Admin") {
          setisAdmin(false);
        } else {
          setisAdmin(true);
        }
      } catch (error: any) {
        console.log("-------------", error);
      }
    };
    if (fetchData) {
      fetchData();
    }
  }, []);

  return (
    <div className="">
      <div className="hidden lg:block">
        {loggedin && isAdmin === true && (
          <button
            type="button"
            className="text-sm ml-2 bg-purple-600 text-white py-2 px-8 rounded-md nav-btns"
          >
            <Link href={"/Components/Partials/DashboardComponents/MainHero"}>
              Dashboard
            </Link>
          </button>
        )}
      </div>
    </div>
  );
};

export default Page;
