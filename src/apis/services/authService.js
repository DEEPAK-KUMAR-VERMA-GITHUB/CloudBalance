import apiClient from "../apiClient";

export const apiLogin = async (email, password) => {
  const response = await apiClient.post("/auth/login", { email, password });
  return response.data;
};

export const apiLogout = async () => {
  const response = await apiClient.post("/auth/logout");
  return response.data;
};

export const apiCheckAuth = async () => {
  const response = await apiClient.get("/users/me");
  return response.data;
};
