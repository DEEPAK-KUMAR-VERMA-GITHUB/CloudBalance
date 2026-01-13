import {
  AWS_ONBOARDING_RESET,
  AWS_ONBOARDING_SET_STEP,
  AWS_ONBOARDING_SUBMIT_FAILURE,
  AWS_ONBOARDING_SUBMIT_REQUEST,
  AWS_ONBOARDING_SUBMIT_SUCCESS,
  AWS_ONBOARDING_UPDATE_DATA,
} from "../constants";

import { apiSubmitAwsAccount } from "../../apis/services/awsAccountService";

export const setActiveStep = (step) => ({
  type: AWS_ONBOARDING_SET_STEP,
  payload: step,
});

export const updateOnboardingData = (data) => ({
  type: AWS_ONBOARDING_UPDATE_DATA,
  payload: data,
});

export const resetOnboarding = () => ({
  type: AWS_ONBOARDING_RESET,
});

export const submitAwsAccount = (accountData) => async (dispatch) => {
  dispatch({ type: AWS_ONBOARDING_SUBMIT_REQUEST });
  console.log("Account data : ", accountData);
  try {
    const result = await apiSubmitAwsAccount(accountData);
    dispatch({ type: AWS_ONBOARDING_SUBMIT_SUCCESS, payload: result });
    console.log("Result : ", result);
    return result;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      error.error ||
      "Failed to submit AWS account";
    dispatch({ type: AWS_ONBOARDING_SUBMIT_FAILURE, payload: errorMessage });
  }
};
