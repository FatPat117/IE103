import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import AdminDashboard from "./components/Admin/AdminDashboard";
import Students from "./components/Admin/Student";
import Subjects from "./components/Admin/Subjects";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";

import ClassList from "./pages/ClassList/ClassList";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Schedule from "./pages/Schedule/Schedule";


import AdminRoute from "./routes/AdminRoute";

function App() {
        const location = useLocation();
        const [userRole, setUserRole] = useState(localStorage.getItem("userRole"));

        useEffect(() => {
                setUserRole(localStorage.getItem("userRole"));
        }, [location.pathname]);

        const isLoginPage = location.pathname === "/login";
        const isAdminPage = location.pathname.startsWith("/admin");

        if (!userRole && location.pathname !== "/login") {
                return <Navigate to="/login" replace />;
        }

        return (
                <>
                        {!isLoginPage && !isAdminPage && <Header />}
                        <Routes>
                                <Route path="/" element={userRole ? <Home /> : <Navigate to="/login" />} />
                                <Route path="/dashboard" element={userRole ? <Home /> : <Navigate to="/login" />} />
                                <Route
                                        path="/dang-ky-hoc-phan"
                                        element={userRole ? <ClassList /> : <Navigate to="/login" />}
                                />
                                <Route
                                        path="/danh-sach-lop"
                                        element={userRole ? <Schedule /> : <Navigate to="/login" />}
                                />
                                <Route path="/login" element={<Login />} />

                                <Route element={<AdminRoute />}>
                                        <Route
                                                path="/admin"
                                                element={
                                                        userRole === "admin" ? (
                                                                <AdminDashboard />
                                                        ) : (
                                                                <Navigate to="/login" />
                                                        )
                                                }
                                        />
                                        <Route
                                                path="/admin/subjects"
                                                element={userRole === "admin" ? <Subjects /> : <Navigate to="/login" />}
                                        />
                                        <Route
                                                path="/admin/students"
                                                element={userRole === "admin" ? <Students /> : <Navigate to="/login" />}
                                        />
                                </Route>
                        </Routes>
                        {!isLoginPage && !isAdminPage && <Footer />}
                </>
        );
}

export default App;
