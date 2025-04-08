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
                <Menu
                    theme="dark"
                    mode="inline"
                    items={[
                        {
                            key: "dashboard",
                            icon: <DashboardOutlined />,
                            label: <Link to="/admin">Dashboard</Link>,
                        },
                        {
                            key: "classes",
                            icon: <BookOutlined />,
                            label: <Link to="/admin/classes">Lớp học</Link>,
                        },
                        {
                            key: "students",
                            icon: <UserOutlined />,
                            label: <Link to="/admin/students">Sinh viên</Link>,
                        },
                        {
                            key: "teachers",
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
