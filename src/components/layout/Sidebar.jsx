import { DynamicIcon } from "lucide-react/dynamic";
import React from "react";
import { NavLink } from "react-router-dom";

const menuConfig = {
  Admin: [
    {
      name: "User Management",
      href: "/user-management",
      icon: "user-round-cog",
    },
    { name: "Onboarding", href: "/onboarding", icon: "layout-dashboard" },
    { name: "Cost Explorer", href: "/cost-explorer", icon: "hand-coins" },
    { name: "AWS Services", href: "/aws-services", icon: "monitor-cloud" },
  ],
  ReadOnly: [
    { name: "Cost Explorer", href: "/cost-explorer", icon: "hand-coins" },
    { name: "AWS Services", href: "/aws-services", icon: "monitor-cloud" },
  ],
  Customer: [
    { name: "Cost Explorer", href: "/cost-explorer", icon: "hand-coins" },
    { name: "AWS Services", href: "/aws-services", icon: "monitor-cloud" },
  ],
};
const Sidebar = ({ user, isCollapsed, headerHeight }) => {
  const menuItems = menuConfig[user.role] || [];

  return (
    <>
      {/* sidebar */}
      <nav
        className={`fixed top-[${headerHeight}] left-0 h-full bg-white shadow-md overflow-y-auto transition`}
        aria-label="Sidebar Navigation"
      >
        <ul className="flex flex-col space-y-1 p-2">
          {menuItems.map(({ name, href, icon }) => (
            <li key={name}>
              <NavLink
                to={href}
                className={({ isActive }) =>
                  `block p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                    isActive
                      ? "bg-blue-600 text-white font-semibold"
                      : "text-gray-700 hover:bg-blue-100"
                  }`
                }
                aria-current={
                  window.location.pathname === href ? "page" : undefined
                }
              >
                <div className="flex items-center gap-1">
                  <DynamicIcon name={icon} />
                  <span
                    className={` ${
                      isCollapsed ? "hidden" : "inline"
                    } font-semibold`}
                  >
                    {name}
                  </span>
                </div>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* overlay for mobile sidebar
      {isCollapsed && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
          aria-hidden="true"
        />
      )} */}
    </>
  );
};

export default React.memo(Sidebar);
