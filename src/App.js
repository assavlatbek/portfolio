import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import HomePage from "./pages/common/HomePage";
import DashboardPage from "./pages/admin/DashboardPage";
import SkillsPage from "./pages/admin/SkillsPage";
import FrontLayout from "./layout/front-layout";
import LoginPage from "./pages/common/LoginPage";
import RegisterPage from "./pages/common/RegisterPage";
import PortfoliosPage from "./pages/admin/PortfoliosPage";
import { ToastContainer } from "react-toastify";
import UserPage from "./pages/user/UserPage";
import Cookies from "js-cookie";
import Logout from "./pages/common/Logout";
import Users from "./pages/admin/Users";
import Education from "./pages/admin/Education";
import Experiences from "./pages/admin/Experiences";
import AccountPage from "./pages/admin/AccountPage";
import ProfilePage from "./pages/user/ProfilePage";
import UserLayout from "./layout/user-layout";
import NotFound from "./pages/common/NotFound";
import EducationPage from "./pages/user/EducationPage";
import Skills from "./pages/user/Skills";
import AdminLayout from "./layout/admin-layout";

function App() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const role = Cookies.get("ROLE");

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<FrontLayout />} path="/">
          <Route path="" element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
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
              <Route path="account" element={<AccountPage />} />
            </Route>
          </>
        ) : null}
        {role === "client" ? (
          <>
            <Route path="/" element={<UserLayout />}>
              <Route path="profile" element={<ProfilePage />} />
              <Route path="as-education" element={<EducationPage />} />
              <Route path="as-skills" element={<Skills />} />
            </Route>
          </>
        ) : null}
        {isAuthenticated ? <Route path="/logout" element={<Logout />} /> : null}
        {role === "user" && <Route path="/user" element={<UserPage />} />}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
