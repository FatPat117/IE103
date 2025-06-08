import classNames from "classnames/bind";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo_header from "../../assets/image/logo_header.png";
import styles from "../Login/Login.module.css";
import { loginAPI } from "../../services/api.service";
import { Eye, EyeOff } from "lucide-react";

const cx = classNames.bind(styles);

function Login() {
    const [studentId, setStudentId] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMessage("");

        try {
            const res = await loginAPI(studentId, password, true);

            sessionStorage.setItem("studentId", res.id);

            if (res.role === "SINHVIEN") {
                navigate("/dashboard");
            } else if (res.role === "ADMIN") {
                navigate("/admin");
            } else {
                setErrorMessage("Tài khoản không hợp lệ.");
            }
        } catch (error) {
            setErrorMessage(error.message);
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

                        <div className={cx("password-input-wrapper")}>
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Mật khẩu"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={cx("password-input")}
                            />
                            <button
                                type="button"
                                className={cx("toggle-password")}
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>

                        {errorMessage && <div className={cx("error-message")}>{errorMessage}</div>}
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
