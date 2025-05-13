import classNames from "classnames/bind";
import React, { useEffect, useState } from "react";
import styles from "./Confirmed.module.css";
import { getRegistrationFormByIdAPI, removeClassFromRegistrationAPI } from "~/services/api.service";

const cx = classNames.bind(styles);

function Confirmed() {
    const [registeredCourses, setRegisteredCourses] = useState([]);
    const maPDK = localStorage.getItem("maPDK");

    const fetchUpdatedRegistrationForm = async () => {
        try {
            const updatedForm = await getRegistrationFormByIdAPI(maPDK);
            console.log("Updated Registration Form:", updatedForm);
            
            if (updatedForm && Array.isArray(updatedForm.phieuDangKyLopHocList)) {
                setRegisteredCourses(updatedForm.phieuDangKyLopHocList);
            } else {
                setRegisteredCourses([]);
            }
        } catch (err) {
            console.error("Lỗi khi fetch phiếu đăng ký:", err);
            alert(err.message || "Lỗi khi tải lại phiếu đăng ký.");
        }
    };

    useEffect(() => {
        fetchUpdatedRegistrationForm();
    }, []);

    const handleRemove = async (classId) => {
        const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa lớp này?");
        if (!confirmDelete) return;

        try {
            await removeClassFromRegistrationAPI(maPDK, classId);
            await fetchUpdatedRegistrationForm(); // Cập nhật lại danh sách sau khi xóa
        } catch (err) {
            console.error("Lỗi khi xóa lớp:", err);
            alert(err.message || "Xóa lớp thất bại.");
        }
    };

    return (
        <div className={cx("container")}>
            <h2 className={cx("title")}>Đã đăng ký: {registeredCourses.length} lớp</h2>
            <table className={cx("table")}>
                <thead>
                    <tr>
                        <th></th>
                        <th>Mã Lớp</th>
                        <th>Tên MH</th>
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
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Confirmed;
