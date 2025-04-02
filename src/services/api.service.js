import axios from "./axios.customize";

export const loginAPI = async (username, password, rememberMe = false) => {
    try {
        const response = await axios.post("/auth/login", {
            username,
            password,
            rememberme: rememberMe,
        });

        if (response.accesstoken && response.refreshtoken) {
            localStorage.setItem("accessToken", response.accesstoken);
            localStorage.setItem("refreshToken", response.refreshtoken);
        }

        return response;
    } catch (error) {
        return error?.response?.data ?? error;
    }
};

export const handleRefreshTokenAPI = async () => {
    try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) {
            throw new Error("No refresh token found");
        }

        const response = await axios.post("/api/accesstoken", null, {
            headers: {
                "Refresh-Token": refreshToken, // ✅ Đưa refreshToken vào header thay vì body
            },
        });

        if (response.accesstoken) {
            localStorage.setItem("accessToken", response.accesstoken);
        }

        return response;
    } catch (error) {
        console.error(error);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        return null;
    }
};

export const logoutAPI = async (email) => {
    try {
        const response = await axios.post("/auth/logout", { email });

        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        return response;
    } catch (error) {
        return error?.response?.data ?? error;
    }
};

export const getUserAPI = async () => {
    try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
            throw new Error("No access token found");
        }

        const response = await axios.get("/api/user", {
            headers: {
                Authorization: `Bearer ${accessToken}`, // ✅ Đưa accessToken vào header
            },
        });

        return response;
    } catch (error) {
        console.error(error);
        return null;
    }
};
