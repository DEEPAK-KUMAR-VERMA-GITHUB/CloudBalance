import {
  apiAddUser,
  apiDeleteUser,
  apifetchUserAccounts,
  apiGetUsers,
  apiUpdateUser,
  assignUserAwsAccounts,
  revokeUserAwsAccounts,
} from "../../apis/services/userServices";
import {
  USER_ACCOUNTS_FETCH_FAIL,
  USER_ACCOUNTS_FETCH_REQUEST,
  USER_ACCOUNTS_FETCH_SUCCESS,
  USER_ACCOUNTS_UPDATE_FAIL,
  USER_ACCOUNTS_UPDATE_REQUEST,
  USER_ACCOUNTS_UPDATE_SUCCESS,
  USERS_ADD_FAILURE,
  USERS_ADD_REQUEST,
  USERS_ADD_SUCCESS,
  USERS_DELETE_FAILURE,
  USERS_DELETE_REQUEST,
  USERS_DELETE_SUCCESS,
  USERS_FETCH_FAILURE,
  USERS_FETCH_REQUEST,
  USERS_FETCH_SUCCESS,
  USERS_UPDATE_FAILURE,
  USERS_UPDATE_REQUEST,
  USERS_UPDATE_SUCCESS,
} from "../constants";

export const fetchUsers = (params) => async (dispatch) => {
  dispatch({ type: USERS_FETCH_REQUEST });

  const query = new URLSearchParams(params).toString();

  try {
    const response = await apiGetUsers(query);
    dispatch({ type: USERS_FETCH_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: USERS_FETCH_FAILURE,
      payload: error.message || "Error in fetching users data",
    });
  }
};

export const addUser = (userData) => async (dispatch) => {
  dispatch({ type: USERS_ADD_REQUEST });
  try {
    const user = await apiAddUser(userData);
    dispatch({ type: USERS_ADD_SUCCESS, payload: user });
  } catch (error) {
    dispatch({
      type: USERS_ADD_FAILURE,
      payload: error.message || "Error in inserting new user",
    });
    throw error;
  }
};

export const updateUser = (id, fields) => async (dispatch) => {
  dispatch({ type: USERS_UPDATE_REQUEST });
  try {
    const updatedUser = await apiUpdateUser(id, fields);
    dispatch({ type: USERS_UPDATE_SUCCESS, payload: updatedUser });
  } catch (error) {
    dispatch({
      type: USERS_UPDATE_FAILURE,
      payload: error.message || "Error in updating user",
    });
    throw error;
  }
};

export const deleteUser = (id) => async (dispatch) => {
  dispatch({ type: USERS_DELETE_REQUEST });
  try {
    const deletedUser = await apiDeleteUser(id);
    dispatch({ type: USERS_DELETE_SUCCESS, payload: deletedUser });
  } catch (error) {
    dispatch({
      type: USERS_DELETE_FAILURE,
      payload: error.message || "Error in deleting user",
    });
    throw error;
  }
};

export const fetchUserAssignedAccounts = (userId) => async (dispatch) => {
  dispatch({ type: USER_ACCOUNTS_FETCH_REQUEST });
  try {
    const data = await apifetchUserAccounts(userId);
    dispatch({ type: USER_ACCOUNTS_FETCH_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_ACCOUNTS_FETCH_FAIL,
      payload: error.response?.data || error.message,
    });
  }
};

export const assignUserAccounts = (userId, accountIds) => async (dispatch) => {
  try {
    dispatch({ type: USER_ACCOUNTS_UPDATE_REQUEST });

    const data = await assignUserAwsAccounts(userId, accountIds);

    dispatch({
      type: USER_ACCOUNTS_UPDATE_SUCCESS,
      payload: data,
    });
    dispatch(fetchUserAssignedAccounts(userId))
  } catch (error) {
    dispatch({
      type: USER_ACCOUNTS_UPDATE_FAIL,
      payload: error.response?.data || error.message,
    });
  }
};

export const unAssignUserAccounts =
  (userId, accountIds) => async (dispatch) => {
    try {
      dispatch({ type: USER_ACCOUNTS_UPDATE_REQUEST });

      const data = await revokeUserAwsAccounts(userId, accountIds);

      dispatch({
        type: USER_ACCOUNTS_UPDATE_SUCCESS,
        payload: data,
      });
      dispatch(fetchUserAssignedAccounts(userId))
    } catch (error) {
      dispatch({
        type: USER_ACCOUNTS_UPDATE_FAIL,
        payload: error.response?.data || error.message,
      });
    }
  };
