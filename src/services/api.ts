/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosRequestConfig } from "axios";
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
  isDownload: boolean;

  constructor(endpoint: string, isDownload?: boolean) {
    this.endpoint = endpoint;
    this.isDownload = isDownload || false;
  }

  getList = (config?: AxiosRequestConfig) => {
    return axiosInstance
      .get<ListResponse<T>>(this.endpoint, config)
      .then((res) => res.data);
  };
  getItem = (config?: AxiosRequestConfig) => {
    return this.isDownload
      ? axiosDownloadInstance
          .get<ItemResponse<T>>(this.endpoint, config)
          .then((res) => res.data)
      : axiosInstance
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
  export = (_data?: T | FormData) => {
    const headers = {
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    };
    // const queryParams = new URLSearchParams(data as never).toString();
    // const url = queryParams ? `${this.endpoint}?${queryParams}` : this.endpoint;

    return axiosInstance
      .get(this.endpoint, {
        headers,
        responseType: "arraybuffer",
        params: {
          myvote: true,
          export: "excel",
        },
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
