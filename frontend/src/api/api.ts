import axios from "axios";

export const axiosApi = axios.create({
  baseURL: 'https://social-media-vk-backend.onrender.com',
  withCredentials: true,
})