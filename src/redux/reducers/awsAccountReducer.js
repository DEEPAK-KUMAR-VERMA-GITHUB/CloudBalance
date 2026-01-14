import {
  AWS_ACCOUNTS_FETCH_FAILURE,
  AWS_ACCOUNTS_FETCH_REQUEST,
  AWS_ACCOUNTS_FETCH_SUCCESS,

} from "../constants";

const initialState = {
  accounts: [],
  error: "",
  loading: "",
};

export const awsAccountReducer = (state = initialState, action) => {
  switch (action.type) {
    case AWS_ACCOUNTS_FETCH_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case AWS_ACCOUNTS_FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        accounts: action.payload,
      };
    case AWS_ACCOUNTS_FETCH_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
