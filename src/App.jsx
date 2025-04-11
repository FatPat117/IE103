import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import AdminDashboard from "./components/Admin/AdminDashboard";
import Students from "./components/Admin/Students";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";

import ClassList from "./pages/ClassList/ClassList";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Schedule from "./pages/Schedule/Schedule";

import AdminRoute from "./routes/AdminRoute";
import Confirmed from "./pages/ConfirmedList/Confirmed";
import Classes from "./components/Admin/Classes";
import Teachers from "./components/Admin/Teacher";

function App() {
    const location = useLocation();
    const [userRole, setUserRole] = useState(sessionStorage.getItem("userRole"));

    useEffect(() => {
        const role = sessionStorage.getItem("userRole");
        setUserRole(role);
    }, [location.pathname]);

    const isLoginPage = location.pathname === "/login";
    const isAdminPage = location.pathname.startsWith("/admin");

    if (!sessionStorage.getItem("userRole") && !isLoginPage) {
        return <Navigate to="/login" replace />;
    }

    return (
        <>
            {!isLoginPage && !isAdminPage && <Header />}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Home />} />
                <Route path="/dang-ky-hoc-phan" element={<ClassList />} />
                <Route path="/xac-nhan-hoc-phan" element={<Confirmed />} />
                <Route path="/danh-sach-lop" element={<Schedule />} />
                <Route path="/login" element={<Login />} />

                <Route element={<AdminRoute />}>
                    <Route
                        path="/admin"
                        element={userRole === "ADMIN" ? <AdminDashboard /> : <Navigate to="/login" />}
                    />
                    <Route
                        path="/admin/classes"
                        element={userRole === "ADMIN" ? <Classes /> : <Navigate to="/login" />}
                    />
                    <Route
                        path="/admin/students"
                        element={userRole === "ADMIN" ? <Students /> : <Navigate to="/login" />}
                    />
                    <Route
                        path="/admin/teachers"
                        element={userRole === "ADMIN" ? <Teachers /> : <Navigate to="/login" />}
                    />
                </Route>
            </Routes>
            {!isLoginPage && !isAdminPage && <Footer />}
        </>
    );
}

export default App;
