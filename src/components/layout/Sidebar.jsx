import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  PeopleAlt,
  DashboardCustomize,
  DataExploration,
  FilterDrama,
} from "@mui/icons-material";

const menuConfig = {
  Admin: [
    {
      name: "User Management",
      href: "/user-management",
      icon: <PeopleAlt />,
    },
    { name: "Onboarding", href: "/onboarding", icon: <DashboardCustomize /> },
    {
      name: "Cost Explorer",
      href: "/cost-explorer",
      icon: <DataExploration />,
    },
    { name: "AWS Services", href: "/aws-services", icon: <FilterDrama /> },
  ],
  ReadOnly: [
    {
      name: "Cost Explorer",
      href: "/cost-explorer",
      icon: <DataExploration />,
    },
    { name: "AWS Services", href: "/aws-services", icon: <FilterDrama /> },
  ],
  Customer: [
    { name: "Cost Explorer", href: "/cost-explorer", icon: "hand-coins" },
    { name: "AWS Services", href: "/aws-services", icon: "monitor-cloud" },
  ],
};
const Sidebar = ({ isCollapsed }) => {
  // const {user} = useAuth();
  const { user } = useSelector((state) => state.auth);

  const menuItems = menuConfig[user.role] || [];

  return (
    <>
      {/* sidebar */}
      <nav
        className={`fixed left-0 h-full bg-white shadow-md overflow-y-auto transition`}
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
                  {icon}
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
    </>
  );
};

export default React.memo(Sidebar);
