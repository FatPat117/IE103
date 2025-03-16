import "../Footer/Footer.css";

function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div class="footer-content">
                    <h2 class="footer-title">PHÒNG ĐÀO TẠO ĐẠI HỌC</h2>
                    <p class="footer-text">Phòng A120, Trường Đại học Công nghệ Thông tin.</p>
                    <p class="footer-text">Khu phố 6, P. Linh Trung, Tp. Thủ Đức, Tp. Hồ Chí Minh.</p>
                    <p class="footer-text">
                        Điện thoại: <strong>(028) 372 51993</strong>, Ext: <strong>113</strong> (Hệ từ xa qua mạng),
                        <strong>112</strong> (Hệ chính quy).
                    </p>
                    <p class="footer-text">
                        Email:{" "}
                        <a href="mailto:phongdaotaodh@uit.edu.vn" class="footer-email">
                            phongdaotaodh@uit.edu.vn
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
