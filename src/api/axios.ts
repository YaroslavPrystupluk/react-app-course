import axios from "axios";
// import { toast } from "react-toastify";

export const instance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// instance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error),
// );

// // Інтерцептор відповідей — централізована обробка помилок
// instance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     const message = error.response?.data?.message || error.message || "Network error";

//     if (error.response?.status === 401) {
//       // наприклад, редірект на логін при протермінованому токені
//       localStorage.removeItem("token");
//       window.location.href = "/login";
//     }

//     toast.error(message);
//     return Promise.reject(error);
//   },
// );
