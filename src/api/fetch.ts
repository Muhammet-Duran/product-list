import Axios, { AxiosInstance } from "axios";

export const fetch: AxiosInstance = Axios.create({
  baseURL: process.env.REACT_APP_BASE_URL || "http://localhost:3000/api",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
