import React, { useCallback, useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const MainLayout = ({ user }) => {
  const { logout } = useAuth();

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [sidebarWidth, setSidebarWidth] = useState(0);

  const toggleSidebar = useCallback(() => {
    setIsCollapsed((prev) => !prev);
    if (isCollapsed) {
      setSidebarWidth(256);
    } else {
      setSidebarWidth(50);
    }
  }, [isCollapsed, setSidebarWidth]);

  return (
    <div className="flex flex-col h-screen bg-gray-100 overflow-hidden">
      {/* sticky navbar */}
      <Navbar
        user={user}
        logoutHandler={logout}
        toggleSidebar={toggleSidebar}
        setHeaderHeight={setHeaderHeight}
      />

      {/* main content with sidebar */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          user={user}
          isCollapsed={isCollapsed}
          headerHeight={headerHeight}
          sidebarWidth={sidebarWidth}
        />

        <main
          className={`${
            isCollapsed ? "ml-15" : "ml-50"
          } flex-1 p-6 overflow-y-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-400`}
          role="main"
          tabIndex={-1}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default React.memo(MainLayout);
