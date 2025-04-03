import axios from "axios";
// import { handleRefreshTokenAPI } from "./api.service";

const instance = axios.create({
    baseURL: import.meta.env.VITE_URL_BACKEND,
    withCredentials: true,
});

// const handleRefreshToken = async () => {
//     try {
//         const res = await handleRefreshTokenAPI();
//         if (res && res.accesstoken) {
//             return res.accesstoken;
//         }
//         throw new Error("No access token in refresh token response");
//     } catch (error) {
//         console.error("Refresh token error:", error);
//         return null;
//     }
// };

// // Interceptor: Gắn Access Token vào mỗi request
// instance.interceptors.request.use(
//     (config) => {
//         const token = localStorage.getItem("accessToken");
//         if (token) {
//             config.headers["Authorization"] = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => Promise.reject(error)
// );

// // Interceptor: Xử lý lỗi 401 và tự động làm mới token
// instance.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//         const originalRequest = error.config;

//         if (
//             error.response &&
//             (error.response.status === 401 || error.response.status === 403) &&
//             !originalRequest._retryCount
//         ) {
//             originalRequest._retryCount = (originalRequest._retryCount || 0) + 1;

//             // Giới hạn số lần thử lại để tránh vòng lặp vô hạn
//             if (originalRequest._retryCount > 3) {
//                 localStorage.removeItem("accessToken");
//                 localStorage.removeItem("refreshToken");
//                 window.location.href = "/login";
//                 return Promise.reject(new Error("Max retry attempts reached"));
//             }

//             const newToken = await handleRefreshToken();
//             if (newToken) {
//                 localStorage.setItem("accessToken", newToken);
//                 originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
//                 return instance(originalRequest);
//             } else {
//                 // Nếu không làm mới được token, chuyển hướng về login
//                 localStorage.removeItem("accessToken");
//                 localStorage.removeItem("refreshToken");
//                 window.location.href = "/login";
//                 return Promise.reject(new Error("Refresh token failed"));
//             }
//         }

//         return Promise.reject(error);
//     }
// );

export default instance;
