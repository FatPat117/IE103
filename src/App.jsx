import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import ClassList from "./pages/ClassList/ClassList";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import Schedule from "./pages/Schedule/Schedule";
import { Routes, Route } from "react-router-dom";

function App() {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/dashboard" element={<Home />} />
                <Route path="/dang-ky-hoc-phan" element={<ClassList />} />
                <Route path="/danh-sach-lop" element={<Schedule />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
            <Footer />
        </>
    );
}

export default App;
