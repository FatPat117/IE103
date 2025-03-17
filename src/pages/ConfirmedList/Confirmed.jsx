import classNames from "classnames/bind";
import React from "react";
import styles from "./Confirmed.module.css";

const cx = classNames.bind(styles);

const registeredCourses = [
        {
                code: "IT004.011",
                subject: "IT004",
                name: "Cơ sở dữ liệu",
                time: "Thứ 2, Tiết 1234",
                credits: 3,
                registered: "19/70",
        },
        {
                code: "IT004.011.1",
                subject: "IT004",
                name: "Cơ sở dữ liệu",
                time: "Thứ 2, Tiết 6789",
                credits: 1,
                registered: "16/35",
        },
        {
                code: "IT005.0110",
                subject: "IT005",
                name: "Nhập môn mạng máy tính",
                time: "Thứ 4, Tiết 123",
                credits: 3,
                registered: "20/64",
        },
        {
                code: "IT005.0110.1",
                subject: "IT005",
                name: "Nhập môn mạng máy tính",
                time: "Thứ 4, Tiết 67890",
                credits: 1,
                registered: "14/32",
        },
        {
                code: "IT007.015",
                subject: "IT007",
                name: "Hệ điều hành",
                time: "Thứ 6, Tiết 123",
                credits: 3,
                registered: "28/60",
        },
        {
                code: "IT007.015.1",
                subject: "IT007",
                name: "Hệ điều hành",
                time: "Thứ 6, Tiết 67890",
                credits: 1,
                registered: "13/30",
        },
];

function Confirmed() {
        return (
                <div className={cx("container")}>
                        <h2 className={cx("title")}>Đã đăng ký: 6 lớp (12 tín chỉ)</h2>
                        <table className={cx("table")}>
                                <thead>
                                        <tr>
                                                <th></th>
                                                <th>Mã Lớp</th>
                                                <th>Mã MH/ Tên MH</th>
                                                <th>Thời Gian học</th>
                                                <th>Số tín chỉ</th>
                                                <th>ĐK/SS</th>
                                        </tr>
                                </thead>
                                <tbody>
                                        {registeredCourses.map((course, index) => (
                                                <tr key={index}>
                                                        <td>
                                                                <button className={cx("remove-btn")}>➖</button>
                                                        </td>
                                                        <td>{course.code}</td>
                                                        <td>
                                                                <strong>{course.subject}</strong> <br /> {course.name}
                                                        </td>
                                                        <td>{course.time}</td>
                                                        <td>{course.credits}</td>
                                                        <td>{course.registered}</td>
                                                </tr>
                                        ))}
                                </tbody>
                        </table>
                        <p className={cx("warning-text")}>Anh chị chưa chọn lớp nào để XOÁ</p>
                </div>
        );
}

export default Confirmed;
