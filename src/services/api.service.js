import axios from "./axios.customize";

// 1. Login API
export const loginAPI = async (username, password, rememberMe = "false") => {
    try {
        const response = await axios.post(
            "/auth/login",
            {
                username,
                password,
                rememberme: rememberMe,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            }
        );

        console.log(response);

        // Lưu token vào localStorage nếu đăng nhập thành công
        if (response.data.tokens && response.data.tokens.accessToken && response.data.tokens.refreshToken) {
            localStorage.setItem("accessToken", response.data.tokens.accessToken);
            localStorage.setItem("refreshToken", response.data.tokens.refreshToken);
            return response.data;
        }

        throw new Error("Invalid response from login API");
    } catch (error) {
        if (error.response) {
            if (error.response.status === 401) {
                throw new Error("Sai tài khoản hoặc mật khẩu!");
            } else if (error.response.status === 400) {
                throw new Error("Tài khoản sai định dạng!");
            }
        }
        throw new Error("Lỗi đăng nhập: " + (error.message || "Unknown error"));
    }
};
