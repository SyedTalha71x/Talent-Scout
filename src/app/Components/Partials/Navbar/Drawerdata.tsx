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
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null); // Use null initially
  const router = useRouter();
  // const { data: session, status } = useSession();

  useEffect(() => {
    // Check authentication state on component mount or session status change
    const token = localStorage.getItem("Token");

    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("Token");
    setIsLoggedIn(false); // Update state to reflect logout
    window.location.reload();
  };

  return (
    <div className="rounded-md max-w-sm w-full mx-auto">
      <div className="flex-1 space-y-4 py-1">
        <div className="sm:block">
          <div className="space-y-1 px-5 pt-2 pb-3">
            <div className="mb-5">
              <div className="flex items-center gap-2 ml-2 ">
                <Link href={"/Profile"}>
                  <Image
                    height={600}
                    width={600}
                    className="w-10 h-10 rounded-full"
                    src="https://images.pexels.com/photos/4069292/pexels-photo-4069292.jpeg?auto=compress&cs=tinysrgb&w=600"
                    alt=""
                  />
                </Link>
                <div className="font-medium ">
                  <div>Talha Hussain</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Joined in August 2014
                  </div>
                </div>
              </div>
            </div>
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
            <div className="mt-4"></div>
            {isLoggedIn ? (
              <button
                onClick={logout}
                type="button"
                className="text-sm bg-purple-600 w-full text-white py-2 px-8 rounded-md nav-btns font-medium"
              >
                Logout
              </button>
            ) : (
              <button
                type="button"
                className="text-sm bg-purple-600 w-full text-white py-2 px-8 rounded-md nav-btns font-medium"
              >
                <Link href="/Login">Log In</Link>
              </button>
            )}

            <button className="bg-midnightblue w-full hover:bg-blue hover:text-white text-white font-medium my-2 py-2 px-4 rounded">
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Data;
