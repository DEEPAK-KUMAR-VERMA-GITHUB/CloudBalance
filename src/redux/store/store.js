import { applyMiddleware, combineReducers, createStore } from "redux";
import { thunk } from "redux-thunk";
import {
  authReducer,
  awsAccountReducer,
  awsOnboardingReducer,
  costExplorerReducer,
  schedulerReducer,
  userAccountsReducer,
  usersReducer,
} from "../reducers";

const rootReducer = combineReducers({
  auth: authReducer,
  users: usersReducer,
  awsOnboarding: awsOnboardingReducer,
  awsAccounts: awsAccountReducer,
  costExplorer: costExplorerReducer,
  scheduler: schedulerReducer,
  userAccounts: userAccountsReducer,
});

// enable redux devtools extenstion if available
const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  ((x) => x);

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
