import axios from "axios";

export const axiosApi = axios.create({
  baseURL: 'http://localhost:7000',
  withCredentials: true,
})