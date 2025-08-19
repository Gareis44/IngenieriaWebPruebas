import { apiClient } from "../api/config.js";

// inicio de sesión
export const loginUser = ({ username, password }) => 
  apiClient.post("/login/", { username, password });

// registro
export const registerUser = ({ username, password1, password2 }) =>
  apiClient.post("/register/", { username, password1, password2 });

// cerrar sesión
export const logoutUser = () => apiClient.post("/logout/");
