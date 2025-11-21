import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const menuConfig = {
  Admin: [
    { name: "User Management", href: "/user-management" },
    { name: "Onboarding", href: "/onboarding" },
    { name: "Cost Explorer", href: "/cost-explorer" },
    { name: "AWS Services", href: "/aws-services" },
  ],
  ReadOnly: [
    { name: "Cost Explorer", href: "/cost-explorer" },
    { name: "AWS Services", href: "/aws-services" },
  ],
  Customer: [
    { name: "Cost Explorer", href: "/cost-explorer" },
    { name: "AWS Services", href: "/aws-services" },
  ],
};
const Sidebar = ({ user }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => setIsCollapsed((prev) => !prev);

  const menuItems = menuConfig[user.role] || [];

  return (
    <>
      {/* toggle button for small screens */}
      <button
        onClick={toggleSidebar}
        aria-label="Toggle menu"
        className="lg:hidden m-2 p-2 text-gray-700 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {isCollapsed ? "☰" : "✕"}
      </button>

      {/* sidebar */}
      <nav
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-md overflow-y-auto transition-transform transform ${
          isCollapsed ? "-translate-x-full" : "translate-x-0"
        } lg:translate-x-0 lg:static lg:shadow-none`}
        aria-label="Sidebar Navigation"
      >
        <div className="p-4 border-b border-gray-200 font-semibold text-lg text-gray-800">
          Navigation
        </div>
        <ul className="flex flex-col space-y-1 p-2">
          {menuItems.map(({ name, href }) => (
            <li key={name}>
              <NavLink
                to={href}
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                    isActive
                      ? "bg-blue-600 text-white font-semibold"
                      : "text-gray-700 hover:bg-blue-100"
                  }`
                }
                aria-current={window.location.pathname === href ? "page" : undefined}
              >
                {name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* overlay for mobile sidebar */}
      {isCollapsed && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default React.memo(Sidebar);
