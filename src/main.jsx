import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.jsx";
// import { AuthProvider } from "./contexts/AuthContext.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/store/store.js";
import AuthInitializer from "./components/AuthInitializer.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Router>
      <AuthInitializer>
        <App />
        <Toaster position="top-center" />
      </AuthInitializer>
    </Router>
  </Provider>
);
