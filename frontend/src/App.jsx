import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import PrivateRoutes from "./utils/PrivateRoutes";
import StartRoute from "./utils/StartRoute";

import Header from "./components/Header/Header";
import RegisterPanel from "./components/Authorization/RegisterPanel/RegisterPanel";
import LoginPanel from "./components/Authorization/LoginPanel/LoginPanel";
import EmailFieldForResetPassword from "./components/Authorization/EmailFieldForResetPassword/EmailFieldForResetPassword";
import ResetCodeField from "./components/Authorization/ResetCodeField/ResetCodeField";
import ResetPasswordPanel from "./components/Authorization/ResetPasswordPanel/ResetPasswordPanel";
import MainPage from "./components/MainPage/MainPage";
import HomePage from "./components/HomePage/HomePage";
import Profile from "./components/Profile/Profile";
import ChangePanel from "./components/ChangePanel/ChangePanel";
import ConfirmPasswordPanel from "./components/ConfirmPasswordPanel/ConfirmPasswordPanel";
import ChangeEmailField from "./components/ChangeEmailField/ChangeEmailField";
import StorePage from "./components/StorePage/StorePage";
import GamePage from "./components/GamePage/GamePage";
import PaymentPage from "./components/PaymentPage/PaymentPage";
import LibraryPage from "./components/LibraryPage/LibraryPage";
import FeedbackPanel from "./components/FeedbackPanel/FeedbackPanel";
import FeedbackPage from "./components/FeedbackPage/FeedbackPage";
import FeedbackViewPage from "./components/FeedbackViewPage/FeedbackViewPage";
import FeedbackEditPage from "./components/FeedbackEditPage/FeedbackEditPage";
import AuthWarningPage from "./components/AuthWarningPage/AuthWarningPage";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <Routes>
          {/* Публичные роуты */}
          <Route path="/" element={<StartRoute />} />
          <Route path="/login" element={<LoginPanel />} />
          <Route path="/register" element={<RegisterPanel />} />
          <Route path="/reset-password/email" element={<EmailFieldForResetPassword />} />
          <Route path="/reset-password/code" element={<ResetCodeField />} />
          <Route path="/reset-password" element={<ResetPasswordPanel />} />
          <Route path="/auth-warning" element={<AuthWarningPage />} />

          {/* Приватные роуты */}
          <Route element={<PrivateRoutes />}>
            <Route path="/user/id/:id" element={<MainPage />}>
              <Route index element={<HomePage />} />
              <Route path="profile" element={<Profile />} />
              <Route path="change" element={<ChangePanel />} />
              <Route path="confirm-password" element={<ConfirmPasswordPanel />} />
              <Route path="change-email" element={<ChangeEmailField />} />
              <Route path="store/page/:pageNumber" element={<StorePage />} />
              <Route path="library/page/:pageNumber" element={<LibraryPage />} />
              <Route path="game/id/:game_id" element={<GamePage />} />
              <Route path="payment" element={<PaymentPage />} />
              <Route path="feedback" element={<FeedbackPanel />} />
              <Route path="feedback/create" element={<FeedbackPage />} />
              <Route path="feedback/view/:feedback_id" element={<FeedbackViewPage />} />
              <Route path="feedback/edit/:feedback_id" element={<FeedbackEditPage />} />
            </Route>
          </Route>
        </Routes>
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
