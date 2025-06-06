import classNames from "classnames/bind";
import React, { useEffect, useState } from "react";
import styles from "./Schedule.module.css";
import { getRegistrationFormByIdAPI } from "~/services/api.service";

const cx = classNames.bind(styles);

const periods = [
    { label: "Tiết 1", time: "7:30 - 8:15" },
    { label: "Tiết 2", time: "8:15 - 9:00" },
    { label: "Tiết 3", time: "9:00 - 9:45" },
    { label: "Tiết 4", time: "10:00 - 10:45" },
    { label: "Tiết 5", time: "10:45 - 11:30" },
    { label: "Tiết 6", time: "13:00 - 13:45" },
    { label: "Tiết 7", time: "13:45 - 14:30" },
    { label: "Tiết 8", time: "14:30 - 15:15" },
    { label: "Tiết 9", time: "15:30 - 16:15" },
    { label: "Tiết 10", time: "16:15 - 17:00" },
];

const days = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"];

const getDayString = (thu) => `Thứ ${thu}`;

function Schedule() {
    const [scheduleData, setScheduleData] = useState([]);

    useEffect(() => {
        const fetchSchedule = async () => {
            const maPDK = localStorage.getItem("maPDK");
            if (!maPDK) return;
            const data = await getRegistrationFormByIdAPI(maPDK);
            if (data?.phieuDangKyLopHocList) {
                const courses = data.phieuDangKyLopHocList.map((item) => ({
                    subject: item.tenMonHoc,
                    room: `LH: ${item.maLopHoc}`,
                    teacher: "",
                    start: item.ngayBatDau,
                    end: item.ngayKetThuc,
                    tietBatDau: item.tietBatDau,
                    tietKetThuc: item.tietKetThuc,
                    thu: item.thu,
                    day: getDayString(item.thu),
                    siso: item.soLuongSinhVienToiDa,
                }));
                setScheduleData(courses);
            }
        };

        fetchSchedule();
    }, []);

    const getMergedCourses = (day) => {
        const courses = scheduleData.filter((course) => course.day === day);
        return courses.map((course) => ({
            ...course,
            startPeriodIndex: course.tietBatDau - 1,
            endPeriodIndex: course.tietKetThuc,
            rowSpan: course.tietKetThuc - course.tietBatDau + 1,
        }));
    };

    return (
        <div className={cx("container")}>
            <table className={cx("table")}>
                <thead>
                    <tr className={cx("table__heading")}>
                        <th>Thứ/Tiết</th>
                        {days.map((day) => (
                            <th key={day}>{day}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {periods.map((period, periodIndex) => (
                        <tr key={period.label}>
                            <td className={cx("period-cell")}>
                                {period.label} <br /> ({period.time})
                            </td>
                            {days.map((day) => {
                                const mergedCourses = getMergedCourses(day);
                                const course = mergedCourses.find((c) => c.startPeriodIndex === periodIndex);

                                if (course) {
                                    return (
                                        <td key={day} rowSpan={course.rowSpan} className={cx("schedule__course")}>
                                            <strong className={cx("course-code")}>{course.room}</strong>
                                            <span className={cx("course-title")}>{course.subject}</span>
                                            <span className={cx("teacher-name")}>{course.teacher}</span>
                                            {course.start && course.end && (
                                                <span className={cx("course-date")}>
                                                    BD: {course.start}
                                                    <br />
                                                    KT: {course.end}
                                                </span>
                                            )}
                                        </td>
                                    );
                                } else if (mergedCourses.some((c) => c.startPeriodIndex < periodIndex && c.endPeriodIndex > periodIndex)) {
                                    return null;
                                } else {
                                    return <td key={day}></td>;
                                }
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Schedule;
