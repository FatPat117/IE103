import axios from "axios";

const instance = axios.create({
    baseURL: import.meta.env.VITE_URL_BACKEND, // Đảm bảo baseURL đúng
    withCredentials: true,
});

// Thêm một interceptor để xử lý khi access token hết hạn
instance.interceptors.response.use(
    (response) => {
        // Trả về response nếu thành công
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        // Kiểm tra nếu lỗi là do access token hết hạn
        if (error.response && error.response.status === 401 && originalRequest && !originalRequest._retry) {
            originalRequest._retry = true; // Ngăn vòng lặp retry vô hạn

            try {
                // Lấy refresh token từ sessionStorage
                const refreshToken = sessionStorage.getItem("refreshToken");
                if (!refreshToken) {
                    console.error("Refresh token không tồn tại. Chuyển hướng đến trang đăng nhập.");
                    window.location.href = "/login"; // Chuyển hướng đến trang đăng nhập
                    throw new Error("Refresh token không tồn tại.");
                }

                // Gọi API để lấy access token mới
                const tokenResponse = await axios.post(
                    `${import.meta.env.VITE_URL_BACKEND}/api/accesstoken`,
                    {},
                    {
                        headers: {
                            "Refresh-Token": refreshToken,
                        },
                    }
                );

                // Sửa điều kiện kiểm tra tên trường
                if (tokenResponse.status === 200 && tokenResponse.data.accessToken) {
                    // Lưu access token mới
                    sessionStorage.setItem("accessToken", tokenResponse.data.accessToken);

                    // Cập nhật header Authorization và gửi lại request ban đầu
                    originalRequest.headers.Authorization = `Bearer ${tokenResponse.data.accessToken}`;
                    return instance(originalRequest); // Gửi lại request ban đầu
                } else {
                    console.error("Không nhận được access token mới từ API.");
                    throw new Error("Không nhận được access token mới.");
                }
            } catch (tokenError) {
                if (tokenError.response && tokenError.response.status === 400) {
                    console.error("Refresh token không hợp lệ hoặc đã hết hạn.");
                    window.location.href = "/login"; // Chuyển hướng đến trang đăng nhập
                }
                throw tokenError;
            }
        }

        // Nếu lỗi không liên quan đến token hết hạn, trả về lỗi
        console.error("Lỗi không liên quan đến token hết hạn:", error.message);
        return Promise.reject(error);
    }
);

export default instance;
