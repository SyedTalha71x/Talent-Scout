import React, { ReactNode } from "react";
import Sidebar from "../../Components/Partials/Sidebar/page";
import Navbar from "../../Components/Partials/semiNavbar/page";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="flex-1 p-4 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
