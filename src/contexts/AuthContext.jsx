import { createContext, useContext, useState } from 'react';
import { LOCAL_STORAGE_USER_KEY } from '../utils/constants';
import { UserRoles } from '../apis/usersData';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

const fetchUserFromLocalStorage = () => {

  const user = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
  return user ? JSON.parse(user) : null;

}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => fetchUserFromLocalStorage());

  const login = async (email, password) => {
    return new Promise((resolve, reject) => {
      // simulate async API call
      setTimeout(() => {
        if (email === "deepak@gmail.com" && password === "SecurePassword@123") {
          const loggedInUser = {
            name: "Deepak Kumar Verma",
            email,
            role: UserRoles.ADMIN,
            isAuthenticated: true,
          };
          setUser(loggedInUser);
          localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(loggedInUser));
          resolve(loggedInUser);
        } else {
          reject(new Error("Invalid credentials"));
        }
      }, 300);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
