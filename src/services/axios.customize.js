import axios from "axios";
import { handleRefreshTokenAPI } from "./api.service"

const instance = axios.create({
    baseURL: import.meta.env.VITE_URL_BACKEND, // Lấy URL Backend từ biến môi trường
    withCredentials: true, // Cho phép gửi cookie nếu backend yêu cầu
});

const handleRefreshToken = async () => {
    try {
        const res = await handleRefreshTokenAPI();
        if (res && res.data) {
            return res.data.accesstoken;
        }
    } catch (error) {
        console.error(error);
        return null;
    }
};

// Tên header dùng để tránh retry vô hạn
const NO_RETRY_HEADER = "x-no-retry";

// 📌 **Interceptor: Gắn Access Token vào mỗi request**
instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// 📌 **Interceptor: Kiểm tra lỗi 401 và tự động refresh token**
instance.interceptors.response.use(
    (response) => response.data,
    async (error) => {
        const originalRequest = error.config;

        if (error.response && error.response.status === 401 && !originalRequest.headers[NO_RETRY_HEADER]) {
            const newToken = await handleRefreshToken();

            if (newToken) {
                localStorage.setItem("accessToken", newToken);
                originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
                originalRequest.headers[NO_RETRY_HEADER] = "true";

                return instance(originalRequest);
            }
        }

        // Nếu refresh token thất bại, chuyển về trang login
        if (error.response && error.response.status === 400) {
            window.location.href = "/login";
        }

        return Promise.reject(error);
    }
);

export default instance;
