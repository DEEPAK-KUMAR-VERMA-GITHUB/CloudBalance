import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ProtectedRoute = ({ roles = [] }) => {
  const { user } = useAuth();

  // redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // redirect to unauthorized if role not sufficient
  if (roles.length > 0 && !roles.includes(user?.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // render the protected component
  return <Outlet />;
};

export default ProtectedRoute;
