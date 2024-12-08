import { useContext } from "react"

import AuthContext from "../../context/AuthContext"

const Profile = () => {
    const {user, setUser} = useContext(AuthContext)

    return (
        <main>
            <section className="profile">
                
            </section>
        </main>
    )
}