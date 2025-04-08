import axios from "./axios.customize";

// Xử lý lỗi chung
const handleAPIError = (error, customMessages = {}) => {
    if (error.response) {
        const { status, data } = error.response;
        const message = data?.message || error.message || "Lỗi không xác định";

        switch (status) {
            case 400:
                throw new Error(customMessages[400] || `Lỗi yêu cầu: ${message}`);
            case 401:
                throw new Error(customMessages[401] || `Token hết hạn: ${message}`);
            case 404:
                throw new Error(customMessages[404] || `Không tìm thấy: ${message}`);
            default:
                throw new Error(`Lỗi (${status}): ${message}`);
        }
    } else {
        throw new Error("Lỗi mạng hoặc không lấy được phản hồi từ server.");
    }
};

// 1. Login API
export const loginAPI = async (username, password, rememberMe = "false") => {
    try {
        const response = await axios.post(
            "/auth/login",
            { username, password, rememberme: rememberMe },
            {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            }
        );

        const { tokens, role } = response.data;

        if (tokens?.accessToken && tokens?.refreshToken) {
            sessionStorage.setItem("accessToken", tokens.accessToken);
            sessionStorage.setItem("refreshToken", tokens.refreshToken);
            sessionStorage.setItem("userRole", role);
            return response.data;
        }

        throw new Error("Phản hồi từ server không hợp lệ.");
    } catch (error) {
        handleAPIError(error, {
            400: "Tài khoản sai định dạng!",
            401: "Sai tài khoản hoặc mật khẩu!",
        });
    }
};

// 2. Get User Info API
export const getUserAPI = async () => {
    try {
        const accessToken = sessionStorage.getItem("accessToken");
        if (!accessToken) throw new Error("Không tìm thấy access token trong sessionStorage");

        const response = await axios.get("/api/user", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        return response.data;
    } catch (error) {
        handleAPIError(error, {
            400: "Yêu cầu không hợp lệ khi lấy thông tin user.",
            401: "Token hết hạn hoặc không hợp lệ.",
            404: "Không tìm thấy thông tin người dùng.",
        });
    }
};

// 3. Logout API
export const logoutAPI = async (email) => {
    try {
        const accessToken = sessionStorage.getItem("accessToken");
        if (!accessToken) throw new Error("Không tìm thấy access token trong sessionStorage");

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

        if (response.status === 200) return response.data;

        throw new Error("Logout không thành công");
    } catch (error) {
        handleAPIError(error, {
            400: "Lỗi yêu cầu khi logout.",
            401: "Token hết hạn.",
        });
    }
};

// 4. Get all users
export const getAllUsersAPI = async () => {
    try {
        const accessToken = sessionStorage.getItem("accessToken");
        if (!accessToken) throw new Error("Không tìm thấy access token trong sessionStorage");

        const response = await axios.get("/admin/users", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        return response.data;
    } catch (error) {
        handleAPIError(error, {
            401: "Token hết hạn.",
            404: "Không có user nào được tìm thấy.",
        });
    }
};

// Get user by ID
export const getUserByIdAPI = async (userId) => {
    try {
        const accessToken = sessionStorage.getItem("accessToken");
        if (!accessToken) throw new Error("Không tìm thấy access token trong sessionStorage");

        const response = await axios.get(`/admin/user/${userId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        return response.data;
    } catch (error) {
        handleAPIError(error, {
            401: "Token hết hạn.",
            404: "Không tìm thấy người dùng.",
        });
    }
};

// Create new user
export const createStudentAPI = async (data) => {
    try {
        const accessToken = sessionStorage.getItem("accessToken");
        if (!accessToken) throw new Error("Không tìm thấy access token trong sessionStorage");

        const response = await axios.post("/admin/user/student", data, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            withCredentials: true,
        });

        if (response.status === 201) {
            return response.data;
        }

        throw new Error("Tạo người dùng không thành công.");
    } catch (error) {
        handleAPIError(error, {
            401: "Token hết hạn.",
            404: "Role hoặc chuyên ngành không tồn tại.",
        });
    }
};

// create teacher API

export const createTeacherAPI = async (data) => {
    try {
        const accessToken = sessionStorage.getItem("accessToken");
        if (!accessToken) throw new Error("Không tìm thấy access token trong sessionStorage");

        const response = await axios.post("/admin/user/teacher", data, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            withCredentials: true,
        });

        if (response.status === 201) {
            return response.data;
        }

        throw new Error("Tạo tài khoản giáo viên không thành công.");
    } catch (error) {
        handleAPIError(error, {
            401: "Token hết hạn.",
            404: "Role hoặc khoa không tồn tại.",
        });
    }
};


// 6. Update student info
export const updateStudentAPI = async (userId, data) => {
    try {
        const accessToken = sessionStorage.getItem("accessToken");
        if (!accessToken) throw new Error("Không tìm thấy access token trong sessionStorage");

        const response = await axios.put(`/admin/user/student/${userId}`, data, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            withCredentials: true,
        });

        if (response.status === 200) {
            return response.data;
        }

        throw new Error("Cập nhật thông tin người dùng không thành công.");
    } catch (error) {
        handleAPIError(error, {
            401: "Token hết hạn.",
            404: "Mã ngành hoặc khoa không tồn tại.",
        });
    }
};

// 7. Update teacher info
export const updateTeacherAPI = async (userId, data) => {
    try {
        const accessToken = sessionStorage.getItem("accessToken");
        if (!accessToken) throw new Error("Không tìm thấy access token trong sessionStorage");

        const response = await axios.put(`/admin/user/teacher/${userId}`, data, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            withCredentials: true,
        });

        if (response.status === 200) {
            return response.data;
        }

        throw new Error("Cập nhật thông tin giáo viên không thành công.");
    } catch (error) {
        handleAPIError(error, {
            401: "Token hết hạn.",
            404: "Khoa ngành không tồn tại.",
        });
    }
};


// lấy ra tất cả các khoa
export const getAllDepartmentsAPI = async () => {
    try {
        const accessToken = sessionStorage.getItem("accessToken");
        if (!accessToken) throw new Error("Không tìm thấy access token trong sessionStorage");

        const response = await axios.get("/khoa", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        return response.data;
    } catch (error) {
        handleAPIError(error, {
            401: "Token hết hạn.",
            404: "Không có khoa nào được tìm thấy.",
        });
    }
};