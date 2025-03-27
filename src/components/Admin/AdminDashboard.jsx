import { Layout, Card, Row, Col } from "antd";
import { UserOutlined, BookOutlined, BarChartOutlined } from "@ant-design/icons";
import styles from "./Admin.module.scss";

const { Content } = Layout;

const AdminDashboard = () => {
    return (
        <Layout className={styles["admin-container"]}>
            <Content style={{ padding: "24px" }}>
                <Row gutter={[16, 16]}>
                    <Col span={8}>
                        <Card className={styles.card} hoverable>
                            <UserOutlined style={{ fontSize: "40px", color: "#0077cc" }} />
                            <h3>1000+ Sinh viên</h3>
                            <p>Đã đăng ký</p>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card className={styles.card} hoverable>
                            <BookOutlined style={{ fontSize: "40px", color: "#0077cc" }} />
                            <h3>200+ Môn học</h3>
                            <p>Được mở</p>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card className={styles.card} hoverable>
                            <BarChartOutlined style={{ fontSize: "40px", color: "#0077cc" }} />
                            <h3>Thống kê</h3>
                            <p>Chi tiết</p>
                        </Card>
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
};

export default AdminDashboard;
