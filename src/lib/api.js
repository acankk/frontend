import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error("API ERROR:", err.message);
    return Promise.reject(err);
  }
);

export default api;
