import { useLocation } from "react-router-dom";

import gameStoreLogo from "../../assets/img/game-store-logo.png";
import "./Header.css";

import Navbar from "./Navbar/Navbar";

const Header = () => {
  const location = useLocation();

  return (
    <header>
      <div className="header-title">
        <img className="header-logo" src={gameStoreLogo} alt="gameStoreLogo" />
        <h1 className="header-text">
          <span className="header-text-white">GAME</span>{" "}
          <span className="header-text-red">STORE</span>
        </h1>
      </div>

      {location.pathname !== "/" &&
        location.pathname !== "/login" &&
        location.pathname !== "/register" &&
        location.pathname !== "/reset-password/email" &&
        location.pathname !== "/reset-password/code" &&
        location.pathname !== "/reset-password" && <Navbar />}
    </header>
  );
};

export default Header;
