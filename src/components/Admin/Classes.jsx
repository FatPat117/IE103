import { Layout, Table, Button, Space, Typography, Card } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import styles from "./Admin.module.scss";

const { Content } = Layout;
const { Title } = Typography;

const columns = [
    { title: "Mã lớp", dataIndex: "id", key: "id", align: "center" },
    { title: "Tên lớp", dataIndex: "name", key: "name" },
    { title: "Sĩ số", dataIndex: "size", key: "size", align: "center" },
    {
        title: "Hành động",
        key: "action",
        align: "center",
        render: () => (
            <Space>
                <Button className={styles.editBtn} icon={<EditOutlined />}>
                    Sửa
                </Button>
                <Button className={styles.deleteBtn} icon={<DeleteOutlined />}>
                    Xóa
                </Button>
            </Space>
        ),
    },
];

const data = [
    { key: "1", id: "CL001", name: "Lớp Công nghệ Web", size: 30 },
    { key: "2", id: "CL002", name: "Lớp Cấu trúc dữ liệu", size: 25 },
];

const Classes = () => {
    return (
        <Layout className={styles.pageContainer}>
            <Content>
                <Card className={styles.cardContainer}>
                    <Title level={2} className={styles.pageTitle}>
                        Quản lý Lớp học
                    </Title>
                    <Button type="primary" icon={<PlusOutlined />}>
                        Thêm lớp học
                    </Button>
                    <div className={styles.tableContainer}>
                        <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />
                    </div>
                </Card>
            </Content>
        </Layout>
    );
};

export default Classes;
