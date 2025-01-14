import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import sideMenuButton from "../../assets/img/side-menu.svg";
import xMarkButton from "../../assets/img/x-mark.svg";

import NavbarItem from "../NavbarItem/NavbarItem";
import AuthContext from "../../context/AuthContext";

import "./Navbar.css";

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <AnimatePresence mode="wait">
        {isOpen ? (
          <motion.img
            key="open"
            className="side-menu-button"
            src={xMarkButton}
            alt="Close menu"
            onClick={() => setIsOpen(false)}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.15 }}
          />
        ) : (
          <motion.img
            key="close"
            className="side-menu-button"
            src={sideMenuButton}
            alt="Open menu"
            onClick={() => setIsOpen(true)}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.15 }}
          />
        )}
      </AnimatePresence>

      <motion.nav
        className={isOpen ? "open" : ""}
        initial={{ x: "100%" }}
        animate={isOpen ? { x: 0 } : { x: "100%" }}
        transition={{ duration: 0.3 }}
      >
        <ul className="navbar-list">
          <NavbarItem
            text="Главная"
            link={`/user/id/${user.user_id}`}
            onClick={() => setIsOpen(false)}
          />
          <NavbarItem
            text="Профиль"
            link={`/user/id/${user.user_id}/profile`}
            onClick={() => setIsOpen(false)}
          />
          <NavbarItem
            text="Магазин"
            link={`/user/id/${user.user_id}/store/page/1`}
            onClick={() => setIsOpen(false)}
          />
          <NavbarItem
            text="Библиотека"
            link={`/user/id/${user.user_id}/library/page/1`}
            onClick={() => setIsOpen(false)} />
          <li className="navbar-item">
            <Link
              className="navbar-link"
              to="/"
              onClick={() => {
                logoutUser();
                setIsOpen(false);
              }}
            >
              Выйти
            </Link>
            <div className="navbar-item-underline"></div>
          </li>
        </ul>
      </motion.nav>
    </>
  );
};

export default Navbar