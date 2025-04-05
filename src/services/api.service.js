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

        if (response.data.tokens && response.data.tokens.accessToken && response.data.tokens.refreshToken) {
            sessionStorage.setItem("accessToken", response.data.tokens.accessToken);
            sessionStorage.setItem("refreshToken", response.data.tokens.refreshToken);
            sessionStorage.setItem("userRole", response.data.role);
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

// 2. Get User Info API
export const getUserAPI = async () => {
    try {
        const response = await axios.get("/api/user", {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error("Lỗi khi lấy thông tin người dùng:", error.message);
        throw error;
    }
};

// 3. Logout API
export const logoutAPI = async (email) => {
    try {
        // Gửi request logout
        const response = await axios.post(
            "/auth/logout",
            { email },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`, // Lấy accessToken hiện tại
                },
                withCredentials: true,
            }
        );

        if (response.status === 200) {
            return response.data;
        }

        throw new Error("Logout không thành công");
    } catch (error) {
        if (error.response) {
            if (error.response.status === 401) {
                throw new Error("Token hết hạn");
            } else if (error.response.status === 400) {
                throw new Error("Lỗi yêu cầu.");
            }
        }
        throw new Error("Lỗi khi logout: " + (error.message || "Unknown error"));
    }
};