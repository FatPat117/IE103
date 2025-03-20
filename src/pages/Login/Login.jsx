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

        const accounts = {
            admin: { id: "admin", password: "admin123", role: "admin" },
            student: { id: "SV001", password: "student123", role: "student" },
        };

        let user = Object.values(accounts).find((acc) => acc.id === studentId && acc.password === password);

        if (user) {
            localStorage.setItem("userRole", user.role);
            navigate("/dashboard");
            window.location.reload();
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
                </div>
            </div>
        </div>
    );
}

export default Login;
