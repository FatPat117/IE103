import axios from "axios";

const instance = axios.create({
    baseURL: import.meta.env.VITE_URL_BACKEND,
    withCredentials: true,
});

instance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        if (
            error.response &&
            error.response.status === 401 &&
            originalRequest &&
            !originalRequest._retry &&
            !originalRequest.url.includes("/auth/login")
        ) {
            originalRequest._retry = true;

            try {
                const refreshToken = sessionStorage.getItem("refreshToken");


                if (!refreshToken) {
                    // Nếu chưa có refreshToken thì trả lỗi 401 luôn
                    return Promise.reject(error);
                }

                const tokenResponse = await axios.post(
                    `${import.meta.env.VITE_URL_BACKEND}/api/accesstoken`,
                    {},
                    {
                        headers: {
                            "Refresh-Token": refreshToken,
                        },
                    }
                );

                if (tokenResponse.status === 200 && tokenResponse.data.accessToken) {
                    sessionStorage.setItem("accessToken", tokenResponse.data.accessToken);

                    originalRequest.headers.Authorization = `Bearer ${tokenResponse.data.accessToken}`;
                    return instance(originalRequest);
                } else {
                    console.error("Không nhận được access token mới từ API.");
                    throw new Error("Không nhận được access token mới.");
                }
            } catch (tokenError) {
                if (tokenError.response && tokenError.response.status === 400) {
                    console.error("Refresh token không hợp lệ hoặc đã hết hạn.");
                    window.location.href = "/login"; 
                }
                throw tokenError;
            }
        }

        console.error("Lỗi không liên quan đến token hết hạn:", error.message);
        return Promise.reject(error);
    }
);

export default instance;
