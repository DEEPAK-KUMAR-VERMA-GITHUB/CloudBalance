import React from "react";
import Navbar from "./Navbar";
import  Sidebar  from "./Sidebar";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const MainLayout = ({ user }) => {

  const {logout} = useAuth();

  return (
    <div className="flex flex-col h-screen bg-gray-100 overflow-hidden">
      {/* sticky navbar */}
      <Navbar user={user} logoutHandler={logout} />

      {/* main content with sidebar */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar user={user} />

        <main
          className="flex-1 p-6 overflow-y-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-400"
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
