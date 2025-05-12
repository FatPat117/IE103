import { Button, Layout, Menu } from "antd";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { DashboardOutlined, BookOutlined, UserOutlined } from "@ant-design/icons";

const { Header, Content, Sider } = Layout;

const Admin = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const userRole = sessionStorage.getItem("userRole");

    const handleBack = () => {
        navigate("/");
    };

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
                        <Button type="primary" onClick={handleBack}>
                            Back to Dashboard
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
