import axios from "axios";
import { getToken } from "./storage";

const AxiosInstance = axios.create({
  baseURL: "https://dessert-resservation-app-server.vercel.app",
});

// attaching  token
AxiosInstance.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default AxiosInstance;
