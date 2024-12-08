import { useContext } from "react"
import { jwtDecode } from "jwt-decode"
import {Link, Outlet} from "react-router-dom"

import AuthContext from "../../context/AuthContext"
import './HomePage.css'


const HomePage = () => {
    const {user} = useContext(AuthContext)

    return (
        <main>
            <section className="home-section">
                <h1 className="home-title">
                    Добро пожаловать, <span className="white">{user.username}</span>
                </h1>

                <Outlet />
            </section>
        </main>
    )
}

export default HomePage