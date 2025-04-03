import classNames from "classnames/bind";
import styles from "./Home.module.css";


const cx = classNames.bind(styles);

function Home() {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("container")}>
                <h1 className={cx("heading")}>TRANG ĐĂNG KÝ HỌC PHẦN - TRƯỜNG ĐẠI HỌC CÔNG NGHỆ THÔNG TIN</h1>

                <div className={cx("box")}>
                    <h2 className={cx("title")}>HƯỚNG DẪN ĐĂNG KÝ HỌC PHẦN</h2>
                    <ul className={cx("list")}>
                        <li>1. Nhấn vào trình đơn Đăng ký Học phần</li>
                        <li>2. Chọn các lớp cần đăng ký</li>
                        <li>3. Nhấn vào nút Đăng ký</li>
                        <li>4. Chờ hệ thống xử lý thông báo kết quả</li>
                        <li>
                            5. Sau khi có kết quả xử lý, sinh viên kiểm tra và thực hiện chọn đăng ký tiếp, quay lại
                            bước 1
                        </li>
                    </ul>
                </div>

                <div className={cx("box")}>
                    <h2 className={cx("title")}>MỘT SỐ LỖI THƯỜNG GẶP</h2>

                    <p className={cx("bold")}>1. Không thấy các lớp dạy bằng Tiếng Anh?</p>
                    <p className={cx("desc")}>
                        Hãy chắc rằng bạn đã thỏa điều kiện chứng chỉ. Chứng chỉ phải thỏa mãn một trong các tiêu chí cụ
                        thể:
                    </p>
                    <ul className={cx("certificate-list")}>
                        <li>TOEIC-LR (≥ 500) kèm TOEIC-SW (≥ 160).</li>
                        <li>TOEFL iBT ≥ 50.</li>
                        <li>IELTS ≥ 5.</li>
                        <li>VNU-EPT ≥ 201.</li>
                        <li>VPET hoặc Cambridge (không cần kiểm tra thêm điểm).</li>
                    </ul>

                    <p className={cx("bold")}>2. Đã đóng học phí nhưng chưa được đăng ký?</p>

                    <p>Vui lòng chờ ít nhất 5 phút để hệ thống cập nhật thông tin.</p>
                </div>
            </div>
        </div>
    );
}

export default Home;
