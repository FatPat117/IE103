import { useEffect, useState } from "react";
import { Layout, Card, Row, Col, Spin, Typography } from "antd";
import { UserOutlined, BookOutlined } from "@ant-design/icons";
import styles from "./Admin.module.scss";
import { getAllClassesAPI, getAllUsersAPI } from "../../services/api.service";
import { Link } from "react-router-dom";
import { showErrorNotification } from "~/utils/showErrorNotification";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LabelList, Cell } from "recharts";

const { Content } = Layout;
const { Title } = Typography;

const AdminDashboard = () => {
    const [loading, setLoading] = useState(false);
    const [studentCount, setStudentCount] = useState(0);
    const [teacherCount, setTeacherCount] = useState(0);
    const [classCount, setClassCount] = useState(0);

    // Fake data
    const classRegistrationData = [
        { name: "Nhập môn lập trình", percent: 90 },
        { name: "Cấu trúc dữ liệu", percent: 75 },
        { name: "Hệ điều hành", percent: 60 },
        { name: "Mạng máy tính", percent: 80 },
        { name: "Cơ sở dữ liệu", percent: 65 },
        { name: "Toán rời rạc", percent: 55 },
        { name: "Lập trình hướng đối tượng", percent: 70 },
        { name: "Thiết kế web", percent: 85 },
        { name: "AI cơ bản", percent: 50 },
        { name: "Machine Learning", percent: 45 },
        { name: "Kỹ thuật phần mềm", percent: 68 },
        { name: "An toàn mạng", percent: 77 },
    ];

    const fetchData = async () => {
        setLoading(true);
        try {
            const users = await getAllUsersAPI();
            const students = users.filter((u) => u.role === 1);
            const teachers = users.filter((u) => u.role === 2);
            const classes = await getAllClassesAPI();
            setClassCount(classes.length);
            setStudentCount(students.length);
            setTeacherCount(teachers.length);
        } catch (err) {
            showErrorNotification("Không thể lấy dữ liệu người dùng.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Layout className={styles["admin-container"]}>
            <Content style={{ padding: "24px" }}>
                <Spin spinning={loading}>
                    <Row gutter={[24, 24]}>
                        <Col span={8}>
                            <Link to="/admin/students">
                                <Card
                                    className={styles.card}
                                    hoverable
                                    style={{
                                        borderRadius: "12px",
                                        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                                    }}
                                >
                                    <UserOutlined style={{ fontSize: "36px", color: "#4c8bf5" }} />
                                    <Title level={3} style={{ margin: "12px 0 4px" }}>
                                        {studentCount}+ Sinh viên
                                    </Title>
                                    <p style={{ color: "#888" }}>Đã đăng ký</p>
                                </Card>
                            </Link>
                        </Col>
                        <Col span={8}>
                            <Link to="/admin/teachers">
                                <Card
                                    className={styles.card}
                                    hoverable
                                    style={{
                                        borderRadius: "12px",
                                        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                                    }}
                                >
                                    <UserOutlined style={{ fontSize: "36px", color: "#00b96b" }} />
                                    <Title level={3} style={{ margin: "12px 0 4px" }}>
                                        {teacherCount}+ Giảng viên
                                    </Title>
                                    <p style={{ color: "#888" }}>Đang hoạt động</p>
                                </Card>
                            </Link>
                        </Col>
                        <Col span={8}>
                            <Link to="/admin/classes">
                                <Card
                                    className={styles.card}
                                    hoverable
                                    style={{
                                        borderRadius: "12px",
                                        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                                    }}
                                >
                                    <BookOutlined style={{ fontSize: "36px", color: "#ff7d00" }} />
                                    <Title level={3} style={{ margin: "12px 0 4px" }}>
                                        {classCount}+ Lớp học
                                    </Title>
                                    <p style={{ color: "#888" }}>Đã mở</p>
                                </Card>
                            </Link>
                        </Col>
                    </Row>

                    {/* Biểu đồ cột đứng */}
                    <Card
                        style={{
                            marginTop: 48,
                            borderRadius: "12px",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                        }}
                        title="Tỷ lệ sinh viên đăng ký của từng lớp"
                    >
                        <div style={{ width: "100%", overflowX: "auto" }}>
                            <div style={{ minWidth: `${classRegistrationData.length * 80}px`, height: 400 }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={classRegistrationData} margin={{ top: 20, bottom: 50 }}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" angle={-45} textAnchor="end" interval={0} height={80} tick={{ fontSize: 12 }} />
                                        <YAxis domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
                                        <Tooltip formatter={(value) => `${value}%`} />
                                        <Bar dataKey="percent" fill="url(#barColor)">
                                            <LabelList dataKey="percent" position="top" formatter={(val) => `${val}%`} />
                                            {classRegistrationData.map((_, index) => (
                                                <Cell key={`cell-${index}`} />
                                            ))}
                                        </Bar>
                                        <defs>
                                            <linearGradient id="barColor" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor="#4c8bf5" stopOpacity={0.8} />
                                                <stop offset="100%" stopColor="#88c6f7" stopOpacity={0.8} />
                                            </linearGradient>
                                        </defs>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </Card>
                </Spin>
            </Content>
        </Layout>
    );
};

export default AdminDashboard;
