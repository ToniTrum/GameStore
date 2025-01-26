import "./Footer.css";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import PrivacyPolicyPanel from "../PrivacyPolicyPage/PrivacyPolicyPanel";
import useAxios from "../../utils/useAxios";

const Footer = () => {
  const [isShow, setIsShow] = useState(false);
  const { user } = useContext(AuthContext);
  const [isSubscribed, setIsSubscribed] = useState(user?.subscribed || false);
  const navigate = useNavigate();
  const api = useAxios();

  const handleOpenModal = () => {
    setIsShow((prev) => !prev);
  };

  const handleSupportClick = () => {
    if (user !== null) {
      navigate(`/user/id/${user.user_id}/feedback/page/1`);
    } else {
      navigate("/auth-warning");
    }
  };

  const handleSubscribeClick = async () => {
    try {
      await api.put(`/users/subscribe/${user?.user_id}/`);
      setIsSubscribed((prev) => !prev);
    } catch (error) {
      console.error("Failed to update subscription:", error);
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

            <li>
              <button
                className="subscribe-button"
                onClick={handleSubscribeClick}
              >
                {isSubscribed
                  ? "Отписаться от обновлений"
                  : "Подписаться на обновления"}
              </button>
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
};

export default Footer;
