import classNames from "classnames/bind";
import styles from "./Footer.module.scss";

const cx = classNames.bind(styles);

function Footer() {
    return (
        <footer className={cx("footer")}>
            <div className={cx("container")}>
                <div className={cx("footer-content")}>
                    <h2 className={cx("footer-title")}>PHÒNG ĐÀO TẠO ĐẠI HỌC</h2>
                    <p className={cx("footer-text")}>Phòng A120, Trường Đại học Công nghệ Thông tin.</p>
                    <p className={cx("footer-text")}>Khu phố 6, P. Linh Trung, Tp. Thủ Đức, Tp. Hồ Chí Minh.</p>
                    <p className={cx("footer-text")}>
                        Điện thoại: <strong>(028) 372 51993</strong>, Ext: <strong>113</strong> (Hệ từ xa qua mạng),
                        <strong>112</strong> (Hệ chính quy).
                    </p>
                    <p className={cx("footer-text")}>
                        Email:{" "}
                        <a href="mailto:phongdaotaodh@uit.edu.vn" className={cx("footer-email")}>
                            phongdaotaodh@uit.edu.vn
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
