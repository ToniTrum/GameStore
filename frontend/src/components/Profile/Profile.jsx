import { useContext } from "react"

import AuthContext from "../../context/AuthContext"
import ProfileItem from "../ProfileItem/ProfileItem"
import {API_URL} from "../../main"

import "./Profile.css"

const Profile = () => {
    const {user, setUser} = useContext(AuthContext)
    console.log(user)

    return (
        <section className="profile">
            <div className="profile-container">
                <div className="profile-avatar">
                    <img 
                        className="avatar"
                        src={API_URL + "/" + user.image} 
                        alt="avatar" />
                </div>
                
                <div className="profile-info">
                    <ul className="profile-list">
                        <ProfileItem paragraph="ID" value={user.user_id} />
                        <ProfileItem paragraph="Имя пользователя" value={user.username} />
                        <ProfileItem paragraph="Электронная почта" value={user.email} />
                        <ProfileItem paragraph="Имя" value={user.first_name} />
                        <ProfileItem paragraph="Фамилия" value={user.last_name} />
                        <ProfileItem paragraph="Дата рождения" value={user.birthdate} />
                        <ProfileItem paragraph="Страна" value={user.country} />
                    </ul>
                </div>
            </div>

            <div className="change-button">
                <button>Изменить данные</button>
            </div>
        </section>
    )
}

export default Profile