import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<HomePage />} path="/" />
          <Route element={<LoginPage />} path="/login" />
          <Route element={<RegisterPage />} path="/register" />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
