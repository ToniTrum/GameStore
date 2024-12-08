import {useState, useContext} from "react";
import { Link } from "react-router-dom";
import {motion, AnimatePresence} from "framer-motion";

import sideMenuButton from '../../assets/img/side-menu.svg';
import xMarkButton from '../../assets/img/x-mark.svg';

import NavbarItem from "../NavbarItem/NavbarItem";
import AuthContext from "../../context/AuthContext";

import './Navbar.css'
import { use } from "react";

const Navbar = () => {
    const {user, logoutUser} = useContext(AuthContext)

    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <AnimatePresence mode="wait">
                {isOpen ? (
                    <motion.img
                        key="open"
                        className="side-menu-button"
                        src={xMarkButton}
                        alt="Side menu"
                        onClick={() => setIsOpen(!isOpen)}
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
                        alt="Side menu"
                        onClick={() => setIsOpen(!isOpen)}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.15 }}
                    />
                )}
            </AnimatePresence>

            <nav className={isOpen ? "open" : ""}>
                <ul className="navbar-list">
                    <NavbarItem text="Главная" link={`/user/id/${user.user_id}`} setIsOpen={setIsOpen} />
                    <NavbarItem text="Профиль" link={`/user/id/${user.user_id}/profile`} setIsOpen={setIsOpen} />

                    <li className="navbar-item">
                        <Link className="navbar-link" onClick={() => logoutUser()}>Выйти</Link>
                        <div className="navbar-item-underline"></div>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default Navbar