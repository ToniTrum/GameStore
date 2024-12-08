import "./ProfileItem.css"

const ProfileItem = ({paragraph, value}) => {
    return (
        <li className="profile-item">
            <p className="profile-item__text">{paragraph}:</p>

            <p className="profile-item__text">
                <span className="white">{value}</span>
            </p>
        </li>
    )
}

export default ProfileItem