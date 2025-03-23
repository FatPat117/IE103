import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import AdminDashboard from "./components/Admin/AdminDashboard";
import Students from "./components/Admin/Student";
import Subjects from "./components/Admin/Subjects";

import ClassList from "./pages/ClassList/ClassList";
import Home from "./pages/Home/Home";
import Schedule from "./pages/Schedule/Schedule";
import Login from "./pages/Login/Login";
import Confirmed from "./pages/ConfirmedList/Confirmed";


import AdminRoute from "./routes/AdminRoute";

function App() {
    const location = useLocation();
    const [userRole, setUserRole] = useState(localStorage.getItem("userRole"));

    useEffect(() => {
        setUserRole(localStorage.getItem("userRole"));
    }, [location.pathname]);

    console.log("userRole:", userRole);

    const isLoginPage = location.pathname === "/login";
    const isAdminPage = location.pathname.startsWith("/admin");

    if (!userRole && !isLoginPage) {
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
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/admin/subjects" element={<Subjects />} />
                    <Route path="/admin/students" element={<Students />} />
                </Route>
            </Routes>
            {!isLoginPage && !isAdminPage && <Footer />}
        </>
    );
}

export default App;
