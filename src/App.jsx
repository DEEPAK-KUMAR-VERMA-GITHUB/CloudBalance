import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MainLayout from "./components/layout/MainLayout";
import toast from "react-hot-toast";
import Dashboard from "./pages/Dahboard";
import UserManagement from "./pages/UserManagement";
import Onboarding from "./pages/Onboarding";
import CostExplorer from "./pages/CostExplorer";
import AwsServices from "./pages/AwsServices";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./contexts/AuthContext";

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

      <Route
        element={<ProtectedRoute roles={["Admin", "ReadOnly", "Customer"]} />}
      >
        <Route element={<MainLayout user={user} />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/cost-explorer" element={<CostExplorer />} />
          <Route path="/aws-services" element={<AwsServices />} />
        </Route>
      </Route>

      {/* Admin-only routes */}
      <Route element={<ProtectedRoute roles={["Admin"]} />}>
        <Route element={<MainLayout user={user} />}>
          <Route path="/user-management" element={<UserManagement />} />
          <Route path="/onboarding" element={<Onboarding />} />
        </Route>
      </Route>
      {/* 
      <Route
        path="/"
        element={
          user?.isAuthenticated ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      /> */}
      {/* Catch all */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
