import { useContext } from "react"

import AuthContext from "../../context/AuthContext"
import "./Profile.css"

const Profile = () => {
    const {user, setUser} = useContext(AuthContext)

    return (
        <main>
            <section className="profile">
                <img src={user.image} alt="avatar" />
            </section>
        </main>
    )
}

export default Profile