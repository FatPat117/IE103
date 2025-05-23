import axios from "./axios.customize";

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
        if (error.response) {
            if (error.response.status === 400) {
                throw new Error("Tài khoản sai định dạng!");
            }
            if (error.response.status === 401) {
                throw new Error("Sai tài khoản hoặc mật khẩu!");
            }
        }
        throw new Error("Lỗi mạng hoặc không lấy được phản hồi từ server.");
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
        if (error.response) {
            if (error.response.status === 400) {
                throw new Error("Yêu cầu không hợp lệ khi lấy thông tin user.");
            }
            if (error.response.status === 401) {
                throw new Error("Token hết hạn hoặc không hợp lệ.");
            }
            if (error.response.status === 404) {
                throw new Error("Không tìm thấy thông tin người dùng.");
            }
            throw new Error(error.response.data?.message || error.message || "Lỗi không xác định");
        }
        throw new Error("Lỗi mạng hoặc không lấy được phản hồi từ server.");
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
        if (error.response) {
            if (error.response.status === 400) {
                throw new Error("Lỗi yêu cầu khi logout.");
            }
            if (error.response.status === 401) {
                throw new Error("Token hết hạn.");
            }
            throw new Error(error.response.data?.message || error.message || "Lỗi không xác định");
        }
        throw new Error("Lỗi mạng hoặc không lấy được phản hồi từ server.");
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
        if (error.response) {
            if (error.response.status === 401) {
                throw new Error("Token hết hạn.");
            }
            if (error.response.status === 404) {
                throw new Error("Không có user nào được tìm thấy.");
            }
            throw new Error(error.response.data?.message || error.message || "Lỗi không xác định");
        }
        throw new Error("Lỗi mạng hoặc không lấy được phản hồi từ server.");
    }
};

// Get user by ID
export const getUserByIdAPI = async (userId) => {
    try {
        const accessToken = sessionStorage.getItem("accessToken");
        if (!accessToken) throw new Error("Không tìm thấy access token trong sessionStorage");

        const response = await axios.get(`/user/${userId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        return response.data;
    } catch (error) {
        if (error.response) {
            if (error.response.status === 401) {
                throw new Error("Token hết hạn.");
            }
            if (error.response.status === 404) {
                throw new Error("Không tìm thấy người dùng.");
            }
            throw new Error(error.response.data?.message || error.message || "Lỗi không xác định");
        }
        throw new Error("Lỗi mạng hoặc không lấy được phản hồi từ server.");
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
        if (error.response) {
            if (error.response.status === 401) {
                throw new Error("Token hết hạn.");
            }
            if (error.response.status === 404) {
                throw new Error("Role hoặc chuyên ngành không tồn tại.");
            }
            throw new Error(error.response.data?.message || error.message || "Lỗi không xác định");
        }
        throw new Error("Lỗi mạng hoặc không lấy được phản hồi từ server.");
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
        if (error.response) {
            if (error.response.status === 401) {
                throw new Error("Token hết hạn.");
            }
            if (error.response.status === 404) {
                throw new Error("Role hoặc khoa không tồn tại.");
            }
            throw new Error(error.response.data?.message || error.message || "Lỗi không xác định");
        }
        throw new Error("Lỗi mạng hoặc không lấy được phản hồi từ server.");
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
        if (error.response) {
            if (error.response.status === 401) {
                throw new Error("Token hết hạn.");
            }
            if (error.response.status === 404) {
                throw new Error("Mã ngành hoặc khoa không tồn tại.");
            }
            throw new Error(error.response.data?.message || error.message || "Lỗi không xác định");
        }
        throw new Error("Lỗi mạng hoặc không lấy được phản hồi từ server.");
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
        if (error.response) {
            if (error.response.status === 401) {
                throw new Error("Token hết hạn.");
            }
            if (error.response.status === 404) {
                throw new Error("Khoa ngành không tồn tại.");
            }
            throw new Error(error.response.data?.message || error.message || "Lỗi không xác định");
        }
        throw new Error("Lỗi mạng hoặc không lấy được phản hồi từ server.");
    }
};

// Xóa sinh viên
export const deleteUserAPI = async (userId) => {
    try {
        const accessToken = sessionStorage.getItem("accessToken");
        if (!accessToken) throw new Error("Không tìm thấy access token trong sessionStorage");

        const response = await axios.delete(`/admin/user/${userId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            withCredentials: true,
        });

        if (response.status === 200) {
            return response.data;
        }

        throw new Error("Xóa sinh viên không thành công.");
    } catch (error) {
        if (error.response) {
            if (error.response.status === 401) {
                throw new Error("Token hết hạn.");
            }
            if (error.response.status === 404) {
                throw new Error("Không tìm thấy sinh viên.");
            }
            throw new Error(error.response.data?.message || error.message || "Lỗi không xác định");
        }
        throw new Error("Lỗi mạng hoặc không lấy được phản hồi từ server.");
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
        if (error.response) {
            if (error.response.status === 401) {
                throw new Error("Token hết hạn.");
            }
            if (error.response.status === 404) {
                throw new Error("Không có khoa nào được tìm thấy.");
            }
            throw new Error(error.response.data?.message || error.message || "Lỗi không xác định");
        }
        throw new Error("Lỗi mạng hoặc không lấy được phản hồi từ server.");
    }
};

