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

const fetchUserFromLocalStorage = () => {
  const userData = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
  return userData ? JSON.parse(userData) : null;
};

const initialAuthState = {
  user: fetchUserFromLocalStorage(),
  loading: false,
  isAuthenticated: false,
  error: null,
  checking: true, // for initial auth checking
};

export const authReducer = (state = initialAuthState, action) => {
  switch (action.type) {
    case AUTH_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case AUTH_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        isAuthenticated: true,
        error: null,
      };

    case AUTH_LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        user: null,
        isAuthenticated: false,
        error: action.payload,
      };

    case AUTH_CHECK_REQUEST:
      return {
        ...state,
        checking: true,
      };

    case AUTH_CHECK_SUCCESS:
      return {
        ...state,
        checking: false,
        user: action.payload,
        isAuthenticated: true,
      };

    case AUTH_CHECK_FAILURE:
      return {
        ...state,
        checking: false,
        user: null,
        isAuthenticated: false,
      };

    case AUTH_LOGOUT:
      return {
        ...state,
        loading: false,
        user: null,
        isAuthenticated: false,
        error: null,
      };

    default:
      return state;
  }
};
