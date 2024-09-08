"use client";
import React, { ReactNode } from "react";
import Sidebar from "../../Components/Partials/Sidebar/page";
import Navbar from "../../Components/Partials/semiNavbar/page";

interface LayoutProps {
  children: ReactNode;
}

const Page: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Navbar />
        {/* Scrollable content area */}
        <div className="flex-1 p-4 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Page;
