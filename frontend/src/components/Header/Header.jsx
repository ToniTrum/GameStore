import {useState} from "react";
import {motion, AnimatePresence} from "framer-motion";

import gameStoreLogo from '../../assets/game-store-logo.png';
import sideMenuButton from '../../assets/side-menu.svg';
import xMarkButton from '../../assets/x-mark.svg';
import './Header.css'

const Header = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <header>
            <div className="header-title">
                <img
                    className="header-logo"
                    src={gameStoreLogo} 
                    alt="gameStoreLogo" />
                <h1 className="header-text">GAME STORE</h1>
            </div>

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
        </header>
    )
}

export default Header