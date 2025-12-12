import { USERS_ADD_REQUEST, USERS_ADD_SUCCESS, USERS_DELETE_REQUEST, USERS_DELETE_SUCCESS, USERS_FETCH_FAILURE, USERS_FETCH_REQUEST, USERS_FETCH_SUCCESS, USERS_UPDATE_REQUEST, USERS_UPDATE_SUCCESS } from "../constants";


const initialUsersState = {
  users: [],
  loading: false,
  error: null,
};

export const usersReducer = (state = initialUsersState, action) => {
  switch (action.type) {
    case USERS_FETCH_REQUEST:
    case USERS_ADD_REQUEST:
    case USERS_UPDATE_REQUEST:
    case USERS_DELETE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case USERS_FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
      };

    case USERS_FETCH_FAILURE:
      return {
        ...state,
        loading: false,
        users: null,
        error: action.payload,
      };

    case USERS_ADD_SUCCESS:
      return {
        ...state,
        loading: false,
        users: [...state.users, action.payload],
      };

    case USERS_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        users: state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user
        ),
      };

    case USERS_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        users: state.users.map((user) => user.id !== action.payload.id),
      };

    default:
      return state;
  }
};

