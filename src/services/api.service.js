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

        // Lưu token vào sessionStorage nếu đăng nhập thành công
        if (response.data.tokens && response.data.tokens.accessToken && response.data.tokens.refreshToken) {
            sessionStorage.setItem("accessToken", response.data.tokens.accessToken);
            sessionStorage.setItem("refreshToken", response.data.tokens.refreshToken);
            sessionStorage.setItem("userRole", response.data.role);

            console.log("đăng nhập đc r");

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
        const accessToken = sessionStorage.getItem("accessToken");

        if (!accessToken) {
            throw new Error("Không có access token.");
        }

        const response = await axios.get("/api/user", {
            headers: {
                Authorization: `Bearer ${accessToken}`, // Gửi access token trong header
            },
            withCredentials: true,
        });

        if (response.data) {
            sessionStorage.setItem(
                "user",
                JSON.stringify({
                    email: response.data.email,
                })
            );

            console.log("đã lấy được thông tin người dùng");

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
        const accessToken = sessionStorage.getItem("accessToken");

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
            sessionStorage.removeItem("accessToken");
            sessionStorage.removeItem("refreshToken");
            sessionStorage.removeItem("user");

            console.log("đã xóa thành công");

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
