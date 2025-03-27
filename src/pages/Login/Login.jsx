import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo_header from "../../assets/image/logo_header.png";
import styles from "../Login/Login.module.css";

const cx = classNames.bind(styles);

function Login() {
        const [studentId, setStudentId] = useState("");
        const [password, setPassword] = useState("");
        const [role, setRole] = useState(null);
        const navigate = useNavigate();

        useEffect(() => {
                if (role) {
                        navigate(role === "admin" ? "/admin" : "/dashboard");
                }
        }, [role, navigate]);

        const handleLogin = (e) => {
                e.preventDefault();

                const accounts = {
                        admin: { id: "admin", password: "admin123", role: "admin" },
                        student: { id: "SV001", password: "student123", role: "student" },
                };

                let user = Object.values(accounts).find((acc) => acc.id === studentId && acc.password === password);

                if (user) {
                        console.log("Đăng nhập thành công:", user.role);
                        localStorage.setItem("userRole", user.role);

                        setTimeout(() => {
                                navigate(user.role === "admin" ? "/admin" : "/dashboard");
                        }, 0); // Đảm bảo navigate chỉ chạy sau khi localStorage cập nhật
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
