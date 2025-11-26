import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./contexts/AuthContext";
import AddNewUser from "./pages/AddNewUser";
import AwsServices from "./pages/AwsServices";
import CostExplorer from "./pages/CostExplorer";
import Dashboard from "./pages/Dahboard";
import LoginPage from "./pages/LoginPage";
import Onboarding from "./pages/Onboarding";
import UserManagement from "./pages/UserManagement";
import { UserRoles } from "./apis/usersData";
import Unauthorized from "./pages/Unauthorized";

function App() {
  const { user } = useAuth();

  return (
    <Routes>
      {/* login route */}
      <Route
        path="/login"
        element={
          user && user.isAuthenticated ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <LoginPage />
          )
        }
      />

      {/* protected routes */}

      <Route element={<ProtectedRoute roles={Object.values(UserRoles)} />}>
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/cost-explorer" element={<CostExplorer />} />
          <Route path="/aws-services" element={<AwsServices />} />
        </Route>
      </Route>

      {/* Admin-only routes */}
      <Route element={<ProtectedRoute roles={UserRoles.ADMIN} />}>
        <Route element={<MainLayout />}>
          <Route path="/user-management" element={<UserManagement />} />
          <Route path="/user-management/add-user" element={<AddNewUser />} />
          <Route path="/onboarding" element={<Onboarding />} />
        </Route>
      </Route>

      {/* unauthorized route */}
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Catch all */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default App;
