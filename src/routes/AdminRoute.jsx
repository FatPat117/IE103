import { Navigate, Outlet } from "react-router-dom";
import Admin from "../components/Admin/Admin";

const AdminRoute = () => {
    const userRole = sessionStorage.getItem("userRole");

    return userRole === "ADMIN" ? (
        <Admin>
            <Outlet />
        </Admin>
    ) : (
        <Navigate to="/login" />
    );
};
export default AdminRoute;
