/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { ItemResponse, ListPageinated, ListResponse } from "./structure";
import CryptoStorage from "@constants/functions/storage";
// import CryptoStorage from "@constants/functions/storage";
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_PRIVATE_API_URL,
});
const axiosDownloadInstance = axios.create({
  baseURL: import.meta.env.VITE_PRIVATE_DOWNLOAD_API_URL,
});
const axiosNoTokenInstance = axios.create({
  baseURL: import.meta.env.VITE_PRIVATE_API_URL,
});

axiosInstance.interceptors.request.use((config) => {
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
  },
);

axiosDownloadInstance.interceptors.request.use((config) => {
  const data = CryptoStorage.getItem("authData");
  if (data) config.headers["Authorization"] = `Bearer ${data.tokens.access}`;

  return config;
});

axiosDownloadInstance.interceptors.response.use(
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
  },
);

class APIClient<T> {
  endpoint: string;
  axios: AxiosInstance;

  constructor(endpoint: string, isDownload?: boolean) {
    this.endpoint = endpoint;
    this.axios = isDownload ? axiosDownloadInstance : axiosInstance;
  }

  getList = (config?: AxiosRequestConfig) => {
    return this.axios
      .get<ListResponse<T>>(this.endpoint, config)
      .then((res) => res.data);
  };
  getItem = (config?: AxiosRequestConfig) => {
    return this.axios
      .get<ItemResponse<T>>(this.endpoint, config)
      .then((res) => res.data);
  };
  getPageintaed = (config?: AxiosRequestConfig) => {
    return this.axios
      .get<ListPageinated<T>>(this.endpoint, config)
      .then((res) => res.data);
  };
  getPageintaedNoToken = (config?: AxiosRequestConfig) => {
    return axiosNoTokenInstance
      .get<ListPageinated<T>>(this.endpoint, config)
      .then((res) => res.data);
  };
  postPageintaed = (data?: any, config?: AxiosRequestConfig) => {
    return this.axios
      .post<ListPageinated<T>>(this.endpoint, data, config)
      .then((res) => res.data);
  };
  post = (data?: T | FormData, headers?: Record<string, string>) => {
    return this.axios
      .post<T>(this.endpoint, data, headers)
      .then((res) => res.data);
  };
  postNoToken = (data?: T | FormData, headers?: Record<string, string>) => {
    return axiosNoTokenInstance
      .post<T>(this.endpoint, data, headers)
      .then((res) => res.data);
  };
  export = (config?: AxiosRequestConfig) =>
    this.axios
      .get(this.endpoint, {
        headers: {
          "Content-Type":
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        },
        responseType: "arraybuffer",
        params: {
          myvote: true,
          export: "excel",
        },
        ...config,
      })
      .then((res) => res.data);

  exportPost = (config?: AxiosRequestConfig, data?: any) =>
    this.axios
      .post<T>(this.endpoint, data, {
        responseType: "arraybuffer",
        ...config,
      })
      .then((res) => res.data);

  put = (data?: T | FormData, headers?: Record<string, string>) => {
    return this.axios
      .put<T>(this.endpoint, data, headers)
      .then((res) => res.data);
  };
  delete = async (data?: T) => {
    const config = {
      data: data,
    };

    return await this.axios
      .delete(this.endpoint, config)
      .then((res) => res.data);
  };
}

export default APIClient;
