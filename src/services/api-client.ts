import axios, { AxiosRequestConfig } from "axios";

export interface FetchResponse<T> {
  total: number;
  next: string | null;
  entities: T[];
  page: number;
  pageSize: number;
}

const axiosInstance = axios.create({
  baseURL: "https://nuthatch.lastelm.software",
  headers: {
    "API-Key": import.meta.env.VITE_API_KEY,
  },
});

class APIClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = (config: AxiosRequestConfig) => {
    return axiosInstance
      .get<FetchResponse<T>>(this.endpoint, config)
      .then((res) => {
        return res.data;
      });
  };

  get = (id: number | string) => {
    return axiosInstance
      .get<T>(this.endpoint + "/" + id)
      .then((res) => res.data);
  };
}

export default APIClient;

