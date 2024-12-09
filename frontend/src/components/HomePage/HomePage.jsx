import { useContext } from "react"
import {Link} from "react-router-dom"

import AuthContext from "../../context/AuthContext"
import './HomePage.css'


const HomePage = () => {
    const {user} = useContext(AuthContext)

    return (
        <section className="home-section">
            <h1 className="home-title">
                Добро пожаловать, <span className="white">{user.username}</span>
            </h1>

        </section>
    )
}

export default HomePage