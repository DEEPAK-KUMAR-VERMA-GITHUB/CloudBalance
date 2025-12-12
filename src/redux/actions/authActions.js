import { UserRoles } from "../../apis/usersData";
import { LOCAL_STORAGE_USER_KEY } from "../../utils/constants";
import {
  AUTH_LOGIN_FAILURE,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT,
} from "../constants";

export const login = (email, password) => async (dispatch) => {
  dispatch({ type: AUTH_LOGIN_REQUEST });

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === "deepak@gmail.com" && password === "SecurePassword@123") {
        const user = {
          name: "Deepak Kumar Verma",
          email,
          role: UserRoles.ADMIN,
          isAuthenticated: true,
        };

        dispatch({ type: AUTH_LOGIN_SUCCESS, payload: user });
        localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(user));
        resolve(user);
      } else {
        const error = "Invalid Credentials";
        dispatch({ type: AUTH_LOGIN_FAILURE, payload: error });
        reject(error);
      }
    }, 30);
  });
};

export const logout = () => (dispatch) => {
  localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
  dispatch({ type: AUTH_LOGOUT });
};
