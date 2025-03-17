import classNames from "classnames/bind";
import React, { useState } from "react";
import styles from "./Schedule.module.css";

const cx = classNames.bind(styles);

const scheduleData = [
        {
                day: "Thứ 2",
                time: "7:30 - 10:45",
                subject: "Cơ sở hạ tầng CNTT",
                room: "B1.04",
                teacher: "Nguyễn Thị Anh Thư",
                start: "2025-02-17",
                end: "2025-04-12",
        },
        {
                day: "Thứ 3",
                time: "13:00 - 14:30",
                subject: "Phân tích thiết kế phần mềm",
                room: "B2.06",
                teacher: "Phạm Nguyễn Phúc Toàn",
        },
        {
                day: "Thứ 5",
                time: "7:30 - 9:00",
                subject: "Triết học Mác - Lênin",
                room: "B6.12",
                teacher: "Phạm Quốc Hùng",
        },
];

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

function timeToMinutes(time) {
        const [hours, minutes] = time.split(":").map(Number);
        return hours * 60 + minutes;
}

function getMergedCourses(day) {
        const courses = scheduleData.filter((course) => course.day === day);
        const mergedCourses = [];

        courses.forEach((course) => {
                const [courseStart, courseEnd] = course.time.split(" - ").map(timeToMinutes);
                const startPeriodIndex = periods.findIndex(
                        (p) => timeToMinutes(p.time.split(" - ")[0]) === courseStart
                );
                const endPeriodIndex = periods.findIndex((p) => timeToMinutes(p.time.split(" - ")[0]) === courseEnd);
                const courseDuration = endPeriodIndex - startPeriodIndex;

                if (
                        !mergedCourses.some(
                                (c) =>
                                        (startPeriodIndex >= c.startPeriodIndex &&
                                                startPeriodIndex < c.endPeriodIndex) ||
                                        (endPeriodIndex > c.startPeriodIndex && endPeriodIndex <= c.endPeriodIndex)
                        )
                ) {
                        mergedCourses.push({
                                ...course,
                                startPeriodIndex,
                                endPeriodIndex,
                                rowSpan: courseDuration,
                        });
                }
        });

        return mergedCourses;
}

function Schedule() {
        const [hovered, setHovered] = useState(null);

        return (
                <div className={cx("container")}>
                        <table className={cx("table")}>
                                <thead>
                                        <tr className={cx("table__heading")}>
                                                <th>Thứ/Tiết</th>
                                                {["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"].map((day) => (
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
                                                        {["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"].map(
                                                                (day) => {
                                                                        const mergedCourses = getMergedCourses(day);
                                                                        const course = mergedCourses.find(
                                                                                (c) =>
                                                                                        c.startPeriodIndex ===
                                                                                        periodIndex
                                                                        );

                                                                        if (course) {
                                                                                return (
                                                                                        <td
                                                                                                key={day}
                                                                                                rowSpan={course.rowSpan}
                                                                                                className={cx(
                                                                                                        "schedule__course"
                                                                                                )}
                                                                                                onMouseEnter={() =>
                                                                                                        setHovered(
                                                                                                                course.subject
                                                                                                        )
                                                                                                }
                                                                                                onMouseLeave={() =>
                                                                                                        setHovered(null)
                                                                                                }
                                                                                        >
                                                                                                <strong
                                                                                                        className={cx(
                                                                                                                "course-code"
                                                                                                        )}
                                                                                                >
                                                                                                        IE101.P22 - VN
                                                                                                </strong>
                                                                                                <br />
                                                                                                <span
                                                                                                        className={cx(
                                                                                                                "course-title"
                                                                                                        )}
                                                                                                >
                                                                                                        {course.subject}
                                                                                                </span>
                                                                                                <br />
                                                                                                <strong
                                                                                                        className={cx(
                                                                                                                "teacher-name"
                                                                                                        )}
                                                                                                >
                                                                                                        {course.teacher}
                                                                                                </strong>
                                                                                                <br />
                                                                                                <span
                                                                                                        className={cx(
                                                                                                                "room"
                                                                                                        )}
                                                                                                >
                                                                                                        {course.room}
                                                                                                </span>
                                                                                                <br />
                                                                                                {course.start &&
                                                                                                        course.end && (
                                                                                                                <span
                                                                                                                        className={cx(
                                                                                                                                "course-date"
                                                                                                                        )}
                                                                                                                >
                                                                                                                        BD:{" "}
                                                                                                                        {
                                                                                                                                course.start
                                                                                                                        }{" "}
                                                                                                                        <br />{" "}
                                                                                                                        KT:{" "}
                                                                                                                        {
                                                                                                                                course.end
                                                                                                                        }
                                                                                                                </span>
                                                                                                        )}
                                                                                                {hovered ===
                                                                                                        course.subject && (
                                                                                                        <span
                                                                                                                className={cx(
                                                                                                                        "delete-icon"
                                                                                                                )}
                                                                                                        >
                                                                                                                🗑️
                                                                                                        </span>
                                                                                                )}
                                                                                        </td>
                                                                                );
                                                                        } else if (
                                                                                mergedCourses.some(
                                                                                        (c) =>
                                                                                                c.startPeriodIndex <
                                                                                                        periodIndex &&
                                                                                                c.endPeriodIndex >
                                                                                                        periodIndex
                                                                                )
                                                                        ) {
                                                                                return null;
                                                                        } else {
                                                                                return <td key={day}></td>;
                                                                        }
                                                                }
                                                        )}
                                                </tr>
                                        ))}
                                </tbody>
                        </table>
                </div>
        );
}

export default Schedule;
