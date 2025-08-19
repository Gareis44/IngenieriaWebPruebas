import axios from "axios";

export const API_URL = "http://localhost:8000";

export const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true, // si usas cookies para auth
});
