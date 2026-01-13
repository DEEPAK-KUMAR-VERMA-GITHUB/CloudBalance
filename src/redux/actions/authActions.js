import {
  apiCheckAuth,
  apiLogin,
  apiLogout,
} from "../../apis/services/authService";
import { LOCAL_STORAGE_USER_KEY } from "../../utils/constants";
import {
  AUTH_CHECK_FAILURE,
  AUTH_CHECK_REQUEST,
  AUTH_CHECK_SUCCESS,
  AUTH_LOGIN_FAILURE,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT,
} from "../constants";

// login action
export const login = (email, password) => async (dispatch) => {
  dispatch({ type: AUTH_LOGIN_REQUEST });

  try {
    const response = await apiLogin(email, password);

    if (response.success) {
      const { data } = response;

      localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(data));
      dispatch({ type: AUTH_LOGIN_SUCCESS, payload: data });
      return data;
    } else {
      const errorMessage = response.error || response.message || "Login failed";
      dispatch({ type: AUTH_LOGIN_FAILURE, payload: errorMessage });
      return;
    }
  } catch (err) {
    // Handle network/axios errors
    console.log("Login error:", err);
    const errorMessage =
      err.response?.data?.error ||
      err.response?.data?.message ||
      err.message ||
      err.error ||
      "Invalid credentials";
    dispatch({ type: AUTH_LOGIN_FAILURE, payload: errorMessage });
  }
};

// logout action - clears cookies on backend
export const logout = () => async (dispatch) => {
  try {
    await apiLogout();
  } catch (error) {
    console.log("Logout api failed : ", error);
  } finally {
    localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
    dispatch({ type: AUTH_LOGOUT });
  }
};

// check authentication status - validates cookies with backend
export const checkAuth = () => async (dispatch) => {
  const storedUser = localStorage.getItem(LOCAL_STORAGE_USER_KEY);

  if (!storedUser) {
    dispatch({ type: AUTH_CHECK_FAILURE });
    return false;
  }

  dispatch({ type: AUTH_CHECK_REQUEST });

  try {
    const user = JSON.parse(storedUser);

    // varify cookies is still by making api call
    await apiCheckAuth();

    dispatch({ type: AUTH_CHECK_SUCCESS, payload: user });
    return true;
  } catch (error) {
    // cookie expired or invalid
    localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
    dispatch({ type: AUTH_CHECK_FAILURE });
    return false;
  }
};
