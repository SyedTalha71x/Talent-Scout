"use client";
import React, { useState } from "react";
import Link from "next/link";
import { MdDashboard } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { SiGoogleanalytics } from "react-icons/si";
import { FaBriefcase } from "react-icons/fa";
import { FaMoneyCheck } from "react-icons/fa6";



const links = [
  {
    name: "Home",
    href: "/Components/Partials/DashboardComponents/MainHero",
    icon: <MdDashboard/>,
    active: true
  },
  {
    name: "User",
    href: "/Components/Partials/DashboardComponents/Users",
    icon: <FaUser/>,
    active: false
  },
  {
    name: "Subscriptions",
    href: "/Components/Partials/DashboardComponents/Subscriptions",
    icon: <FaMoneyCheck/>,
    active: false
  },
  { name: "Notifications", href: "/Components/Partials/DashboardComponents/Notifications", icon: <SiGoogleanalytics/> , active: false},
  { name: "Jobs", href: "/Components/Partials/DashboardComponents/Jobs", icon: <FaBriefcase/> , active: false},
];

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setactive] = useState(false)

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Hamburger menu button visible on small and medium screens */}
      <div className="hamburger-icon lg:hidden  p-4 fixed top-0 left-0">
        <button
          className="text-white bg-blue-950 p-2 rounded"
          onClick={toggleSidebar}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6h16.5M3.75 12h16.5m-16.5 6h16.5"
            />
          </svg>
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed z-40 sm:z-50 top-0 left-0 h-screen bg-[#0f1535] text-white w-64 p-4 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static`}
      >
        {/* Close button (only for small and medium screens) */}
        <div className="lg:hidden flex justify-end">
          <button
            className="text-white bg-blue-950 p-2 rounded"
            onClick={toggleSidebar}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Logo  */}
        {/* <div>
          <h1 className="font-extrabold uppercase text-white text-xl flex justify-start items-start mt-4">Talent Scout</h1>

        </div> */}

        <ul className="mt-[35%] space-y-5">
          {links.map((link, index) => (
            <li key={index} className={`hover:bg-purple-600 p-2 transition-all duration-300  rounded-lg ${link.active === true ? "bg-purple-600": ""}`}>
              <Link href={link.href}>
                <div className="flex text-sm items-center gap-1.5">
                  <span className="text-xl">{link.icon}</span>
                  <span>{link.name}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Background overlay when sidebar is open (small/medium screens) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
    </div>

  );
};

export default Sidebar;
