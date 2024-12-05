import gameStoreLogo from '../../assets/img/game-store-logo.png';

import Navbar from '../Navbar/Navbar.jsx'
import './Header.css'

const Header = () => {
    return (
        <header>
            <div className="header-title">
                <img
                    className="header-logo"
                    src={gameStoreLogo} 
                    alt="gameStoreLogo" />
                <h1 className="header-text"><span className="white">GAME</span> STORE</h1>
            </div>

            <Navbar />
        </header>
    )
}

export default Header