import { Navigate, Outlet } from "react-router-dom";
import Admin from "../components/Admin/Admin";

const AdminRoute = () => {
    const userRole = localStorage.getItem("userRole");

    return userRole === "admin" ? (
        <Admin>
            <Outlet />
        </Admin>
    ) : (
        <Navigate to="/login" />
    );
};
export default AdminRoute;
