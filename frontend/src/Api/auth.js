import API from "./axios";

export const registerUser = (formData) =>
  API.post("https://job-tracker-backend-lovatbackend.vercel.app/api/auth/register", formData);

export const loginUser = (formData) =>
  API.post("https://job-tracker-backend-lovatbackend.vercel.app/api/auth/login", formData);
