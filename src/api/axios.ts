import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
//create an Axios instance with a config to prevent us from repeating these options in every request

// const BASE_URL = "https://staging-api.mybalanceapp.com/v1";
const BASE_URL = import.meta.env.VITE_BASE_URL

export const publicApi = axios.create({
  baseURL: BASE_URL,
});
export const privateApi = axios.create({
  baseURL: BASE_URL,
});

privateApi.interceptors.request.use(
  (config) => {
    const sessionToken = localStorage.getItem("session_token");
    if (!sessionToken) {
      return config;
    }
    if (sessionToken) {
      if (config.headers) {
        config.headers.Authorization = `Bearer ${sessionToken}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

privateApi.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const navigate = useNavigate()
    if (error.response?.status === 401) {
      localStorage.clear();
      navigate('/')
      console.log(error.response?.status)
      toast.error('Token expire reopen the modal',{
        toastId: 'error1'
      })
    }
    return Promise.reject(error);
  }
);
