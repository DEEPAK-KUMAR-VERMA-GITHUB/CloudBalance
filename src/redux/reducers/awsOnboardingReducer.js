import {
  AWS_ONBOARDING_RESET,
  AWS_ONBOARDING_SET_STEP,
  AWS_ONBOARDING_SUBMIT_FAILURE,
  AWS_ONBOARDING_SUBMIT_REQUEST,
  AWS_ONBOARDING_SUBMIT_SUCCESS,
  AWS_ONBOARDING_UPDATE_DATA,
} from "../constants";

const initialState = {
  activeStep: 0,
  data: {
    roleArn: "",
    accountId: "",
    accountAlias: "",
  },
  loading: false,
  error: null,
  completed: false,
};

export const awsOnboardingReducer = (state = initialState, action) => {
  switch (action.type) {
    case AWS_ONBOARDING_SET_STEP:
      return {
        ...state,
        activeStep: action.payload,
      };
    case AWS_ONBOARDING_UPDATE_DATA:
      return {
        ...state,
        data: {
          ...state.data,
          ...action.payload,
        },
      };
    case AWS_ONBOARDING_RESET:
      return initialState;
      
    case AWS_ONBOARDING_SUBMIT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case AWS_ONBOARDING_SUBMIT_SUCCESS:
      return {
        ...state,
        loading: false,
        completed: true,
      };
    case AWS_ONBOARDING_SUBMIT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
