import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Breadcrumbs from "./Breadcrumbs";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const MainLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => setIsCollapsed((prev) => !prev);

  return (
    <div className="flex flex-col h-screen bg-gray-100 overflow-hidden">
      {/* sticky navbar */}
      <Navbar toggleSidebar={toggleSidebar} />

      {/* main content with sidebar */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isCollapsed={isCollapsed} />

        <main
          className={`${
            isCollapsed ? "ml-15" : "ml-50"
          } flex-1 p-6 overflow-y-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-400 relative`}
          role="main"
          tabIndex={-1}
        >
          <Breadcrumbs />
          <Outlet />

          <Footer
            leftText={`CloudKeeper ${new Date().getFullYear()} | All Rights Reserved `}
            rightText={"Contact Us"}
          />
        </main>
      </div>
    </div>
  );
};

export default React.memo(MainLayout);
