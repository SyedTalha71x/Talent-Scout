"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const Signin: React.FC = () => {
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
    <div className="">
      <div className="hidden lg:block">
        {isLoggedIn ? (
          <button
            onClick={logout}
            type="button"
            className="text-sm bg-purple-600 text-white py-2 px-8 rounded-md nav-btns font-medium"
          >
            Logout
          </button>
        ) : (
          <button
            type="button"
            className="text-sm bg-purple-600 text-white py-2 px-8 rounded-md nav-btns font-medium"
          >
            <Link href="/Login">Log In</Link>
          </button>
        )}
      </div>
    </div>
  );
};

export default Signin;
