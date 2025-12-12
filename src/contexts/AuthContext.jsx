import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from "react";
import { LOCAL_STORAGE_USER_KEY } from "../utils/constants";
import { UserRoles } from "../apis/usersData";

const AuthContext = createContext(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

const loadUserFromStorage = () => {
  try {
    const storedUser = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
    return storedUser ? JSON.parse(storedUser) : null;
  } catch {
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => loadUserFromStorage());

  const login = useCallback(async (email, password) => {
    await new Promise((res) => setTimeout(res, 300)); // simulated API call

    if (email === "deepak@gmail.com" && password === "SecurePassword@123") {
      const loggedInUser = {
        name: "Deepak Kumar Verma",
        email,
        role: UserRoles.ADMIN,
        isAuthenticated: true,
      };

      setUser(loggedInUser);
      localStorage.setItem(
        LOCAL_STORAGE_USER_KEY,
        JSON.stringify(loggedInUser)
      );

      return loggedInUser;
    } else {
      throw new Error("Invalid credentials");
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
  }, []);

  const value = useMemo(() => ({ user, login, logout }), [user, login, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
