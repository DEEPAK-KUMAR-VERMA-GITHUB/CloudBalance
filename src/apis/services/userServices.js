import apiClient from "../apiClient";
import { dummyUsers } from "../usersData";

let users = [...dummyUsers];

export async function apiGetUsers() {
  const response = await apiClient.get("/users");
  return response.data.data;
}

export async function apiAddUser(userData) {
  const response = await apiClient.post("/users", userData);
  return response.data.data;
}

export async function apiUpdateUser(id, fields) {
  const response = await apiClient.put(`/users/${id}`, fields);
  return response.data.data;
}

export async function apiDeleteUser(id) {
  const response = await apiClient.delete(`/users/${id}`);
  return response.data;
}