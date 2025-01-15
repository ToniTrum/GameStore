import "./Footer.css";
import { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import PrivacyPolicyPanel from "../PrivacyPolicyPage/PrivacyPolicyPanel";

const Footer = () => {
  const [isShow, setIsShow] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleOpenModal = () => {
    setIsShow((prev) => !prev);
  };

  const handleSupportClick = () => {
    if (user !== null) {
      navigate(`/user/id/${user.user_id}/feedback`);
    } else {
      navigate("/auth-warning");
    }
  };

  return (
    <>
      <PrivacyPolicyPanel isShow={isShow} setIsShow={setIsShow} />

      <footer className="footer">
        <div className="footer-container">
          <p>
            &copy; {new Date().getFullYear()} Game Store. Все права защищены.
          </p>
          <ul className="footer-links">
            <li>
              <span className="link" onClick={handleOpenModal}>
                Политика конфиденциальности
              </span>
            </li>
            <li>
              <span className="link" onClick={handleSupportClick}>
                Поддержка
              </span>
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
};

export default Footer;
