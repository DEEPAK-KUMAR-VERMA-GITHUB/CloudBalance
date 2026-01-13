import { Navigate, Outlet } from "react-router-dom";
// import { useAuth } from "../contexts/AuthContext";
import { useSelector } from "react-redux";
import Loader from "./Loader";

const ProtectedRoute = ({ roles }) => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  // redirect to login if not authenticated
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  // normalize roles to an array so callers can pass a single string or an array
  roles = roles ? (Array.isArray(roles) ? roles : [roles]) : [];

  // redirect to unauthorized if role not sufficient
  if (roles.length > 0 && !roles.includes(user?.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // render the protected component
  return <Outlet />;
};

export default ProtectedRoute;
