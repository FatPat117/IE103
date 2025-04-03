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

        // Lưu token vào localStorage nếu đăng nhập thành công
        if (response.data.tokens && response.data.tokens.accessToken && response.data.tokens.refreshToken) {
            localStorage.setItem("accessToken", response.data.tokens.accessToken);
            localStorage.setItem("refreshToken", response.data.tokens.refreshToken);
            sessionStorage.setItem("userRole", "student");
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

// Hàm lấy thông tin người dùng
export const getUserAPI = async () => {
    try {
        const accessToken = localStorage.getItem("accessToken");

        if (!accessToken) {
            throw new Error("Không có access token.");
        }

        const response = await axios.get("/api/user", {
            headers: {
                Authorization: `Bearer ${accessToken}`, // Gửi access token trong header
            },
            withCredentials: true,
        });

        console.log("Thông tin người dùng:", response);

        if (response.data) {
            localStorage.setItem(
                "user",
                JSON.stringify({
                    email: response.data.email,
                })
            );

            return response.data;
        }

        throw new Error("Không thể lấy thông tin người dùng.");
    } catch (error) {
        console.error("Lỗi khi lấy thông tin người dùng:", error.message);
        throw error;
    }
};

export const logoutAPI = async (email) => {
    try {
        const accessToken = localStorage.getItem("accessToken");

        // Kiểm tra nếu không có accessToken
        if (!accessToken) {
            throw new Error("Không tìm thấy access token.");
        }

        const response = await axios.post(
            "/auth/logout",
            { email },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                withCredentials: true,
            }
        );

        if (response.status === 200) {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("user");

            return response.data;
        }

        throw new Error("Logout không thành công");
    } catch (error) {
        if (error.response) {
            if (error.response.status === 401) {
                throw new Error("Không tìm thấy người dùng với email cung cấp.");
            } else if (error.response.status === 400) {
                throw new Error("Lỗi yêu cầu.");
            }
        }
        throw new Error("Lỗi khi logout: " + (error.message || "Unknown error"));
    }
};
