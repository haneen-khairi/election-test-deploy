import axios, { AxiosRequestConfig } from "axios";
import { ItemResponse, ListPageinated, ListResponse } from "./structure";
import CryptoStorage from "@constants/functions/storage";
// import CryptoStorage from "@constants/functions/storage";
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_PRIVATE_API_URL,
});
const axiosNoTokenInstance = axios.create({
  baseURL: import.meta.env.VITE_PRIVATE_API_URL,
});

axiosInstance.interceptors.request.use((config) => {
  console.log(config);
  const data = CryptoStorage.getItem("authData");
  if (data) config.headers["Authorization"] = `Bearer ${data.tokens.access}`;

  return config;
});

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (
      error.response.data.detail ===
      "Authentication credentials were not provided."
    ) {
      window.location.href = "/login";
      CryptoStorage.removeItem("isAuth");
      CryptoStorage.removeItem("authData");
    } else if (
      error.response.data.detail === "Given token not valid for any token type"
    ) {
      window.location.href = "/user-verfication";
    }
    return Promise.reject(error);
  }
);

class APIClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getList = (config?: AxiosRequestConfig) => {
    return axiosInstance
      .get<ListResponse<T>>(this.endpoint, config)
      .then((res) => res.data);
  };
  getItem = (config?: AxiosRequestConfig) => {
    return axiosInstance
      .get<ItemResponse<T>>(this.endpoint, config)
      .then((res) => res.data);
  };
  getPageintaed = (config?: AxiosRequestConfig) => {
    return axiosInstance
      .get<ListPageinated<T>>(this.endpoint, config)
      .then((res) => res.data);
  };
  post = (data?: T | FormData, headers?: Record<string, string>) => {
    return axiosInstance
      .post<T>(this.endpoint, data, headers)
      .then((res) => res.data);
  };
  postNoToken = (data?: T | FormData, headers?: Record<string, string>) => {
    return axiosNoTokenInstance
      .post<T>(this.endpoint, data, headers)
      .then((res) => res.data);
  };
  export = (data?: T | FormData) => {
    const headers = {
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    };
    const queryParams = new URLSearchParams(data as never).toString();
    const url = queryParams ? `${this.endpoint}?${queryParams}` : this.endpoint;

    return axiosInstance
      .get(url, {
        headers,
        responseType: "arraybuffer",
      })
      .then((res) => res.data);
  };

  put = (data?: T | FormData, headers?: Record<string, string>) => {
    return axiosInstance
      .put<T>(this.endpoint, data, headers)
      .then((res) => res.data);
  };
  delete = async (data?: T) => {
    const config = {
      data: data,
    };

    return await axiosInstance
      .delete(this.endpoint, config)
      .then((res) => res.data);
  };
}

export default APIClient;
