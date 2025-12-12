import { LogOut } from "lucide-react";
import React, { useRef } from "react";
import userAvatarImage from "../../assets/images/avatar.png";
import { useAuth } from "../../contexts/AuthContext";
import { capitalize } from "../../utils/helper";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/actions";
import toast from "react-hot-toast";

const Navbar = ({ toggleSidebar }) => {
  // const { user, logout } = useAuth();
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <header className="w-full bg-white flex items-center justify-between px-6 py-3 sticky top-0 z-50">
      <div className="flex items-center">
        {/* branding */}
        <div className="text-xl font-semibold tracking-wide">CloudBalance</div>
        {/* sidebar toggler */}
        <button
          onClick={toggleSidebar}
          aria-label="Toggle menu"
          className="m-2 text-gray-700 cursor-pointer"
        >
          ☰
        </button>
      </div>

      {/* user info and logout */}
      <div className="flex items-center space-x-4">
        <div className="w-8 rounded-full overflow-hidden ring ring-blue-700 shadow cursor-pointer ">
          <img
            src={userAvatarImage}
            alt="avatar image"
            className="object-cover"
          />
        </div>

        <div>
          <p className="text-xs">Welcome</p>
          <p
            className="text-sm font-medium text-blue-800 "
            aria-label="Current User"
          >
            {capitalize(user.name)}
          </p>
        </div>

        <button
          onClick={handleLogout}
          aria-label="Logout"
          type="button"
          className="flex items-center gap-1 p-2 border border-blue-800 rounded text-blue-800 hover:bg-blue-100 transition-colors  cursor-pointer "
        >
          <LogOut />
          Logout
        </button>
      </div>
    </header>
  );
};

export default React.memo(Navbar);
