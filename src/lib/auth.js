import api from "./api";
import { ENDPOINTS } from "./endpoints";

export const loginRequest = (data) => {
  return api.post(ENDPOINTS.LOGIN, data);
};
