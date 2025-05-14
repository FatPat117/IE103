import classNames from "classnames/bind";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo_header from "../../assets/image/logo_header.png";
import styles from "../Login/Login.module.css";
import { loginAPI } from "../../services/api.service";

const cx = classNames.bind(styles);

function Login() {
    const [studentId, setStudentId] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMessage("");

        try {
            const res = await loginAPI(studentId, password, true);
            localStorage.setItem("studentId", res.id);
            const role = res.role;
            if (role === "SINHVIEN") {
                setTimeout(() => {
                    navigate("/dashboard");
                }, 100);
            } else if (role === "ADMIN") {
                setTimeout(() => {
                    navigate("/admin");
                }, 100);
            }
        } catch (error) {
            setErrorMessage("Mã số sinh viên hoặc mật khẩu không đúng!");
        }
    };

    return (
        <div className={cx("wrapper")}>
            <div className={cx("login-container")}>
                <div className={cx("login-box")}>
                    <div className={cx("login-logo")}>
                        <img src={logo_header} alt="Logo UIT" className={cx("logo")} />
                    </div>
                    <form onSubmit={handleLogin}>
                        <input type="text" placeholder="Mã số sinh viên" required value={studentId} onChange={(e) => setStudentId(e.target.value)} />
                        <input type="password" placeholder="Mật khẩu" required value={password} onChange={(e) => setPassword(e.target.value)} />
                        {errorMessage && <div className={cx("error-message")}>{errorMessage}</div>} {/* Hiển thị lỗi nếu có */}
                        <button className={cx("login-btn")} type="submit">
                            Đăng nhập
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
