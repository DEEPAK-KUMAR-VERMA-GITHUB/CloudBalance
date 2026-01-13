import { apiFetchAllAwsAccounts } from "../../apis/services/awsAccountService";
import {
  AWS_ACCOUNTS_FETCH_FAILURE,
  AWS_ACCOUNTS_FETCH_REQUEST,
  AWS_ACCOUNTS_FETCH_SUCCESS,
} from "../constants";

export const fetchAllAccounts = () => async (dispatch) => {
  dispatch({ type: AWS_ACCOUNTS_FETCH_REQUEST });
  try {
    const response = await apiFetchAllAwsAccounts();
    dispatch({ type: AWS_ACCOUNTS_FETCH_SUCCESS, payload: response });
  } catch (error) {
    dispatch({
      type: AWS_ACCOUNTS_FETCH_FAILURE,
      payload: error.message || "Error in fetching aws accounts",
    });
  }
};
