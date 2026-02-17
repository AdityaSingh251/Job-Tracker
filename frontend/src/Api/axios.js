import axios from "axios";

// ✅ Change this if your backend port is different
const API = axios.create({
  baseURL: "https://job-tracker-backend-lovatbackend.vercel.app/api",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;
