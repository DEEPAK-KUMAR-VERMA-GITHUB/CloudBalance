import React from "react";
import { useAuth } from "../../contexts/AuthContext";

const Navbar = ({ user }) => {
  const {logout} = useAuth();
  return (
    <header className="w-full bg-gray-800 text-white flex items-center justify-between px-6 py-3 sticky top-0 z-50">
      {/* branding */}
      <div className="text-xl font-semibold tracking-wide">CloudBalance</div>

      {/* user info and logout */}
      <div className="flex items-center space-x-4">
        <span className="text-sm font-medium" aria-label="Current User">
          {user.name}
        </span>
        <button
          onClick={logout}
          aria-label="Logout"
          type="button"
          className="bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-1 px-3 py-1 rounded text-sm transition-colors duration-200"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default React.memo(Navbar);
