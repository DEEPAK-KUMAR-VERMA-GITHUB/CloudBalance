import {
  USER_ACCOUNTS_FETCH_FAIL,
  USER_ACCOUNTS_FETCH_REQUEST,
  USER_ACCOUNTS_FETCH_SUCCESS,
  USER_ACCOUNTS_UPDATE_FAIL,
  USER_ACCOUNTS_UPDATE_REQUEST,
  USER_ACCOUNTS_UPDATE_SUCCESS,
} from "../constants";

const initialState = {
  assignedAccounts: [],
  loading: false,
  error: null,
};

export const userAccountsReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_ACCOUNTS_UPDATE_REQUEST:
    case USER_ACCOUNTS_FETCH_REQUEST:
      return { ...state, loading: true };
    case USER_ACCOUNTS_UPDATE_SUCCESS:
    case USER_ACCOUNTS_FETCH_SUCCESS:
      return {
        ...state,
        assignedAccounts: Array.isArray(action.payload) ? action.payload : [],
        loading: false,
        error: null,
      };
    case USER_ACCOUNTS_FETCH_FAIL:
    case USER_ACCOUNTS_UPDATE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
