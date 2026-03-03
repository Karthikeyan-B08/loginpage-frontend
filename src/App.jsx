import { Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/Auth/Auth/LoginPage";
import RegisterPage from "./Pages/Auth/Auth/RegisterPage";
import Forgotpwd from "./Pages/Auth/Auth/Forgotpwd";
import ProfileUpdatedPage from "./Pages/Auth/Auth/ProfileUpdatedPage";
import ResetPasswordPage from "./Pages/Auth/Auth/ResetPasswordPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<Forgotpwd />} />
      <Route path="/profile-updated" element={<ProfileUpdatedPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
    </Routes>
  );
}

export default App;
