import {
  fetchCostExplorerData
} from "../../apis/services/costExplorerService";
import {
  COST_EXPLORER_FAIL,
  COST_EXPLORER_REQUEST,
  COST_EXPLORER_SUCCESS
} from "../constants";


export const getCostExplorer = (filters) => async (dispatch) => {
  try {
    dispatch({ type: COST_EXPLORER_REQUEST });

    const data = await fetchCostExplorerData(filters);

    dispatch({
      type: COST_EXPLORER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: COST_EXPLORER_FAIL,
      payload:
        error.response && error.response.data
          ? error.response.data
          : error.message || error.error,
    });
  }
};
