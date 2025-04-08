import { Button, Layout, Menu } from "antd";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { DashboardOutlined, BookOutlined, UserOutlined } from "@ant-design/icons";

const { Header, Content, Sider } = Layout;

const Admin = () => {
    const navigate = useNavigate();
    const userRole = sessionStorage.getItem("userRole");

    const handleBack = () => {
        navigate("/");
    };

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Sider collapsible>
                <div className="logo" style={{ height: "32px", margin: "16px", color: "white", textAlign: "center" }}>
                    Admin Panel
                </div>
                <Menu theme="dark" mode="inline">
                    <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
                        <Link to="/admin">Dashboard</Link>
                    </Menu.Item>
                    <Menu.Item key="subjects" icon={<BookOutlined />}>
                        <Link to="/admin/subjects">Quản lý môn học</Link>
                    </Menu.Item>
                    <Menu.Item key="user" icon={<UserOutlined />}>
                        <Link to="/admin/students">Quản lý tài khoản sinh viên</Link>
                    </Menu.Item>
                </Menu>
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
