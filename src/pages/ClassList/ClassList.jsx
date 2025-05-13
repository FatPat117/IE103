import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./ClassList.module.css";
import {
    getAllClassesAPI,
    createRegistrationAPI,
    addClassToRegistrationAPI,
    removeClassFromRegistrationAPI,
    getRegistrationFormByIdAPI,
} from "~/services/api.service";

const cx = classNames.bind(styles);

function ClassList() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedClasses, setSelectedClasses] = useState({});
    const [disabledClasses, setDisabledClasses] = useState({});
    const [classData, setClassData] = useState([]);
    const [registrationId, setRegistrationId] = useState(null);

    const studentId = localStorage.getItem("studentId");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const classes = await getAllClassesAPI();
                setClassData(classes);

                if (!classes || classes.length === 0) {
                    alert("Không có lớp học nào để tạo phiếu đăng ký.");
                    return;
                }

                const firstClass = classes[0];
                const newHocKi = firstClass.hocKi;
                const newNamHoc = firstClass.namHoc;

                const registration = await createRegistrationAPI({
                    hocKi: newHocKi,
                    namHoc: newNamHoc,
                    soTinChi: 0,
                    maSV: studentId,
                });

                setRegistrationId(registration.maPDK);
                const pdk = await getRegistrationFormByIdAPI(registration.maPDK);
                console.log(pdk);
            } catch (error) {
                alert(error.message);
                console.error("Lỗi khi khởi tạo dữ liệu:", error);
            }
        };

        fetchData();
    }, [studentId]);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const toggleSelection = async (selectedClass) => {
        const { malh } = selectedClass;

        try {
            if (selectedClasses[malh]) {
                // Nếu đã chọn => Bỏ chọn => Gọi API xóa
                await removeClassFromRegistrationAPI(registrationId, malh);

                const pdk = await getRegistrationFormByIdAPI(registrationId);
                console.log(pdk);

                // Cập nhật selectedClasses (gỡ lớp ra)
                setSelectedClasses((prev) => {
                    const updated = { ...prev };
                    delete updated[malh];
                    return updated;
                });

                // Tính lại disabledClasses dựa trên các lớp còn đang chọn
                const updatedDisabled = {};
                const selectedIds = Object.keys(selectedClasses).filter((id) => id !== malh);
                // lấy ra id của những lớp đã được chọn

                // Lặp qua từng lớp học trong danh sách classData
                classData.forEach((cls) => {
                    // Lặp qua từng ID lớp học đã được chọn
                    for (const selectedId of selectedIds) {
                        // Tìm lớp học tương ứng với ID đã chọn
                        const selected = classData.find((c) => c.malh === selectedId);
                        if (!selected) continue;
                        // Trường hợp mã lớp bị lỗi gì đó dẫn đến id của lớp đã được chọn không nằm trong danh sách lớp ban đầu, thêm vào để chắc chắn đoạn code sẽ chạy đúng

                        // Kiểm tra xem lớp hiện tại (cls) và lớp đã chọn (selected) có cùng môn học không
                        const sameSubject = cls.mamh === selected.mamh;

                        // Kiểm tra xem lớp hiện tại (cls) và lớp đã chọn (selected) có cùng ngày học không
                        const sameDay = cls.thu === selected.thu;

                        // Kiểm tra xem thời gian học của hai lớp có bị trùng nhau không
                        const timeOverlap = !(
                            cls.tietKetThuc < selected.tietBatDau || cls.tietBatDau > selected.tietKetThuc
                        );

                        // Nếu lớp hiện tại chưa nằm trong danh sách những lớp đã được chọn và vi phạm các mục khác thì thêm nó vào disable
                        if (!selectedIds.includes(cls.malh) && (sameSubject || (sameDay && timeOverlap))) {
                            updatedDisabled[cls.malh] = true;
                        }
                    }
                });

                setDisabledClasses(updatedDisabled);
            } else {
                // Nếu chưa chọn => Thêm lớp
                await addClassToRegistrationAPI(registrationId, malh);

                const pdk = await getRegistrationFormByIdAPI(registrationId);
                console.log(pdk);

                setSelectedClasses((prev) => ({
                    ...prev,
                    [malh]: true,
                }));

                // Vô hiệu hóa các lớp trùng môn hoặc trùng lịch, trừ lớp vừa chọn
                const conflicts = classData.filter((cls) => {
                    const sameSubject = cls.mamh === selectedClass.mamh;
                    const sameDay = cls.thu === selectedClass.thu;
                    const timeOverlap = !(
                        cls.tietKetThuc < selectedClass.tietBatDau || cls.tietBatDau > selectedClass.tietKetThuc
                    );

                    return (
                        cls.malh !== malh && // không disable chính lớp đang chọn
                        !selectedClasses[cls.malh] &&
                        (sameSubject || (sameDay && timeOverlap))
                    );
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
            alert(error.message);
            console.error("Lỗi khi xử lý chọn lớp:", error);
        }
    };

    const filteredClasses = classData.filter(
        (item) =>
            item.malh.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.mamh?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className={cx("wrapper")}>
            <div className="container">
                <h2 className={cx("title")}>Danh sách lớp mở đăng ký</h2>
                <input
                    type="text"
                    placeholder="Nhập mã lớp hoặc mã môn học để tìm kiếm..."
                    className={cx("search-input", "full-width")}
                    value={searchTerm}
                    onChange={handleSearch}
                />
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
                                    <input
                                        type="checkbox"
                                        className={cx("checkbox-small")}
                                        checked={!!selectedClasses[item.malh]}
                                        disabled={!!disabledClasses[item.malh]}
                                        onChange={() => toggleSelection(item)}
                                    />
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
            </div>
        </div>
    );
}

export default ClassList;
