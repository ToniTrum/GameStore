import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import sweetAlert from "sweetalert2";

import AuthContext from "../../context/AuthContext";
import { useCountryAndCurrency } from "../../context/CountryAndCurrencyContext";
import ProfileItem from "../ProfileItem/ProfileItem";
import ImageWithFallback from "../Common/ImageWithFallback";
import { API_URL } from "../../main";
import useAxios from "../../utils/useAxios";

import "./Profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const api = useAxios();
  const { userCountry, countryCurrency } = useCountryAndCurrency();
  const { user, logoutUser } = useContext(AuthContext);

  const handleChangeEmail = () => {
    navigate(`/user/id/${user.user_id}/confirm-password`, {
      state: {next: `/user/id/${user.user_id}/change-email`}
    })
  }

  const handleChangePassword = async () => {
    const response = await fetch(`${API_URL}/users/create_confirmation_code/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email: user.email})
    })

    if (response.ok) 
      navigate('/reset-password/code', {state: {
        email: user.email, 
        action: 'reset', 
        prev: `/user/id/${user.user_id}/profile`,
        next: `/user/id/${user.user_id}/profile`
      }})
    else console.log(response)
  }

  const deleteUser = async () => {
    const result = confirm("Вы действительно хотите удалить свой аккаунт?")
    if (!result) return

    navigate(`/user/id/${user.user_id}/confirm-password`, {
      state: {next: `/reset-password/code`, action: "code", email: user.email}
    })
  };

  return (
    <section className="profile">
      <div className="profile-container">
        <div className="avatar-container">
          <ImageWithFallback
            src={`${API_URL}/${user.image}`}
            alt="avatar"
            className="avatar-profile"
          />
        </div>

        <div className="profile-info">
          <ul className="profile-list">
            <ProfileItem paragraph="ID" value={user.user_id} />
            <ProfileItem paragraph="Имя пользователя" value={user.username} />
            <ProfileItem paragraph="Электронная почта" value={user.email} />
            <ProfileItem paragraph="Имя" value={user.first_name} />
            <ProfileItem paragraph="Фамилия" value={user.last_name} />
            <ProfileItem paragraph="Дата рождения" value={user.birthdate} />
            <ProfileItem paragraph="Страна" value={userCountry.name_ru} />
          </ul>
        </div>
      </div>

      <div className="change-buttons">
        <Link to={`/user/id/${user.user_id}/change`}>
          <button className="edit-button">Изменить данные профиля</button>
        </Link>
        <button className="edit-button" onClick={handleChangeEmail}>
          Изменить электронную почту
        </button>
        <button className="edit-button" onClick={handleChangePassword}>
          Изменить пароль
        </button>
        <button className="delete-button" onClick={deleteUser}>
          Удалить аккаунт
        </button>
      </div>
    </section>
  );
};

export default Profile;