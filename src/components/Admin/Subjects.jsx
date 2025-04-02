import { Layout, Table, Button, Space, Typography, Card } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import styles from "./Admin.module.scss";

const { Content } = Layout;
const { Title } = Typography;

const columns = [
    { title: "Mã môn học", dataIndex: "id", key: "id", align: "center" },
    { title: "Tên môn học", dataIndex: "name", key: "name" },
    { title: "Số tín chỉ", dataIndex: "credits", key: "credits", align: "center" },
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
    { key: "1", id: "IT001", name: "Lập trình Web", credits: 3 },
    { key: "2", id: "IT002", name: "Cấu trúc dữ liệu", credits: 4 },
];

const Subjects = () => {
    return (
        <Layout className={styles.pageContainer}>
            <Content>
                <Card className={styles.cardContainer}>
                    <Title level={2} className={styles.pageTitle}>
                        Quản lý Môn học
                    </Title>
                    <Button type="primary" icon={<PlusOutlined />}>
                        Thêm môn học
                    </Button>
                    <div className={styles.tableContainer}>
                        <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />
                    </div>
                </Card>
            </Content>
        </Layout>
    );
};

export default Subjects;
