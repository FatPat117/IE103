import { Layout, Menu } from "antd";
import { Link, Outlet } from "react-router-dom";
import { DashboardOutlined, BookOutlined, UserOutlined } from "@ant-design/icons";

const { Header, Content, Sider } = Layout;

const Admin = () => {
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
                    <Menu.Item key="students" icon={<UserOutlined />}>
                        <Link to="/admin/students">Quản lý tài khoản sinh viên</Link>
                    </Menu.Item>
                </Menu>
            </Sider>

            {/* Nội dung chính */}
            <Layout>
                <Header style={{ background: "#fff", padding: 0, textAlign: "center", fontSize: "18px" }}>
                    <b>Admin Dashboard</b>
                </Header>
                <Content>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default Admin;
