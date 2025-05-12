import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./ClassList.module.css";
import { getAllClassesAPI } from "~/services/api.service";

const cx = classNames.bind(styles);

function ClassList() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedClasses, setSelectedClasses] = useState({});
    const [classData, setClassData] = useState([]);

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const data = await getAllClassesAPI();
                setClassData(data);
            } catch (error) {
                if (error?.response?.status === 500) {
                    alert("Lỗi máy chủ khi tải danh sách lớp học.");
                } else if (error?.response?.data?.message) {
                    alert(error.response.data.message);
                } else {
                    alert("Đã có lỗi xảy ra. Vui lòng thử lại.");
                }
                console.error("Lỗi khi gọi API:", error);
            }
        };

        fetchClasses();
    }, []);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const toggleSelection = (id) => {
        setSelectedClasses((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
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
                                className={cx("tr", { even: index % 2 === 0, odd: index % 2 !== 0 })}
                            >
                                <td className={cx("td")}>
                                    <input
                                        type="checkbox"
                                        className={cx("checkbox-small")}
                                        checked={!!selectedClasses[item.malh]}
                                        onChange={() => toggleSelection(item.malh)}
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
