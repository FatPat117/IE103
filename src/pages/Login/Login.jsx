import classNames from "classnames/bind";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo_header from "../../assets/image/logo_header.png";
import { loginAPI } from "../../services/api.service";
import styles from "../Login/Login.module.css";

const cx = classNames.bind(styles);

function Login() {
        const [studentId, setStudentId] = useState("");
        const [password, setPassword] = useState("");
        const navigate = useNavigate();

        const handleLogin = async (e) => {
                e.preventDefault();

                try {
                        const res = await loginAPI(studentId, password, true);

                        if (res) {
                                alert("Đăng nhập thành công!");
                                console.log(res);

                                // localStorage.setItem("accessToken", res.accesstoken);
                                // localStorage.setItem("refreshToken", res.refreshtoken);
                                // navigate("/dashboard");
                                // window.location.reload();
                        } else {
                                alert("Mã số sinh viên hoặc mật khẩu không đúng!");
                        }
                } catch (error) {
                        alert("Lỗi đăng nhập: " + error.message);
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
