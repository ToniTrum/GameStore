import { Link } from "react-router-dom";
import "./AuthWarningPage.css";

const AuthWarningPage = () => {
  return (
    <div className="auth-warning-container">
      <h1>Сначала авторизируйтесь</h1>
      <p>Для доступа к странице поддержки необходимо войти в систему.</p>
      <Link to="/login" className="auth-warning-link">
        Перейти к экрану входа
      </Link>
    </div>
  );
};

export default AuthWarningPage;
