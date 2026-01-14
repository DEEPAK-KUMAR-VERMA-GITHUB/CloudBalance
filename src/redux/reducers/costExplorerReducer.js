import {
  COST_EXPLORER_FAIL,
  COST_EXPLORER_REQUEST,
  COST_EXPLORER_SUCCESS,
} from "../constants";

const initialState = {
  loading: false,
  data: null,
  error: null,
};

export const costExplorerReducer = (state = initialState, action) => {
  switch (action.type) {
    case COST_EXPLORER_REQUEST:
      return { ...state, loading: true };
    case COST_EXPLORER_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case COST_EXPLORER_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
