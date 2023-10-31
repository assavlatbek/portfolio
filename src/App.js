import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import HomePage from "./pages/common/HomePage";
import DashboardPage from "./pages/admin/DashboardPage";
import SkillsPage from "./pages/admin/SkillsPage";
import FrontLayout from "./layout/front-layout";
import LoginPage from "./pages/common/LoginPage";
import RegisterPage from "./pages/common/RegisterPage";
import AdminLayout from "./layout/admin-layout";
import PortfoliosPage from "./pages/admin/PortfoliosPage";
import { ToastContainer } from "react-toastify";
import UserPage from "./pages/user/UserPage";
import Cookies from "js-cookie";
import Logout from "./pages/common/Logout";
import Users from "./pages/admin/Users";
import Education from "./pages/admin/Education";
import Experiences from "./pages/admin/Experiences";
import { useEffect, useState } from "react";

function App() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [role, setRole] = useState("");

  useEffect(() => {
    const roleCookie = Cookies.get("ROLE");
    setRole(roleCookie);
  }, [isAuthenticated]);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<FrontLayout />} path="/">
          <Route path="" element={<HomePage />} />
          <Route
            path="login"
            element={
              role === "admin" ? <Navigate to={"/dashboard"} /> : <LoginPage />
            }
          />
          <Route path="register" element={<RegisterPage />} />
        </Route>
        {role === "admin" ? (
          <>
            <Route path="/" element={<AdminLayout />}>
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="portfolios" element={<PortfoliosPage />} />
              <Route path="skills" element={<SkillsPage />} />
              <Route path="users" element={<Users />} />
              <Route path="education" element={<Education />} />
              <Route path="experiences" element={<Experiences />} />
            </Route>
          </>
        ) : null}
        {role === "user" ? <Route path="/user" element={<UserPage />} /> : null}
        {isAuthenticated ? <Route path="/logout" element={<Logout />} /> : null}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
