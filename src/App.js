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

function App() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<FrontLayout />} path="/">
          <Route path="" element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
        {isAuthenticated ? (
          <Route path="/" element={<AdminLayout />}>
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="protfolios" element={<PortfoliosPage />} />
            <Route path="skills" element={<SkillsPage />} />
          </Route>
        ) : null}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
