import { Link } from "react-router-dom"

import './NavbarItem.css'

const NavbarItem = ({text, link, onClick}) => {
    return (
        <li onClick={() => onClick(false)} className="navbar-item">
            <Link className="navbar-link" to={link}>{text}</Link>
            <div className="navbar-item-underline"></div>
        </li>
    )
}

export default NavbarItem