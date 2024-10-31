"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface NavigationItem {
  name: string;
  href: string;
  current: boolean;
}

const navigation: NavigationItem[] = [
  { name: "Home", href: "/", current: true },
  { name: "Explore Plans", href: "/Subscription", current: false },
  { name: "Find a Job", href: "/JobForum", current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const Data = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [data, setData] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const token = localStorage.getItem("Token");
    if (token) {
      setIsLoggedIn(true);
      const fetchData = async () => {
        try {
          const response = await fetch("/api/Profile/showProfile", {
            method: "GET",

            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const result = await response.json();
          setData(result);
          console.log("checking role -----------", result.role);

          if (result.role !== "Admin") {
            setIsAdmin(false);
          } else {
            setIsAdmin(true);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  if (!isClient) {
    return null;
  }

  const logout = () => {
    localStorage.removeItem("Token");
    setIsLoggedIn(false);
    setData(null);
    setIsAdmin(false);
    window.location.reload();
  };

  return (
    <div className="rounded-md max-w-sm w-full mx-auto">
      <div className="flex-1 space-y-4 py-1">
        <div className="sm:block">
          <div className="space-y-1 px-5 pt-2 pb-3">
            {isLoggedIn && data ? (
              <div className="mb-5">
                <div className="flex items-center gap-2 ml-2">
                  <Link href={"/Profile"}>
                    <Image
                      height={600}
                      width={600}
                      className="w-10 h-10 rounded-full"
                      src={
                        data.profileUrl ||
                        "https://images.pexels.com/photos/4069292/pexels-photo-4069292.jpeg?auto=compress&cs=tinysrgb&w=600"
                      }
                      alt={data.name || "Profile Picture"}
                    />
                  </Link>
                  <div className="font-medium">
                    <div>{data.name}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Joined in {new Date(data.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500">
                {isLoggedIn === false
                  ? "Please log in to view your profile."
                  : "Loading..."}
              </div>
            )}
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={classNames(
                  item.current
                    ? "text-black hover:opacity-100"
                    : "hover:text-black hover:opacity-100",
                  "px-2 py-1 text-lg font-normal opacity-75 block"
                )}
                aria-current={item.current ? "page" : undefined}
              >
                {item.name}
              </Link>
            ))}
            <div className="">
             {isAdmin === true && <Link href="/Components/Partials/DashboardComponents/MainHero">
                <button
                  type="button"
                  className="text-sm bg-purple-600 w-full text-white py-2 px-8 rounded-md nav-btns font-medium"
                >
                  Dashboard
                </button>
              </Link>}
            </div>
            {isLoggedIn ? (
              <button
                onClick={logout}
                type="button"
                className="text-sm bg-purple-600 w-full text-white py-2 px-8 rounded-md nav-btns font-medium"
              >
                Logout
              </button>
            ) : (
              <Link href="/Login">
                <button
                  type="button"
                  className="text-sm bg-purple-600 w-full text-white py-2 px-8 rounded-md nav-btns font-medium"
                >
                  Log In
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Data;
