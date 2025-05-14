import { Button, Layout, Menu } from "antd";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { DashboardOutlined, BookOutlined, UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { logoutAPI, getUserAPI } from "../../services/api.service";
import { useState, useEffect } from "react";
import { showErrorNotification } from "../../utils/showErrorNotification";
import { showConfirmModal } from "../../utils/confirmModal";

const { Header, Content, Sider } = Layout;

const Admin = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const userRole = sessionStorage.getItem("userRole");
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleLogout = () => {
        showConfirmModal({
            title: "Xác nhận đăng xuất",
            content: "Bạn có chắc chắn muốn đăng xuất?",
            okText: "Đăng xuất",
            okType: "danger",
            onOk: async () => {
                try {
                    const user = JSON.parse(sessionStorage.getItem("user"));

                    if (!user || !user.email) {
                        showErrorNotification("Không tìm thấy thông tin người dùng!");
                        return;
                    }

                    setLoading(true);
                    const res = await logoutAPI(user.email);

                    if (res) {
                        sessionStorage.clear();
                        localStorage.clear();
                        navigate("/login");
                    }
                } catch (error) {
                    showErrorNotification("Lỗi đăng xuất", error.message);
                } finally {
                    setLoading(false);
                }
            },
        });
    };

    useEffect(() => {
        const loadUser = async () => {
            const cachedUser = sessionStorage.getItem("user");

            if (cachedUser) {
                // Đã có user trong sessionStorage
                setUserDetails(JSON.parse(cachedUser));
            } else {
                // Gọi API để lấy user
                try {
                    const res = await getUserAPI();
                    if (res) {
                        sessionStorage.setItem("user", JSON.stringify(res));
                        setUserDetails(res);
                    }
                } catch (error) {
                    console.error("Lỗi khi lấy thông tin người dùng:", error.message);
                }
            }
        };

        loadUser();
    }, []);

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Sider collapsible>
                <div
                    className="logo"
                    style={{
                        height: "32px",
                        margin: "16px",
                        color: "white",
                        textAlign: "center",
                    }}
                >
                    Admin Panel
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    selectedKeys={[location.pathname]}
                    items={[
                        {
                            key: "/admin",
                            icon: <DashboardOutlined />,
                            label: <Link to="/admin">Dashboard</Link>,
                        },
                        {
                            key: "/admin/classes",
                            icon: <BookOutlined />,
                            label: <Link to="/admin/classes">Lớp học</Link>,
                        },
                        {
                            key: "/admin/students",
                            icon: <UserOutlined />,
                            label: <Link to="/admin/students">Sinh viên</Link>,
                        },
                        {
                            key: "/admin/teachers",
                            icon: <UserOutlined />,
                            label: <Link to="/admin/teachers">Giảng viên</Link>,
                        },
                    ]}
                />
            </Sider>

            <Layout>
                <Header
                    style={{
                        background: "#fff",
                        padding: "0 10px",
                        fontSize: "18px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <div style={{ width: "100px" }}></div>
                    <h1>Admin Dashboard</h1>
                    {userRole === "ADMIN" && (
                        <Button type="primary" icon={<LogoutOutlined />} loading={loading} onClick={handleLogout}>
                            Đăng xuất
                        </Button>
                    )}
                </Header>
                <Content>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default Admin;