// get all majors
export const getAllMajorsAPI = async () => {
    try {
        const accessToken = sessionStorage.getItem("accessToken");
        if (!accessToken) throw new Error("Không tìm thấy access token trong sessionStorage");

        const response = await axios.get("/majors", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        return response.data;
    } catch (error) {
        if (error.response) {
            if (error.response.status === 401) {
                throw new Error("Token hết hạn.");
            }
            if (error.response.status === 404) {
                throw new Error("Không có ngành nào được tìm thấy.");
            }
            throw new Error(error.response.data?.message || error.message || "Lỗi không xác định");
        }
        throw new Error("Lỗi mạng hoặc không lấy được phản hồi từ server.");
    }
};

// get all classes
export const getAllClassesAPI = async () => {
    try {
        const accessToken = sessionStorage.getItem("accessToken");
        if (!accessToken) throw new Error("Không tìm thấy access token trong sessionStorage");

        const response = await axios.get("/classes", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        return response.data;
    } catch (error) {
        if (error.response) {
            if (error.response.status === 500) {
                throw new Error("Lỗi máy chủ khi lấy danh sách lớp học.");
            }
            throw new Error(error.response.data?.message || error.message || "Lỗi không xác định");
        }
        throw new Error("Lỗi mạng hoặc không lấy được phản hồi từ server.");
    }
};

// get class by ID
export const getClassByIdAPI = async (id) => {
    try {
        const accessToken = sessionStorage.getItem("accessToken");
        if (!accessToken) throw new Error("Không tìm thấy access token trong sessionStorage");

        const response = await axios.get(`/classes/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        return response.data;
    } catch (error) {
        if (error.response) {
            if (error.response.status === 404) {
                throw new Error("Không tìm thấy thông tin lớp học.");
            }
            throw new Error(error.response.data?.message || error.message || "Lỗi không xác định");
        }
        throw new Error("Lỗi mạng hoặc không lấy được phản hồi từ server.");
    }
};

// create classes by excel file
export const createClassByExcelAPI = async (file) => {
    try {
        const accessToken = sessionStorage.getItem("accessToken");
        if (!accessToken) throw new Error("Không tìm thấy access token trong sessionStorage");

        const formData = new FormData();
        formData.append("file", file);

        const response = await axios.post("/classes", formData, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "multipart/form-data",
            },
        });

        return response.data;
    } catch (error) {
        if (error.response) {
            if (error.response.status === 400) {
                throw new Error("File không hợp lệ hoặc sai định dạng.");
            }
            if (error.response.status === 409) {
                throw new Error("Dữ liệu trùng với lớp học khác.");
            }
            if (error.response.status === 404) {
                throw new Error("Mã liên quan không tồn tại.");
            }
            throw new Error(error.response.data?.message || error.message || "Lỗi không xác định");
        }
        throw new Error("Lỗi mạng hoặc không lấy được phản hồi từ server.");
    }
};

// delete class by ID
export const deleteClassAPI = async (id) => {
    try {
        const accessToken = sessionStorage.getItem("accessToken");
        if (!accessToken) throw new Error("Không tìm thấy access token trong sessionStorage");

        const response = await axios.delete(`/classes/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        return response.data;
    } catch (error) {
        if (error.response) {
            if (error.response.status === 404) {
                throw new Error("Không tìm thấy lớp học để xóa.");
            }
            throw new Error(error.response.data?.message || error.message || "Lỗi không xác định");
        }
        throw new Error("Lỗi mạng hoặc không lấy được phản hồi từ server.");
    }
};

// update class by ID
export const updateClassByIdAPI = async (id, data) => {
    try {
        const accessToken = sessionStorage.getItem("accessToken");
        if (!accessToken) throw new Error("Không tìm thấy access token trong sessionStorage");

        const response = await axios.put(`/classes/${id}`, data, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        return response.data;
    } catch (error) {
        if (error.response) {
            if (error.response.status === 404) {
                throw new Error("Không tìm thấy lớp học để cập nhật.");
            }
            throw new Error(error.response.data?.message || error.message || "Lỗi không xác định");
        }
        throw new Error("Lỗi mạng hoặc không lấy được phản hồi từ server.");
    }
};

// get all registration forms
export const getAllRegistrationFormsAPI = async () => {
    try {
        const accessToken = sessionStorage.getItem("accessToken");
        if (!accessToken) throw new Error("Không tìm thấy access token trong sessionStorage");

        const response = await axios.get("/registration-forms", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        return response.data;
    } catch (error) {
        if (error.response) {
            if (error.response.status === 404) {
                throw new Error("Không tìm thấy phiếu đăng ký nào.");
            }
            throw new Error(error.response.data?.message || error.message || "Lỗi không xác định");
        }
        throw new Error("Lỗi mạng hoặc không lấy được phản hồi từ server.");
    }
};

// tạo phiếu đăng ký
export const createRegistrationAPI = async (data) => {
    try {
        const accessToken = sessionStorage.getItem("accessToken");
        if (!accessToken) throw new Error("Không tìm thấy access token trong sessionStorage");

        const response = await axios.post("/registration-forms", data, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        return response.data;
    } catch (error) {
        if (error.response?.status === 404) {
            throw new Error("Tạo phiếu đăng ký lỗi: Không tìm thấy lớp học hoặc sinh viên.");
        }
        throw new Error("Đã xảy ra lỗi khi tạo phiếu đăng ký.");
    }
};

//  lấy phiếu đăng ký theo mã PDK
export const getRegistrationFormByIdAPI = async (id) => {
    try {
        const accessToken = sessionStorage.getItem("accessToken");
        if (!accessToken) throw new Error("Không tìm thấy access token trong sessionStorage");

        const response = await axios.get(`/registration-forms/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        return response.data;
    } catch (error) {
        if (error.response) {
            if (error.response.status === 404) {
                throw new Error("Không tìm thấy phiếu đăng ký.");
            }
            throw new Error(error.response.data?.message || error.message || "Lỗi không xác định");
        }
        throw new Error("Lỗi mạng hoặc không lấy được phản hồi từ server.");
    }
};

// thêm lớp học vào phiếu đăng ký
export const addClassToRegistrationAPI = async (registrationId, classId) => {
    try {
        const accessToken = sessionStorage.getItem("accessToken");
        if (!accessToken) throw new Error("Không tìm thấy access token trong sessionStorage");

        const response = await axios.post(
            `/registration-forms/${registrationId}/class/${classId}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        return response.data;
    } catch (error) {
        if (error.response) {
            if (error.response.status === 404) {
                throw new Error("Không tìm thấy phiếu đăng ký hoặc lớp học.");
            }
            throw new Error(error.response.data?.message || error.message || "Lỗi không xác định");
        }
        throw new Error("Lỗi mạng hoặc không lấy được phản hồi từ server.");
    }
};

// xóa lớp học khỏi phiếu đăng ký
export const removeClassFromRegistrationAPI = async (registrationId, classId) => {
    try {
        const accessToken = sessionStorage.getItem("accessToken");
        if (!accessToken) throw new Error("Không tìm thấy access token trong sessionStorage");

        const response = await axios.delete(`/registration-forms/${registrationId}/class/${classId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        return response.data;
    } catch (error) {
        if (error.response) {
            if (error.response.status === 404) {
                throw new Error("Không tìm thấy phiếu đăng ký hoặc lớp học.");
            }
            throw new Error(error.response.data?.message || error.message || "Lỗi không xác định");
        }
        throw new Error("Lỗi mạng hoặc không lấy được phản hồi từ server.");
    }
};

// lấy ra phiếu đăng ký theo mã sinh viên
export const getRegistrationFormByStudentIdAPI = async (studentId) => {
    try {
        const accessToken = sessionStorage.getItem("accessToken");
        if (!accessToken) throw new Error("Không tìm thấy access token trong sessionStorage");

        const response = await axios.get(`/registration-forms/student/${studentId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        return response.data;
    } catch (error) {
        if (error.response) {
            if (error.response.status === 404) {
                throw new Error("Không tìm thấy phiếu đăng ký cho sinh viên này.");
            }
            throw new Error(error.response.data?.message || error.message || "Lỗi không xác định");
        }
        throw new Error("Lỗi mạng hoặc không lấy được phản hồi từ server.");
    }
};