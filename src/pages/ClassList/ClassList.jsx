import { useState } from "react";
import classNames from "classnames/bind";
import styles from "./ClassList.module.css";

const cx = classNames.bind(styles);

const classData = [
    {
        id: "BUS1125.011",
        name: "Khởi nghiệp kinh doanh",
        credits: 3,
        schedule: "Thứ 5, Tiết 1234",
        registered: "21/100",
    },
    { id: "CE121.011", name: "Lý thuyết mạch điện", credits: 3, schedule: "Thứ 4, Tiết 6789", registered: "25/60" },
    { id: "CE121.011.1", name: "Lý thuyết mạch điện", credits: 3, schedule: "Thứ 4, Tiết 12345", registered: "22/30" },
    { id: "CE121.011.2", name: "Lý thuyết mạch điện", credits: 3, schedule: "Thứ 4, Tiết 12345", registered: "3/20" },
    {
        id: "CE408.011",
        name: "Đồ án chuyên ngành Thiết kế vi mạch",
        credits: 2,
        schedule: "Thứ *, Tiết *",
        registered: "1/100",
    },
    {
        id: "CE412.011",
        name: "Đồ án chuyên ngành Hệ thống nhúng và IoT",
        credits: 2,
        schedule: "Thứ *, Tiết *",
        registered: "3/100",
    },
    { id: "CS106.011", name: "Trí tuệ nhân tạo", credits: 3, schedule: "Thứ 2, Tiết 678", registered: "11/50" },
    {
        id: "CS112.011",
        name: "Phân tích và thiết kế hệ thống",
        credits: 3,
        schedule: "Thứ 3, Tiết 1234",
        registered: "4/50",
    },
    {
        id: "BUS1125.011",
        name: "Khởi nghiệp kinh doanh",
        credits: 3,
        schedule: "Thứ 5, Tiết 1234",
        registered: "21/100",
    },
    { id: "CE121.011", name: "Lý thuyết mạch điện", credits: 3, schedule: "Thứ 4, Tiết 6789", registered: "25/60" },
    { id: "CE121.011.1", name: "Lý thuyết mạch điện", credits: 3, schedule: "Thứ 4, Tiết 12345", registered: "22/30" },
    { id: "CE121.011.2", name: "Lý thuyết mạch điện", credits: 3, schedule: "Thứ 4, Tiết 12345", registered: "3/20" },
    {
        id: "CE408.011",
        name: "Đồ án chuyên ngành Thiết kế vi mạch",
        credits: 2,
        schedule: "Thứ *, Tiết *",
        registered: "1/100",
    },
    {
        id: "CE412.011",
        name: "Đồ án chuyên ngành Hệ thống nhúng và IoT",
        credits: 2,
        schedule: "Thứ *, Tiết *",
        registered: "3/100",
    },
    { id: "CS106.011", name: "Trí tuệ nhân tạo", credits: 3, schedule: "Thứ 2, Tiết 678", registered: "11/50" },
    {
        id: "CS112.011",
        name: "Phân tích và thiết kế hệ thống",
        credits: 3,
        schedule: "Thứ 3, Tiết 1234",
        registered: "4/50",
    },
    {
        id: "BUS1125.011",
        name: "Khởi nghiệp kinh doanh",
        credits: 3,
        schedule: "Thứ 5, Tiết 1234",
        registered: "21/100",
    },
    { id: "CE121.011", name: "Lý thuyết mạch điện", credits: 3, schedule: "Thứ 4, Tiết 6789", registered: "25/60" },
    { id: "CE121.011.1", name: "Lý thuyết mạch điện", credits: 3, schedule: "Thứ 4, Tiết 12345", registered: "22/30" },
    { id: "CE121.011.2", name: "Lý thuyết mạch điện", credits: 3, schedule: "Thứ 4, Tiết 12345", registered: "3/20" },
    {
        id: "CE408.011",
        name: "Đồ án chuyên ngành Thiết kế vi mạch",
        credits: 2,
        schedule: "Thứ *, Tiết *",
        registered: "1/100",
    },
    {
        id: "CE412.011",
        name: "Đồ án chuyên ngành Hệ thống nhúng và IoT",
        credits: 2,
        schedule: "Thứ *, Tiết *",
        registered: "3/100",
    },
    { id: "CS106.011", name: "Trí tuệ nhân tạo", credits: 3, schedule: "Thứ 2, Tiết 678", registered: "11/50" },
    {
        id: "CS112.011",
        name: "Phân tích và thiết kế hệ thống",
        credits: 3,
        schedule: "Thứ 3, Tiết 1234",
        registered: "4/50",
    },
    {
        id: "BUS1125.011",
        name: "Khởi nghiệp kinh doanh",
        credits: 3,
        schedule: "Thứ 5, Tiết 1234",
        registered: "21/100",
    },
    { id: "CE121.011", name: "Lý thuyết mạch điện", credits: 3, schedule: "Thứ 4, Tiết 6789", registered: "25/60" },
    { id: "CE121.011.1", name: "Lý thuyết mạch điện", credits: 3, schedule: "Thứ 4, Tiết 12345", registered: "22/30" },
    { id: "CE121.011.2", name: "Lý thuyết mạch điện", credits: 3, schedule: "Thứ 4, Tiết 12345", registered: "3/20" },
    {
        id: "CE408.011",
        name: "Đồ án chuyên ngành Thiết kế vi mạch",
        credits: 2,
        schedule: "Thứ *, Tiết *",
        registered: "1/100",
    },
    {
        id: "CE412.011",
        name: "Đồ án chuyên ngành Hệ thống nhúng và IoT",
        credits: 2,
        schedule: "Thứ *, Tiết *",
        registered: "3/100",
    },
    { id: "CS106.011", name: "Trí tuệ nhân tạo", credits: 3, schedule: "Thứ 2, Tiết 678", registered: "11/50" },
    {
        id: "CS112.011",
        name: "Phân tích và thiết kế hệ thống",
        credits: 3,
        schedule: "Thứ 3, Tiết 1234",
        registered: "4/50",
    },
];

