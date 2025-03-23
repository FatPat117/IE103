import classNames from "classnames/bind";
import styles from "../Header/Header.module.css";

import React, { useState } from "react";
import avatar from "../../assets/image/avatar.jpg";
import logo from "../../assets/image/logo.png";

import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tippy from "@tippyjs/react/headless";
import { Link, useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

function Header() {
        const [activeLink, setActiveLink] = useState("dashboard");
        const navigate = useNavigate();

        const handleNavClick = (link) => {
                setActiveLink(link);
        };

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
                                                                        className={cx("navbar__link", {
                                                                                active: activeLink === "dashboard",
                                                                        })}
                                                                        onClick={() => handleNavClick("dashboard")}
                                                                >
                                                                        Dashboard
                                                                </Link>
                                                        </li>
                                                        <li className={cx("navbar__item")}>
                                                                <Link
                                                                        to="/dang-ky-hoc-phan"
                                                                        className={cx("navbar__link", {
                                                                                active:
                                                                                        activeLink ===
                                                                                        "dang-ky-hoc-phan",
                                                                        })}
                                                                        onClick={() =>
                                                                                handleNavClick("dang-ky-hoc-phan")
                                                                        }
                                                                >
                                                                        Đăng ký học phần
                                                                </Link>
                                                        </li>
                                                        <li className={cx("navbar__item")}>
                                                                <Link
                                                                        to="/xac-nhan-hoc-phan"
                                                                        className={cx("navbar__link", {
                                                                                active:
                                                                                        activeLink ===
                                                                                        "xac-nhan-hoc-phan",
                                                                        })}
                                                                        onClick={() =>
                                                                                handleNavClick("xac-nhan-hoc-phan")
                                                                        }
                                                                >
                                                                        Xác nhận đăng ký học phần
                                                                </Link>
                                                        </li>
                                                        <li className={cx("navbar__item")}>
                                                                <Link
                                                                        to="/danh-sach-lop"
                                                                        className={cx("navbar__link", {
                                                                                active: activeLink === "danh-sach-lop",
                                                                        })}
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
                                                                        <Link to="/login">
                                                                                <button className={cx("action-btn")}>
                                                                                        <span className={cx("icon")}>
                                                                                                <FontAwesomeIcon
                                                                                                        icon={faSignOut}
                                                                                                />
                                                                                        </span>
                                                                                        <span className={cx("title")}>
                                                                                                Thoát
                                                                                        </span>
                                                                                </button>
                                                                        </Link>
                                                                </div>
                                                        )}
                                                >
                                                        <div className={cx("user_details")}>
                                                                <p className={cx("user__name")}>Trần Duy Nhân</p>
                                                                <img
                                                                        src={avatar}
                                                                        className={cx("user__avatar")}
                                                                        alt="Avatar"
                                                                />
                                                        </div>
                                                </Tippy>
                                        </div>
                                </div>
                        </div>
                </header>
        );
}

export default Header;
