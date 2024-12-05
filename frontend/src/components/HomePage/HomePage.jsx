import { useContext } from "react"
import { jwtDecode } from "jwt-decode"
import {Link} from "react-router-dom"

import AuthContext from "../../context/AuthContext"
import './HomePage.css'


const HomePage = () => {
    const {user, logoutUser} = useContext(AuthContext)
    const token = localStorage.getItem("authTokens")

    if (token) {
        const decodedToken = jwtDecode(token)
        let userID = decodedToken.user_id
    }

    return (
        <main>
            <section className="home-section">
                <h1 className="home-title">
                    Добро пожаловать, <span className="white">{user.username}</span>
                </h1>

                
            </section>
        </main>
    )
}

export default HomePage