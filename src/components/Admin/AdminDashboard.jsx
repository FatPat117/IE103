import { useEffect, useState } from "react";
import { Layout, Card, Row, Col, Spin, message } from "antd";
import { UserOutlined, BookOutlined, BarChartOutlined } from "@ant-design/icons";
import styles from "./Admin.module.scss";
import { getAllClassesAPI, getAllUsersAPI } from "../../services/api.service";

const { Content } = Layout;

const AdminDashboard = () => {
    const [loading, setLoading] = useState(false);
    const [studentCount, setStudentCount] = useState(0);
    const [teacherCount, setTeacherCount] = useState(0);
    const [classCount, setClassCount] = useState(0);

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
            message.error("Không thể lấy dữ liệu người dùng.");
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
                    <Row gutter={[16, 16]}>
                        <Col span={8}>
                            <Card className={styles.card} hoverable>
                                <UserOutlined style={{ fontSize: "40px", color: "#0077cc" }} />
                                <h3>{studentCount}+ Sinh viên</h3>
                                <p>Đã đăng ký</p>
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card className={styles.card} hoverable>
                                <UserOutlined style={{ fontSize: "40px", color: "#0077cc" }} />
                                <h3>{teacherCount}+ Giảng viên</h3>
                                <p>Đang hoạt động</p>
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card className={styles.card} hoverable>
                                <BookOutlined style={{ fontSize: "40px", color: "#0077cc" }} />
                                <h3>{classCount}+ Lớp học</h3>
                                <p>Đã mở</p>
                            </Card>
                        </Col>
                    </Row>
                </Spin>
            </Content>
        </Layout>
    );
};

export default AdminDashboard;
