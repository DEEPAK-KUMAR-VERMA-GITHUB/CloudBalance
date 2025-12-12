import { Navigate, Outlet } from "react-router-dom";
// import { useAuth } from "../contexts/AuthContext";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ roles }) => {
  // const { user } = useAuth();
  const { user } = useSelector((state) => state.auth);

  // redirect to login if not authenticated
  if (!user) {
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
