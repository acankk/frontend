import axios from "axios";
import api from "./api";
import { ENDPOINTS } from "./endpoints";

const authApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const loginRequest = (data) => {
  return authApi.post(ENDPOINTS.LOGIN, data);
};

export const registerRequest = (data) => {
  return authApi.post(ENDPOINTS.REGISTER, data);
};

export const profileRequest = () => {
  return api.get(ENDPOINTS.PROFILE);
};