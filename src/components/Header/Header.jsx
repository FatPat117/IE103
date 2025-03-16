import React, { useState } from "react";
import "../Header/Header.css";
import logo from "../../assets/image/logo.png";
import avatar from "../../assets/image/avatar.jpg";

import { Link } from "react-router-dom";
import Tippy from "@tippyjs/react/headless";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut, faUser } from "@fortawesome/free-solid-svg-icons";

function Header() {
    const [activeLink, setActiveLink] = useState("dashboard");

    const handleNavClick = (link) => {
        setActiveLink(link);
    };

    return (
        <header className="header">
            <div className="container">
                <div className="header__content">
                    {/* Logo */}
                    <div className="logo">
                        <Link to="/">
                            <img src={logo} alt="logo" className="logo__img" />
                        </Link>
                    </div>

                    {/* Navigation */}
                    <nav className="navbar">
                        <ul className="navbar__list">
                            <li className="navbar__item">
                                <Link
                                    to="/dashboard"
                                    className={`navbar__link ${activeLink === "dashboard" ? "active" : ""}`}
                                    onClick={() => handleNavClick("dashboard")}
                                >
                                    Dashboard
                                </Link>
                            </li>
                            <li className="navbar__item">
                                <Link
                                    to="/dang-ky-hoc-phan"
                                    className={`navbar__link ${activeLink === "dang-ky-hoc-phan" ? "active" : ""}`}
                                    onClick={() => handleNavClick("dang-ky-hoc-phan")}
                                >
                                    Đăng ký học phần
                                </Link>
                            </li>
                            <li className="navbar__item">
                                <Link
                                    to="/xac-nhan-hoc-phan"
                                    className={`navbar__link ${activeLink === "xac-nhan-hoc-phan" ? "active" : ""}`}
                                    onClick={() => handleNavClick("xac-nhan-hoc-phan")}
                                >
                                    Xác nhận đăng ký học phần
                                </Link>
                            </li>
                            <li className="navbar__item">
                                <Link
                                    to="/danh-sach-lop"
                                    className={`navbar__link ${activeLink === "danh-sach-lop" ? "active" : ""}`}
                                    onClick={() => handleNavClick("danh-sach-lop")}
                                >
                                    Danh sách lớp đã đăng ký
                                </Link>
                            </li>
                        </ul>
                    </nav>

                    {/* Actions */}
                    <div className="header__action">
                        <Tippy
                            interactive
                            offset={[12, 8]}
                            delay={[0, 700]}
                            placement="bottom-end"
                            render={(attrs) => (
                                <div className="wrapper" tabIndex="-1" {...attrs}>
                                    <button className="action-btn">
                                        <span className="icon">
                                            <FontAwesomeIcon icon={faUser} />
                                        </span>
                                        <span className="title">Hồ sơ</span>
                                    </button>

                                    <button className="action-btn">
                                        <span className="icon">
                                            <FontAwesomeIcon icon={faSignOut} />
                                        </span>
                                        <span className="title">Thoát</span>
                                    </button>
                                </div>
                            )}
                        >
                            <div className="user_details">
                                <p className="user__name">Trần Duy Nhân</p>
                                <img src={avatar} className="user__avatar" alt="Avatar" />
                            </div>
                        </Tippy>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
