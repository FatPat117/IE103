import { useState } from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "../Login/Login.module.css";
import logo_header from "../../assets/image/logo_header.png";

const cx = classNames.bind(styles);

function Login() {
    const [studentId, setStudentId] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        // Fake API
        const adminAccount = { id: "admin", password: "admin123", role: "admin" };
        const studentAccount = { id: "SV001", password: "student123", role: "student" };

        let userRole = null;

        if (studentId === adminAccount.id && password === adminAccount.password) {
            userRole = "admin";
        } else if (studentId === studentAccount.id && password === studentAccount.password) {
            userRole = "student";
        }

        if (userRole) {
            localStorage.setItem("userRole", userRole);

            if (userRole === "admin") {
                navigate("/admin");
            } else {
                navigate("/dashboard");
            }
        } else {
            alert("Mã số sinh viên hoặc mật khẩu không đúng!");
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
                        <input
                            type="text"
                            placeholder="Mã số sinh viên"
                            required
                            value={studentId}
                            onChange={(e) => setStudentId(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Mật khẩu"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button className={cx("login-btn")} type="submit">
                            Đăng nhập
                        </button>
                    </form>
                    <a href="#" className={cx("forgot-password")}>
                        Quên mật khẩu?
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Login;
