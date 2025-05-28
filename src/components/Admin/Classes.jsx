import { useEffect, useState } from "react";
import { Layout, Table, Button, Space, Typography, Card, Upload, message, Modal, Form, Input, DatePicker, InputNumber, Select } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { getAllClassesAPI, createClassByExcelAPI, deleteClassAPI, getClassByIdAPI, updateClassByIdAPI } from "../../services/api.service";

import dayjs from "dayjs";
import styles from "./Admin.module.scss";
import { showErrorNotification } from "~/utils/showErrorNotification";
import { notifySuccess } from "~/utils/notifications";

const { Content } = Layout;
const { Title } = Typography;

const Classes = () => {
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editingClass, setEditingClass] = useState(null);
    const [form] = Form.useForm();

    useEffect(() => {
        fetchClasses();
    }, []);

    const fetchClasses = async () => {
        setLoading(true);
        try {
            const res = await getAllClassesAPI();
            const classList =
                res?.map((cls, index) => ({
                    ...cls,
                    key: index,
                })) || [];
            setClasses(classList);
        } catch (error) {
            showErrorNotification("Lỗi khi lấy danh sách lớp học", error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        Modal.confirm({
            title: "Xác nhận xoá lớp học",
            content: "Bạn có chắc muốn xoá lớp học này?",
            onOk: async () => {
                try {
                    await deleteClassAPI(id);
                    notifySuccess("Xoá lớp học thành công");
                    fetchClasses();
                } catch (error) {
                    showErrorNotification("Lỗi khi xoá lớp học", error.message);
                }
            },
        });
    };

    const handleUpload = async ({ file }) => {
        try {
            await createClassByExcelAPI(file);
            notifySuccess("Tải lên thành công");
            fetchClasses();
        } catch (error) {
            showErrorNotification("Lỗi khi tải file Excel", error.message);
        }
    };

    const handleEdit = async (id) => {
        try {
            const classData = await getClassByIdAPI(id);
            setEditingClass(classData);
            form.setFieldsValue({
                ...classData,
                ngayBatDau: dayjs(classData.ngayBatDau),
                ngayKetThuc: dayjs(classData.ngayKetThuc),
            });
        } catch (error) {
            showErrorNotification("Lỗi khi lấy thông tin lớp học", error.message);
        }
    };

    const handleEditSubmit = async () => {
        try {
            const values = await form.validateFields();
            const updatedData = {
                ...values,
                malh: editingClass.malh,
                ngayBatDau: values.ngayBatDau.format("YYYY-MM-DD"),
                ngayKetThuc: values.ngayKetThuc.format("YYYY-MM-DD"),
            };

            console.log(updatedData);

            await updateClassByIdAPI(editingClass.malh, updatedData);

            notifySuccess("Cập nhật lớp học thành công");
            setEditingClass(null);
            fetchClasses();
        } catch (error) {
            showErrorNotification("Lỗi khi cập nhật lớp học", error.message);
        }
    };

    const columns = [
        { title: "Mã lớp", dataIndex: "malh", key: "malh" },
        { title: "Tên môn học", dataIndex: "tenMH", key: "tenMH" },
        { title: "Tên GV", dataIndex: "tenGV", key: "tenGV" },
        { title: "Sĩ số", dataIndex: "soLuongSinhVien", key: "soLuongSinhVien" },
        { title: "Ngày bắt đầu", dataIndex: "ngayBatDau", key: "ngayBatDau" },
        { title: "Ngày kết thúc", dataIndex: "ngayKetThuc", key: "ngayKetThuc" },
        { title: "Tiết bắt đầu", dataIndex: "tietBatDau", key: "tietBatDau" },
        { title: "Tiết kết thúc", dataIndex: "tietKetThuc", key: "tietKetThuc" },
        { title: "Năm học", dataIndex: "namHoc", key: "namHoc" },
        {
            title: "Hành động",
            key: "action",
            align: "center",
            render: (_, record) => (
                <Space>
                    <Button icon={<EditOutlined />} onClick={() => handleEdit(record.malh)}>
                        Sửa
                    </Button>
                    <Button danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.malh)}>
                        Xoá
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
                        Quản lý Lớp học
                    </Title>
                    <Space style={{ marginBottom: 16 }}>
                        <Upload customRequest={handleUpload} accept=".xlsx" showUploadList={false}>
                            <Button type="primary" icon={<UploadOutlined />}>
                                Tải danh sách từ Excel
                            </Button>
                        </Upload>
                    </Space>
                    <div className={styles.tableContainer}>
                        <Table columns={columns} dataSource={classes} loading={loading} pagination={{ pageSize: 5 }} />
                    </div>
                </Card>
            </Content>

            <Modal title="Chỉnh sửa lớp học" open={!!editingClass} onCancel={() => setEditingClass(null)} onOk={handleEditSubmit} okText="Lưu" cancelText="Huỷ">
                <Form form={form} layout="vertical">
                    <Form.Item name="tenGV" label="Tên giảng viên" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="mamh" label="Mã môn học" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="magv" label="Mã giảng viên" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="ngayBatDau" label="Ngày bắt đầu" rules={[{ required: true }]}>
                        <DatePicker format="YYYY-MM-DD" />
                    </Form.Item>
                    <Form.Item name="ngayKetThuc" label="Ngày kết thúc" rules={[{ required: true }]}>
                        <DatePicker format="YYYY-MM-DD" />
                    </Form.Item>
                    <Form.Item name="tietBatDau" label="Tiết bắt đầu" rules={[{ required: true }]}>
                        <InputNumber min={1} />
                    </Form.Item>
                    <Form.Item name="tietKetThuc" label="Tiết kết thúc" rules={[{ required: true }]}>
                        <InputNumber min={1} />
                    </Form.Item>
                    <Form.Item name="thu" label="Thứ" rules={[{ required: true }]}>
                        <Select placeholder="Chọn thứ">
                            <Select.Option value={2}>Thứ 2</Select.Option>
                            <Select.Option value={3}>Thứ 3</Select.Option>
                            <Select.Option value={4}>Thứ 4</Select.Option>
                            <Select.Option value={5}>Thứ 5</Select.Option>
                            <Select.Option value={6}>Thứ 6</Select.Option>
                            <Select.Option value={7}>Thứ 7</Select.Option>
                            <Select.Option value={8}>Chủ nhật</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="soLuongSinhVien" label="Sĩ số" rules={[{ required: true }]}>
                        <InputNumber min={1} />
                    </Form.Item>
                </Form>
            </Modal>
        </Layout>
    );
};

export default Classes;
