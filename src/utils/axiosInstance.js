import axios from "axios";
const axiosInstance = axios.create({
  //   baseURL: process.env.REACT_APP_API_URL,
});
axiosInstance.interceptors.request.use(function (config) {
  const token = JSON.parse(localStorage.getItem("disney_token"));

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
