import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const access = localStorage.getItem("access");
    const url = config.url || "";

    const isPublic =
      url === "/login/" ||
      url === "/register/" ||

      url === "/products/" ||
      /^\/products\/\d+\/$/.test(url) ||

      url === "/jasa/" ||
      /^\/jasa\/\d+\/$/.test(url) ||

      url === "/portfolio/" ||
      /^\/portfolio\/\d+\/$/.test(url) ||

      url === "/team/" ||
      /^\/team\/\d+\/$/.test(url) ||

      /^\/team\/\d+\/members\/$/.test(url);

    if (access && !isPublic) {
      config.headers.Authorization = `Bearer ${access}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;