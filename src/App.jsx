import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import AdminDashboard from "./components/Admin/AdminDashboard";
import Students from "./components/Admin/Student";
import Subjects from "./components/Admin/Subjects";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";

import ClassList from "./pages/ClassList/ClassList";
import Home from "./pages/Home/Home";
import Schedule from "./pages/Schedule/Schedule";
import Login from "./pages/Login/Login";
import Confirmed from "./pages/ConfirmedList/Confirmed";


import AdminRoute from "./routes/AdminRoute";

function App() {
<<<<<<< HEAD
        const location = useLocation();
        const [userRole, setUserRole] = useState(localStorage.getItem("userRole"));

        const location = useLocation();
        const [userRole, setUserRole] = useState(localStorage.getItem("userRole"));
=======
    const location = useLocation();
    const [userRole, setUserRole] = useState(localStorage.getItem("userRole"));

    useEffect(() => {
        setUserRole(localStorage.getItem("userRole"));
    }, [location.pathname]);

    console.log("userRole:", userRole);

    const isLoginPage = location.pathname === "/login";
    const isAdminPage = location.pathname.startsWith("/admin");

    if (userRole === null && !isLoginPage) {
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
>>>>>>> f2c8b7d9c0ec1ef878d57c8ae4145cf2bb1553b7

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
