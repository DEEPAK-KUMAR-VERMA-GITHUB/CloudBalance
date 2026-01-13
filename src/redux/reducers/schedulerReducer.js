import {
  SCHEDULER_CHANGE_RESOURCE_TYPE,
  SCHEDULER_FETCH_FAILURE,
  SCHEDULER_FETCH_REQUEST,
  SCHEDULER_FETCH_SUCCESS,
} from "../constants";

const initialState = {
  loading: false,
  error: null,
  resourceType: "EC2",
  coverage: {
    scheduled: 0,
    total: 0,
    percentage: 0,
  },
  spending: {
    total: 0,
    forecasted: false,
  },
  saving: {
    achievedJan: 0,
    lifetime: 0,
    potentialMonthly: 0,
  },
  dailySavings: [],
  resources: [],
};

export const schedulerReducer = (state = initialState, action) => {
  switch (action.type) {
    case SCHEDULER_FETCH_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case SCHEDULER_FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        resourceType: action.payload.resourceType,
        coverage: action.payload.data.coverage,
        spending: action.payload.data.spending,
        saving: action.payload.data.saving,
        dailySavings: action.payload.data.dailySavings,
        resources: action.payload.data.resources,
      };

    case SCHEDULER_FETCH_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case SCHEDULER_CHANGE_RESOURCE_TYPE:
      return {
        ...state,
        resourceType: action.payload,
      };
    default:
      return state;
  }
};
