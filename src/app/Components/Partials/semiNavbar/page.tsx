"use client";
import { useEffect, useState } from "react";
import { TiArrowLeft } from "react-icons/ti";
import { IoNotificationsOutline } from "react-icons/io5";
import Link from "next/link";

const Navbar = () => {
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    // Fetch notification count from the API
    const fetchNotifications = async () => {
      try {
        const res = await fetch("/api/notifications/countNotifications"); // API endpoint to get notification count
        const data = await res.json();
        setNotificationCount(data.notifications);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div className="bg-[#181f4a] flex justify-end items-center p-5 text-white">
      <Link href={"/Components/Partials/DashboardComponents/Notifications"}>
        <div className="relative  mr-4 cursor-pointer">
          <IoNotificationsOutline className="text-3xl" />
          {notificationCount > 0 && (
            <div className="absolute top-[-5px] left-[16px] bg-yellow-400 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
              {notificationCount}
            </div>
          )}
        </div>
      </Link>
      <Link href={"/"}>
        <button className="bg-purple-600 flex justify-center items-center nav-btns py-2 px-6 rounded-md text-white mr-4">
          <TiArrowLeft className="pr-1 text-xl" />
          Back
        </button>
      </Link>
    </div>
  );
};

export default Navbar;
