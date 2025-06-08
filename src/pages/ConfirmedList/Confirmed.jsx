import classNames from "classnames/bind";
import React, { useEffect, useState } from "react";
import styles from "./Confirmed.module.css";
import { getRegistrationFormByIdAPI, removeClassFromRegistrationAPI } from "~/services/api.service";
import { showErrorNotification } from "~/utils/showErrorNotification";
import { showConfirmModal } from "../../utils/confirmModal";
import { notifySuccess } from "~/utils/notifications";
const cx = classNames.bind(styles);

function Confirmed() {
    const [registeredCourses, setRegisteredCourses] = useState([]);
    const [credits, setCredits] = useState(0);
    const maPDK = sessionStorage.getItem("maPDK");

    const fetchUpdatedRegistrationForm = async () => {
        try {
            const updatedForm = await getRegistrationFormByIdAPI(maPDK);

            if (updatedForm && Array.isArray(updatedForm.phieuDangKyLopHocList)) {
                setRegisteredCourses(updatedForm.phieuDangKyLopHocList);
                setCredits(updatedForm.tongTinChi);
            } else {
                setRegisteredCourses([]);
                setCredits(0);
            }
        } catch (err) {
            console.error("Lỗi khi fetch phiếu đăng ký:", err);
            showErrorNotification(err.message);
        }
    };

    useEffect(() => {
        fetchUpdatedRegistrationForm();
    }, []);

    const handleRemove = async (classId) => {
        showConfirmModal({
            title: "Xác nhận xóa lớp",
            content: "Bạn có chắc chắn muốn xóa lớp này?",
            okText: "Xóa",
            okType: "danger",
            onOk: async () => {
                try {
                    await removeClassFromRegistrationAPI(maPDK, classId);
                    notifySuccess("Xóa lớp thành công!");
                    await fetchUpdatedRegistrationForm();
                } catch (err) {
                    console.error("Lỗi khi xóa lớp:", err);
                    showErrorNotification("Không thể xóa lớp học.");
                }
            },
        });
    };

    return (
        <div className={cx("container")}>
            <h2 className={cx("title")}>Đã đăng ký: {registeredCourses.length} lớp</h2>
            <h3 className={cx("title")}>Tổng số tín chỉ: {credits}</h3>
            <table className={cx("table")}>
                <thead>
                    <tr>
                        <th></th>
                        <th>Mã Lớp</th>
                        <th>Tên MH</th>
                        <th>Còn trống</th>
                    </tr>
                </thead>
                <tbody>
                    {registeredCourses.length === 0 ? (
                        <tr>
                            <td colSpan="5" className={cx("warning-text")}>
                                Không có lớp nào được đăng ký
                            </td>
                        </tr>
                    ) : (
                        registeredCourses.map((course, index) => (
                            <tr key={index}>
                                <td>
                                    <button className={cx("remove-btn")} onClick={() => handleRemove(course.maLopHoc)}>
                                        -
                                    </button>
                                </td>
                                <td>{course.maLopHoc}</td>
                                <td>{course.tenMonHoc}</td>
                                <td>{course.soLuongSinhVienToiDa - course.soLuongSinhVien}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Confirmed;
