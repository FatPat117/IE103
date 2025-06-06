import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./ClassList.module.css";
import { getAllClassesAPI, createRegistrationAPI, addClassToRegistrationAPI, removeClassFromRegistrationAPI, getRegistrationFormByStudentIdAPI, getUserByIdAPI, getRegistrationFormByIdAPI } from "~/services/api.service";
import { showErrorNotification } from "~/utils/showErrorNotification";
import { message } from "antd";

const cx = classNames.bind(styles);

function ClassList() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedClasses, setSelectedClasses] = useState({});
    const [disabledClasses, setDisabledClasses] = useState({});
    const [classData, setClassData] = useState([]);
    const [registrationId, setRegistrationId] = useState(null);

    const studentId = localStorage.getItem("studentId");

    const now = new Date();
    const currentMonth = now.getMonth() + 1; // getMonth() trả về 0-11
    const currentYear = now.getFullYear();
    const semester = currentMonth >= 6 ? 1 : 2;
    const yearRange = semester === 1 ? `${currentYear}-${currentYear + 1}` : `${currentYear - 1}-${currentYear}`;

    // lấy thông tin lớp và phiếu đăng ký để hiển thị
    useEffect(() => {
        const fetchData = async () => {
            try {
                const info = await getUserByIdAPI(studentId);
                const mssv = info.ms;

                const allClasses = await getAllClassesAPI();
                console.log("All classes fetched:", allClasses);

                const filtered = allClasses.filter((cls) => cls.hocKi === semester && cls.namHoc === yearRange);

                setClassData(filtered);

                if (!filtered || filtered.length === 0) {
                    showErrorNotification("Không có lớp nào để đăng ký trong học kỳ hiện tại.");
                    return;
                }

                let maPDK = localStorage.getItem("maPDK");

                if (!maPDK) {
                    const registrationForms = await getRegistrationFormByStudentIdAPI(mssv);

                    const currentRegistrationForm = registrationForms.find((form) => form.hocKi === semester && form.namHoc === yearRange);

                    if (currentRegistrationForm) {
                        maPDK = currentRegistrationForm.maPDK;
                    } else {
                        const newRegistration = await createRegistrationAPI({
                            hocKi: semester,
                            namHoc: yearRange,
                            soTinChi: 0,
                            maSV: studentId,
                        });

                        maPDK = newRegistration.maPDK;
                    }

                    localStorage.setItem("maPDK", maPDK);
                }

                setRegistrationId(maPDK);

                const registrationForm = await getRegistrationFormByIdAPI(maPDK);

                const selected = {};
                if (Array.isArray(registrationForm.phieuDangKyLopHocList)) {
                    registrationForm.phieuDangKyLopHocList.forEach((cls) => {
                        selected[cls.maLopHoc] = true;
                    });
                }
                setSelectedClasses(selected);
            } catch (error) {
                showErrorNotification("Lỗi khi tải dữ liệu lớp học", error.message);
                console.error("Lỗi khi khởi tạo dữ liệu:", error);
            }
        };

        fetchData();
    }, []);

    // hàm tìm kiếm lớp học
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    // hàm xử lý chọn/bỏ chọn lớp học
    const toggleSelection = async (selectedClass) => {
        const { malh } = selectedClass;

        try {
            if (selectedClasses[malh]) {
                await removeClassFromRegistrationAPI(registrationId, malh);

                setSelectedClasses((prev) => {
                    const updated = { ...prev };
                    delete updated[malh];
                    return updated;
                });

                const updatedDisabled = {};
                const selectedIds = Object.keys(selectedClasses).filter((id) => id !== malh);

                classData.forEach((cls) => {
                    for (const selectedId of selectedIds) {
                        const selected = classData.find((c) => c.malh === selectedId);
                        if (!selected) continue;

                        const sameSubject = cls.mamh === selected.mamh;
                        const sameDay = cls.thu === selected.thu;
                        const timeOverlap = !(cls.tietKetThuc < selected.tietBatDau || cls.tietBatDau > selected.tietKetThuc);

                        if (!selectedIds.includes(cls.malh) && (sameSubject || (sameDay && timeOverlap))) {
                            updatedDisabled[cls.malh] = true;
                        }
                    }
                });

                setDisabledClasses(updatedDisabled);
            } else {
                await addClassToRegistrationAPI(registrationId, malh);
                const pdk = await getRegistrationFormByIdAPI(registrationId);

                setSelectedClasses((prev) => ({
                    ...prev,
                    [malh]: true,
                }));

                const conflicts = classData.filter((cls) => {
                    const sameSubject = cls.mamh === selectedClass.mamh;
                    const sameDay = cls.thu === selectedClass.thu;
                    const timeOverlap = !(cls.tietKetThuc < selectedClass.tietBatDau || cls.tietBatDau > selectedClass.tietKetThuc);

                    return cls.malh !== malh && !selectedClasses[cls.malh] && (sameSubject || (sameDay && timeOverlap));
                });

                const newDisabled = {};
                conflicts.forEach((cls) => {
                    newDisabled[cls.malh] = true;
                });

                setDisabledClasses((prev) => ({
                    ...prev,
                    ...newDisabled,
                }));
            }
        } catch (error) {
            showErrorNotification("Lỗi khi xử lý thêm lớp học", error.message);
            console.error("Lỗi khi xử lý chọn lớp:", error);
        }
    };

    // hàm xử lý để cập nhật trạng thái các lớp học đã chọn
    useEffect(() => {
        const calculateDisabledClasses = () => {
            const updatedDisabled = {};
            const selectedIds = Object.keys(selectedClasses);

            classData.forEach((cls) => {
                for (const selectedId of selectedIds) {
                    const selected = classData.find((c) => c.malh === selectedId);
                    if (!selected) continue;

                    const sameSubject = cls.mamh === selected.mamh;
                    const sameDay = cls.thu === selected.thu;
                    const timeOverlap = !(cls.tietKetThuc < selected.tietBatDau || cls.tietBatDau > selected.tietKetThuc);

                    if (!selectedIds.includes(cls.malh) && (sameSubject || (sameDay && timeOverlap))) {
                        updatedDisabled[cls.malh] = true;
                    }
                }
            });

            setDisabledClasses(updatedDisabled);
        };

        calculateDisabledClasses();
    }, [selectedClasses, classData]);

    const filteredClasses = classData.filter((item) => item.malh.toLowerCase().includes(searchTerm.toLowerCase()) || item.mamh?.toLowerCase().includes(searchTerm.toLowerCase()));

    // hàm xác nhận đăng ký
    const handleConfirmRegistration = () => {
        message.success("Đăng ký thành công!");
        window.location.reload();
    };

    return (
        <div className={cx("wrapper")}>
            <div className="container">
                <h2 className={cx("title")}>Danh sách lớp mở đăng ký</h2>
                <input type="text" placeholder="Nhập mã lớp hoặc mã môn học để tìm kiếm..." className={cx("search-input", "full-width")} value={searchTerm} onChange={handleSearch} />
                <table className={cx("table")}>
                    <thead>
                        <tr>
                            <th className={cx("th", "header")}></th>
                            <th className={cx("th", "header")}>Mã lớp học</th>
                            <th className={cx("th", "header")}>Mã môn học</th>
                            <th className={cx("th", "header")}>Tên môn học</th>
                            <th className={cx("th", "header")}>Sĩ số</th>
                            <th className={cx("th", "header")}>Tiết bắt đầu</th>
                            <th className={cx("th", "header")}>Tiết kết thúc</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredClasses.map((item, index) => (
                            <tr
                                key={item.id || index}
                                className={cx("tr", {
                                    even: index % 2 === 0,
                                    odd: index % 2 !== 0,
                                })}
                            >
                                <td className={cx("td")}>
                                    <input type="checkbox" className={cx("checkbox-small")} checked={!!selectedClasses[item.malh]} disabled={!!disabledClasses[item.malh]} onChange={() => toggleSelection(item)} />
                                </td>
                                <td className={cx("td")}>{item.malh}</td>
                                <td className={cx("td")}>{item.mamh}</td>
                                <td className={cx("td")}>{item.tenMH}</td>
                                <td className={cx("td")}>{item.soLuongSinhVien}</td>
                                <td className={cx("td")}>{item.tietBatDau}</td>
                                <td className={cx("td")}>{item.tietKetThuc}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {classData.length > 0 && (
                    <div className={cx("confirm-container")}>
                        <button onClick={handleConfirmRegistration} className={cx("confirm-button")}>
                            Xác nhận đăng ký
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ClassList;
