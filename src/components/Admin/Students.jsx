import React, { useEffect, useState } from "react";
import {
    Layout,
    Table,
    Button,
    Space,
    Typography,
    Card,
    Spin,
    message,
    Modal,
    Form,
    Input,
    Select,
    DatePicker,
} from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import styles from "./Admin.module.scss";
import {
    getAllUsersAPI,
    createStudentAPI,
    getUserByIdAPI,
    updateStudentAPI,
    deleteUserAPI,
    getAllMajorsAPI,
} from "../../services/api.service";
import moment from "moment";

const { Content } = Layout;
const { Title } = Typography;
const { Option } = Select;

const Students = () => {
    const [students, setStudents] = useState([]);
    const [majors, setMajors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [editingUser, setEditingUser] = useState(null);

    const fetchStudents = async () => {
        setLoading(true);
        try {
            const data = await getAllUsersAPI();
            const filtered = data.filter((student) => student.role === 1);

            const formatted = filtered.map((student) => ({
                key: student.id,
                id: student.id,
                ms: student.ms,
                name: student.name,
                email: student.email,
                sex: student.sex,
                role: student.role,
                roleName: student.role,
                department: student.manganh,
            }));

            setStudents(formatted);
        } catch (err) {
            console.error("Lỗi khi lấy danh sách sinh viên:", err);
            message.error("Không thể tải danh sách sinh viên.");
        } finally {
            setLoading(false);
        }
    };

    const fetchMajors = async () => {
        try {
            const data = await getAllMajorsAPI();

            setMajors(data);
        } catch (err) {
            console.error("Lỗi khi lấy danh sách ngành:", err);
            console.log("Không thể tải danh sách ngành.");
        }
    };

    useEffect(() => {
        fetchStudents();
        fetchMajors();
    }, []);

    const handleEditStudent = async (userId) => {
        setModalOpen(true);
        try {
            const user = await getUserByIdAPI(userId);
            setEditingUser(user);
            form.setFieldsValue({
                ...user,
                dateOfBirth: user.dateOfBirth ? moment(user.dateOfBirth) : null,
            });
        } catch (err) {
            message.error("Không thể lấy thông tin người dùng: " + err.message);
        }
    };

    const handleAddStudent = async (values) => {
        const payload = {
            email: values.email,
            password: values.password,
            name: values.name,
            dateOfBirth: values.dateOfBirth.format("YYYY-MM-DD"),
            sex: values.sex,
            ms: values.ms,
            role: 1,
            manganh: values.manganh,
        };

        try {
            await createStudentAPI(payload);
            message.success("Tạo người dùng thành công!");
            form.resetFields();
            setModalOpen(false);
            fetchStudents();
        } catch (err) {
            console.error("Lỗi khi tạo người dùng:", err.response || err.message);
            message.error("Tạo người dùng thất bại: " + (err.response?.data?.message || err.message));
        }
    };

    const handleUpdateStudent = async (values) => {
        const payload = {
            email: values.email,
            name: values.name,
            dateOfBirth: values.dateOfBirth.format("YYYY-MM-DD"),
            sex: values.sex,
            ms: values.ms,
            manganh: values.manganh,
        };

        console.log(payload);

        try {
            await updateStudentAPI(editingUser.id, payload);
            message.success("Cập nhật người dùng thành công!");
            form.resetFields();
            setModalOpen(false);
            setEditingUser(null);
            fetchStudents();
        } catch (err) {
            message.error("Lỗi cập nhật người dùng: " + err.message);
        }
    };

    const handleDeleteStudent = async (userId) => {
        Modal.confirm({
            title: "Xác nhận xóa",
            content: "Bạn có chắc chắn muốn xóa sinh viên này không?",
            okText: "Xóa",
            okType: "danger",
            cancelText: "Hủy",
            onOk: async () => {
                try {
                    await deleteUserAPI(userId);
                    message.success("Xóa sinh viên thành công!");
                    fetchStudents();
                } catch (err) {
                    message.error("Xóa sinh viên thất bại: " + (err.message || "Lỗi không xác định"));
                }
            },
        });
    };

    const columns = [
        {
            title: "Mã sinh viên",
            dataIndex: "ms",
            key: "ms",
            align: "center",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            align: "center",
        },
        {
            title: "Họ và tên",
            dataIndex: "name",
            key: "name",
            align: "center",
        },
        {
            title: "Giới tính",
            dataIndex: "sex",
            key: "sex",
            align: "center",
        },
        {
            title: "Ngành",
            dataIndex: "department",
            key: "department",
            align: "center",
        },
        {
            title: "Hành động",
            key: "action",
            align: "center",
            render: (text, record) => (
                <Space>
                    <Button
                        type="primary"
                        icon={<EditOutlined />}
                        className={styles.editBtn}
                        onClick={() => handleEditStudent(record.id)}
                    >
                        Sửa
                    </Button>
                    <Button
                        type="primary"
                        danger
                        icon={<DeleteOutlined />}
                        className={styles.deleteBtn}
                        onClick={() => handleDeleteStudent(record.id)}
                    >
                        Xóa
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <Layout className={styles.pageContainer}>
            <Content>
                <Card className={styles.cardContainer}>
                    <Title level={2} className={styles.pageTitle}>
                        Quản lý Sinh viên
                    </Title>
                    <div style={{ marginBottom: 16 }}>
                        <Button type="primary" icon={<PlusOutlined />} onClick={() => setModalOpen(true)}>
                            Thêm sinh viên
                        </Button>
                    </div>
                    <div className={styles.tableContainer}>
                        <Spin spinning={loading} tip="Đang tải...">
                            <Table columns={columns} dataSource={students} pagination={{ pageSize: 5 }} bordered />
                        </Spin>
                    </div>
                </Card>

                <Modal
                    title={editingUser ? "Chỉnh sửa người dùng" : "Thêm người dùng mới"}
                    open={modalOpen}
                    onCancel={() => {
                        setModalOpen(false);
                        form.resetFields();
                        setEditingUser(null);
                    }}
                    onOk={() => form.submit()}
                    okText={editingUser ? "Cập nhật" : "Tạo"}
                    cancelText="Hủy"
                >
                    <Form form={form} layout="vertical" onFinish={editingUser ? handleUpdateStudent : handleAddStudent}>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: "Vui lòng nhập email" }]}
                        >
                            <Input />
                        </Form.Item>

                        {!editingUser && (
                            <Form.Item
                                label="Mật khẩu"
                                name="password"
                                rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
                            >
                                <Input.Password />
                            </Form.Item>
                        )}

                        <Form.Item
                            label="Họ và tên"
                            name="name"
                            rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Giới tính"
                            name="sex"
                            rules={[{ required: true, message: "Vui lòng chọn giới tính" }]}
                        >
                            <Select>
                                <Option value="Nam">Nam</Option>
                                <Option value="Nu">Nữ</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="Ngày sinh"
                            name="dateOfBirth"
                            rules={[{ required: true, message: "Vui lòng chọn ngày sinh" }]}
                        >
                            <DatePicker style={{ width: "100%" }} />
                        </Form.Item>

                        <Form.Item
                            label="Mã số sinh viên"
                            name="ms"
                            rules={[{ required: true, message: "Vui lòng nhập mã số sinh viên" }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Mã ngành"
                            name="manganh"
                            rules={[{ required: true, message: "Vui lòng nhập mã ngành" }]}
                        >
                            <Select placeholder="Chọn ngành">
                                {majors.map((major) => (
                                    <Select.Option key={major.maNganh} value={major.maNganh}>
                                        {major.tenNganh}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Form>
                </Modal>
            </Content>
        </Layout>
    );
};

export default Students;
