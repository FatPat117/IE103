import { Routes, Route, useLocation } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
<<<<<<< HEAD
import Confirmed from "./pages/ConfirmedList/Confirmed";

function App() {
        return (
                <>
                        <Header />
                        <Confirmed />
                        <Footer />
                </>
        );
=======
import ClassList from "./pages/ClassList/ClassList";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import Schedule from "./pages/Schedule/Schedule";
import Login from "./pages/Login/login";

function App() {
    const location = useLocation();
    const isLoginPage = location.pathname === "/login";

    return (
        <>
            {!isLoginPage && <Header />}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Home />} />
                <Route path="/dang-ky-hoc-phan" element={<ClassList />} />
                <Route path="/danh-sach-lop" element={<Schedule />} />
                <Route path="/login" element={<Login />} />
            </Routes>
            {!isLoginPage && <Footer />}
        </>
    );
>>>>>>> 0c4bca5ed936aceeea9352c62e4fcc94aa93afc5
}

export default App;
