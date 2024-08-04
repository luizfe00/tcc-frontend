import axios, { AxiosError } from "axios";
import { useUserStore } from "../user/user.store";

const api_url = import.meta.env.API_URL ?? "http://localhost:5000/api";

const axiosInstace = axios.create({
  baseURL: api_url,
});

axiosInstace.interceptors.request.use((config) => {
  let token = useUserStore.getState().user?.token;
  if (!token) {
    const sessionToken = sessionStorage.getItem("tcc_user_token");
    if (sessionToken) {
      token = sessionToken;
    }
  }
  config.headers.Authorization = `Bearer ${token}`;

  return config;
});

axiosInstace.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    if (error?.response?.status === 401) {
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default axiosInstace;
