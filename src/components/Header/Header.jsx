import classNames from "classnames/bind";
import styles from "./Header.module.scss";

import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import logo from "../../assets/image/logo.png";
import avatar from "../../assets/image/avatar.jpg";

import { faEnvelope, faGraduationCap, faSignOut, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tippy from "@tippyjs/react/headless";

import { getUserAPI, logoutAPI } from "~/services/api.service";

const cx = classNames.bind(styles);

function Header() {
    const [activeLink, setActiveLink] = useState(() => sessionStorage.getItem("activeLink") || "dashboard");
    const [userDetails, setUserDetails] = useState(null);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const user = JSON.parse(sessionStorage.getItem("user"));

            if (!user || !user.email) {
                alert("Không tìm thấy thông tin người dùng!");
                return;
            }

            const res = await logoutAPI(user.email);

            if (res) {
                sessionStorage.removeItem("accessToken");
                sessionStorage.removeItem("refreshToken");
                sessionStorage.removeItem("user");
                sessionStorage.removeItem("userRole");
                sessionStorage.removeItem("activeLink");
                navigate("/login");
            }
        } catch (error) {
            alert("Lỗi đăng xuất: " + error.message);
        }
    };

    const handleNavClick = (link) => {
        setActiveLink(link);
        sessionStorage.setItem("activeLink", link);
    };

    // Lấy thông tin người dùng khi component mount
    useEffect(() => {
        const loadUser = async () => {
            const cachedUser = sessionStorage.getItem("user");

            if (cachedUser) {
                // Đã có user trong sessionStorage
                setUserDetails(JSON.parse(cachedUser));
            } else {
                // Gọi API để lấy user
                try {
                    const res = await getUserAPI();
                    if (res) {
                        sessionStorage.setItem("user", JSON.stringify(res));
                        setUserDetails(res);
                    }
                } catch (error) {
                    console.error("Lỗi khi lấy thông tin người dùng:", error.message);
                }
            }
        };

        loadUser();
    }, []);

    const isAdmin = sessionStorage.getItem("userRole") === "ADMIN";

    return (
        <header className={cx("header")}>
            <div className={cx("container")}>
                <div className={cx("header__content")}>
                    {/* Logo */}
                    <div className={cx("logo")}>
                        <Link to="">
                            <img src={logo} alt="logo" className={cx("logo__img")} />
                        </Link>
                    </div>

                    {/* Navigation */}
                    <nav className={cx("navbar")}>
                        <ul className={cx("navbar__list")}>
                            <li className={cx("navbar__item")}>
                                <Link
                                    to="/dashboard"
                                    className={cx("navbar__link", { active: activeLink === "dashboard" })}
                                    onClick={() => handleNavClick("dashboard")}
                                >
                                    Dashboard
                                </Link>
                            </li>
                            <li className={cx("navbar__item")}>
                                <Link
                                    to="/dang-ky-hoc-phan"
                                    className={cx("navbar__link", { active: activeLink === "dang-ky-hoc-phan" })}
                                    onClick={() => handleNavClick("dang-ky-hoc-phan")}
                                >
                                    Đăng ký học phần
                                </Link>
                            </li>
                            <li className={cx("navbar__item")}>
                                <Link
                                    to="/xac-nhan-hoc-phan"
                                    className={cx("navbar__link", { active: activeLink === "xac-nhan-hoc-phan" })}
                                    onClick={() => handleNavClick("xac-nhan-hoc-phan")}
                                >
                                    Xác nhận đăng ký học phần
                                </Link>
                            </li>
                            <li className={cx("navbar__item")}>
                                <Link
                                    to="/danh-sach-lop"
                                    className={cx("navbar__link", { active: activeLink === "danh-sach-lop" })}
                                    onClick={() => handleNavClick("danh-sach-lop")}
                                >
                                    Danh sách lớp đã đăng ký
                                </Link>
                            </li>
                        </ul>
                    </nav>

                    {/* Actions */}
                    <div className={cx("header__action")}>
                        <Tippy
                            interactive
                            offset={[12, 8]}
                            delay={[0, 700]}
                            placement="bottom-end"
                            render={(attrs) => (
                                <div className={cx("wrapper")} tabIndex="-1" {...attrs}>
                                    {isAdmin ? (
                                        <Link to="/admin">
                                            <button className={cx("action-btn")}>
                                                <span className={cx("icon")}>
                                                    <FontAwesomeIcon icon={faUser} />
                                                </span>
                                                <span className={cx("title")}>Admin Dashboard</span>
                                            </button>
                                        </Link>
                                    ) : userDetails ? (
                                        <>
                                            <div className={cx("user-details")}>
                                                <span className={cx("icon")}>
                                                    <FontAwesomeIcon icon={faUser} />
                                                </span>
                                                <span className={cx("title")}>{userDetails.ms}</span>
                                            </div>
                                            <div className={cx("user-details")}>
                                                <span className={cx("icon")}>
                                                    <FontAwesomeIcon icon={faGraduationCap} />
                                                </span>
                                                <span className={cx("title")}>{userDetails.ten}</span>
                                            </div>
                                            <div className={cx("user-details")}>
                                                <span className={cx("icon")}>
                                                    <FontAwesomeIcon icon={faEnvelope} />
                                                </span>
                                                <span className={cx("title")}>{userDetails.email}</span>
                                            </div>
                                        </>
                                    ) : null}

                                    <button className={cx("action-btn")} onClick={handleLogout}>
                                        <span className={cx("icon")}>
                                            <FontAwesomeIcon icon={faSignOut} />
                                        </span>
                                        <span className={cx("title")}>Thoát</span>
                                    </button>
                                </div>
                            )}
                        >
                            <div className={cx("user_details")}>
                                {userDetails ? (
                                    <p className={cx("user__name")}>{userDetails.name}</p>
                                ) : (
                                    <p>Đang tải...</p>
                                )}
                                <img src={avatar} className={cx("user__avatar")} alt="Avatar" />
                            </div>
                        </Tippy>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