function ClassList() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedClasses, setSelectedClasses] = useState({});

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const toggleSelection = (id) => {
        setSelectedClasses((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const filteredClasses = classData.filter((item) => item.id.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className={cx("wrapper")}>
            <div className="container">
                <h2 className={cx("title")}>Danh sách lớp mở đăng ký thử nghiệm</h2>
                <input
                    type="text"
                    placeholder="Nhập vào Mã môn học hoặc mã lớp để tìm kiếm, nhiều lớp cách nhau dấu phẩy, khoảng trắng, xuống dòng hoặc dấu chấm phẩy (,;\n\r)"
                    className={cx("search-input", "full-width")}
                    value={searchTerm}
                    onChange={handleSearch}
                />
                <table className={cx("table")}>
                    <thead>
                        <tr>
                            <th className={cx("th", "header")}></th>
                            <th className={cx("th", "header")}>Mã lớp</th>
                            <th className={cx("th", "header")}>Môn học</th>
                            <th className={cx("th", "header")}>Số TC</th>
                            <th className={cx("th", "header")}>Thời gian học</th>
                            <th className={cx("th", "header")}>Đã ĐK/Sĩ số</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredClasses.map((item, index) => (
                            <tr key={index} className={cx("tr", { even: index % 2 === 0, odd: index % 2 !== 0 })}>
                                <td className={cx("td")}>
                                    <input
                                        type="checkbox"
                                        className={cx("checkbox-small")}
                                        checked={!!selectedClasses[item.id]}
                                        onChange={() => toggleSelection(item.id)}
                                    />
                                </td>
                                <td className={cx("td")}>{item.id}</td>
                                <td className={cx("td")}>{item.name}</td>
                                <td className={cx("td")}>{item.credits}</td>
                                <td className={cx("td")}>{item.schedule}</td>
                                <td className={cx("td")}>{item.registered}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ClassList;
