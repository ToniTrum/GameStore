import {useState} from "react";
import {Link} from "react-router-dom";
import {motion, AnimatePresence} from "framer-motion";

import sideMenuButton from '../../assets/img/side-menu.svg';
import xMarkButton from '../../assets/img/x-mark.svg';

import NavbarItem from "../NavbarItem/NavbarItem";
import './Navbar.css'

const Navbar = () => {
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
                    <NavbarItem text="Профиль" link="/profile" />
                    <NavbarItem text="Выйти" link="/login" />
                </ul>
            </nav>
        </>
    )
}

export default Navbar