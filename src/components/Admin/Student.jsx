import { Layout, Table, Button, Space, Typography, Card } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import styles from "./Admin.module.css";

const { Content } = Layout;
const { Title } = Typography;

const columns = [
    { title: "Mã số sinh viên", dataIndex: "id", key: "id", align: "center" },
    { title: "Họ và tên", dataIndex: "name", key: "name" },
    { title: "Lớp", dataIndex: "class", key: "class", align: "center" },
    {
        title: "Hành động",
        key: "action",
        align: "center",
        render: () => (
            <Space>
                <Button type="primary" icon={<EditOutlined />} className={styles.editBtn}>
                    Sửa
                </Button>
                <Button type="danger" icon={<DeleteOutlined />} className={styles.deleteBtn}>
                    Xóa
                </Button>
            </Space>
        ),
    },
];

const data = [
    { key: "1", id: "SV001", name: "Nguyễn Văn A", class: "20CNTT1" },
    { key: "2", id: "SV002", name: "Trần Thị B", class: "20CNTT2" },
];

const Students = () => {
    return (
        <Layout className={styles.pageContainer}>
            <Content>
                <Card className={styles.cardContainer}>
                    <Title level={2} className={styles.pageTitle}>
                        Quản lý Sinh viên
                    </Title>
                    <Button type="primary" icon={<PlusOutlined />} className={styles.addButton}>
                        Thêm sinh viên
                    </Button>
                    <div className={styles.tableContainer}>
                        <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />
                    </div>
                </Card>
            </Content>
        </Layout>
    );
};

export default Students;
