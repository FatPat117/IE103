import classNames from "classnames/bind";
import styles from "../Login/Login.module.css";

import logo_header from "../../assets/image/logo_header.png";

const cx = classNames.bind(styles);

function Login() {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("login-container")}>
                <div className={cx("login-box")}>
                    <div className={cx("login-logo")}>
                        <img src={logo_header} alt="Logo UIT" className={cx("logo")} />
                    </div>
                    <form>
                        <input type="text" placeholder="Mã số sinh viên" required />
                        <input type="password" placeholder="Mật khẩu" required />
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
