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
import { getAllUsersAPI, createTeacherAPI, getUserByIdAPI, updateTeacherAPI } from "../../services/api.service";
import moment from "moment";

const { Content } = Layout;
const { Title } = Typography;
const { Option } = Select;

const Teachers = () => {
    const [teachers, setTeachers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [editingUser, setEditingUser] = useState(null);

    const fetchTeachers = async () => {
        setLoading(true);
        try {
            const data = await getAllUsersAPI();
            const filtered = data.filter((user) => user.role === 2);

            const formatted = filtered.map((teacher) => ({
                key: teacher.id,
                id: teacher.id,
                name: teacher.name,
                email: teacher.email,
                sex: teacher.sex,
                role: teacher.role,
                roleName: "Giảng viên",
                department: teacher.makhoa,
            }));

            setTeachers(formatted);
        } catch (err) {
            console.error("Lỗi khi lấy danh sách giảng viên:", err);
            message.error("Không thể tải danh sách giảng viên.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTeachers();
    }, []);

    const handleEditTeacher = async (userId) => {
        setModalOpen(true);
        try {
            const user = await getUserByIdAPI(userId);
            console.log(user);

            setEditingUser(user);
            form.setFieldsValue({
                ...user,
                dateOfBirth: user.dateOfBirth ? moment(user.dateOfBirth) : null,
            });
        } catch (err) {
            message.error("Không thể lấy thông tin người dùng: " + err.message);
        }
    };

    const handleAddTeacher = async (values) => {
        const payload = {
            email: values.email,
            password: values.password,
            name: values.name,
            dateOfBirth: values.dateOfBirth.format("YYYY-MM-DD"),
            sex: values.sex,
            role: 2,
            ms: values.ms,
            makhoa: values.makhoa,
        };

        try {
            await createTeacherAPI(payload);
            message.success("Tạo tài khoản giảng viên thành công!");
            form.resetFields();
            setModalOpen(false);
            fetchTeachers();
        } catch (err) {
            console.error("Lỗi khi tạo giảng viên:", err.response || err.message);
            message.error("Tạo tài khoản thất bại: " + (err.response?.data?.message || err.message));
        }
    };

    const handleUpdateTeacher = async (values) => {
        const payload = {
            email: values.email,
            name: values.name,
            dateOfBirth: values.dateOfBirth.format("YYYY-MM-DD"),
            sex: values.sex,
            role: 2,
            makhoa: values.makhoa,
            ms: values.ms,
        };

        console.log(payload);

        try {
            await updateTeacherAPI(editingUser.id, payload);
            message.success("Cập nhật tài khoản giảng viên thành công!");
            form.resetFields();
            setModalOpen(false);
            setEditingUser(null);
            fetchTeachers();
        } catch (err) {
            message.error("Lỗi cập nhật: " + err.message);
        }
    };

    const columns = [
        {
            title: "Mã giảng viên",
            dataIndex: "id",
            key: "id",
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
            title: "Vai trò",
            dataIndex: "roleName",
            key: "roleName",
            align: "center",
        },
        {
            title: "Khoa",
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
                        onClick={() => handleEditTeacher(record.id)}
                    >
                        Sửa
                    </Button>
                    <Button type="primary" danger icon={<DeleteOutlined />} className={styles.deleteBtn}>
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
                        Quản lý Giảng viên
                    </Title>
                    <div style={{ marginBottom: 16 }}>
                        <Button type="primary" icon={<PlusOutlined />} onClick={() => setModalOpen(true)}>
                            Thêm giảng viên
                        </Button>
                    </div>
                    <div className={styles.tableContainer}>
                        <Spin spinning={loading} tip="Đang tải...">
                            <Table columns={columns} dataSource={teachers} pagination={{ pageSize: 5 }} bordered />
                        </Spin>
                    </div>
                </Card>

                <Modal
                    title={editingUser ? "Chỉnh sửa giảng viên" : "Thêm giảng viên mới"}
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
                    <Form form={form} layout="vertical" onFinish={editingUser ? handleUpdateTeacher : handleAddTeacher}>
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
                                <Option value="Nữ">Nữ</Option>
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
                            label="Mã số giảng viên"
                            name="ms"
                            rules={[{ required: true, message: "Vui lòng nhập mã số giảng viên" }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Mã Khoa"
                            name="makhoa"
                            rules={[{ required: true, message: "Vui lòng nhập mã khoa" }]}
                        >
                            <Input />
                        </Form.Item>
                    </Form>
                </Modal>
            </Content>
        </Layout>
    );
};

export default Teachers;
