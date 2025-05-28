import React, { use, useEffect, useState } from "react";
import { Layout, Table, Button, Space, Typography, Card, Spin, Modal, Form, Input, Select, DatePicker } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import styles from "./Admin.module.scss";
import { getAllUsersAPI, createStudentAPI, getUserByIdAPI, updateStudentAPI, deleteUserAPI, getAllMajorsAPI } from "../../services/api.service";
import moment from "moment";
import { showErrorNotification } from "~/utils/showErrorNotification";
import { notifySuccess } from "~/utils/notifications";

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
            showErrorNotification("Không thể tải danh sách sinh viên");
        } finally {
            setLoading(false);
        }
    };

    const fetchMajors = async () => {
        try {
            const data = await getAllMajorsAPI();
            setMajors(data);
        } catch (err) {
            showErrorNotification("Không thể tải danh sách ngành");
        }
    };

    useEffect(() => {
        fetchStudents();
        fetchMajors();
    }, []);

    const handleEditStudent = async (userId) => {
        try {
            setLoading(true);
            const user = await getUserByIdAPI(userId);
            user.id = userId;

            setEditingUser(user);
            form.resetFields();
            form.setFieldsValue({
                id: user.id,
                email: user.email,
                name: user.name,
                sex: user.sex,
                ms: user.ms,
                manganh: user.manganh,
                dateOfBirth: user.dateOfBirth ? moment(user.dateOfBirth) : null,
            });
            setModalOpen(true);
        } catch (err) {
            showErrorNotification("Không thể lấy thông tin sinh viên", err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleAddStudent = async (values) => {
        const payload = {
            email: values.email,
            password: values.password,
            name: values.name,
            dateOfBirth: values.dateOfBirth ? values.dateOfBirth.format("YYYY-MM-DD") : null,
            sex: values.sex,
            ms: values.ms,
            role: 1,
            manganh: values.manganh,
        };

        try {
            await createStudentAPI(payload);
            notifySuccess("Tạo sinh viên thành công!");
            form.resetFields();
            setModalOpen(false);
            fetchStudents();
        } catch (err) {
            showErrorNotification("Tạo sinh viên thất bại", err.response?.data?.message || err.message);
        }
    };

    const handleUpdateStudent = async (values) => {
        if (!values.id) {
            showErrorNotification("Không tìm thấy ID sinh viên");
            return;
        }

        const payload = {
            email: values.email,
            name: values.name,
            dateOfBirth: values.dateOfBirth ? values.dateOfBirth.format("YYYY-MM-DD") : null,
            sex: values.sex,
            ms: values.ms,
            manganh: values.manganh,
        };

        try {
            await updateStudentAPI(values.id, payload);
            notifySuccess("Cập nhật sinh viên thành công!");
            form.resetFields();
            setModalOpen(false);
            setEditingUser(null);
            fetchStudents();
        } catch (err) {
            showErrorNotification("Lỗi cập nhật sinh viên", err.response?.data?.message || err.message);
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
                    notifySuccess("Xóa sinh viên thành công!");
                    fetchStudents();
                } catch (err) {
                    showErrorNotification("Xóa sinh viên thất bại", err.message || "Lỗi không xác định");
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
                    <Button type="primary" icon={<EditOutlined />} className={styles.editBtn} onClick={() => handleEditStudent(record.id)}>
                        Sửa
                    </Button>
                    <Button type="primary" danger icon={<DeleteOutlined />} className={styles.deleteBtn} onClick={() => handleDeleteStudent(record.id)}>
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
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={() => {
                                setEditingUser(null);
                                form.resetFields();
                                setModalOpen(true);
                            }}
                        >
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
                    title={editingUser ? "Chỉnh sửa sinh viên" : "Thêm sinh viên mới"}
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
                        <Form.Item name="id" hidden>
                            <Input />
                        </Form.Item>

                        <Form.Item label="Email" name="email" rules={[{ required: true, message: "Vui lòng nhập email" }]}>
                            <Input />
                        </Form.Item>

                        {!editingUser && (
                            <Form.Item label="Mật khẩu" name="password" rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}>
                                <Input.Password />
                            </Form.Item>
                        )}

                        <Form.Item label="Họ và tên" name="name" rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}>
                            <Input />
                        </Form.Item>

                        <Form.Item label="Giới tính" name="sex" rules={[{ required: true, message: "Vui lòng chọn giới tính" }]}>
                            <Select>
                                <Option value="Nam">Nam</Option>
                                <Option value="Nữ">Nữ</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item label="Ngày sinh" name="dateOfBirth" rules={[{ required: true, message: "Vui lòng chọn ngày sinh" }]}>
                            <DatePicker style={{ width: "100%" }} />
                        </Form.Item>

                        <Form.Item label="Mã số sinh viên" name="ms" rules={[{ required: true, message: "Vui lòng nhập mã số sinh viên" }]}>
                            <Input />
                        </Form.Item>

                        <Form.Item label="Mã ngành" name="manganh" rules={[{ required: true, message: "Vui lòng chọn ngành" }]}>
                            <Select placeholder="Chọn ngành">
                                {majors.map((major) => (
                                    <Option key={major.maNganh} value={major.maNganh}>
                                        {major.tenNganh}
                                    </Option>
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
