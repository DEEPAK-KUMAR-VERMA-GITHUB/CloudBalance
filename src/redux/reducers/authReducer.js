import { LOCAL_STORAGE_USER_KEY } from "../../utils/constants";
import { AUTH_LOGIN_FAILURE, AUTH_LOGIN_REQUEST, AUTH_LOGIN_SUCCESS, AUTH_LOGOUT } from "../constants";



const fetchUserFromLocalStorage = () => {
  const userData = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
  return userData ? JSON.parse(userData) : null;
};

const initialAuthState = {
  user: fetchUserFromLocalStorage(),
  loading: false,
  isAuthenticated: false,
  error: null,
};

export const authReducer = (state = initialAuthState, action) => {
  switch (action.type) {
    case AUTH_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case AUTH_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        isAuthenticated: true,
      };

    case AUTH_LOGIN_FAILURE:
      return {
        ...state,

        error: action.payload,
      };

    case AUTH_LOGOUT:
      return {
        ...state,
        loading: false,
        user: null,
        error: null,
      };

    default:
      return state;
  }
};

