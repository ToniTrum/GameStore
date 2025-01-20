import { useContext } from "react";
import { Link } from "react-router-dom";
import sweetAlert from "sweetalert2";

import AuthContext from "../../context/AuthContext";
import { useCountryAndCurrency } from "../../context/CountryAndCurrencyContext";
import ProfileItem from "../ProfileItem/ProfileItem";
import ImageWithFallback from "../Common/ImageWithFallback";
import { API_URL } from "../../main";
import useAxios from "../../utils/useAxios";

import "./Profile.css";

const Profile = () => {
  const api = useAxios();
  const { userCountry, countryCurrency } = useCountryAndCurrency();
  const { user, logoutUser } = useContext(AuthContext);

  const deleteUser = async () => {
    const response = await api.delete(`/users/delete/${user.user_id}/`);

    if (response.status === 204) {
      logoutUser();
      sweetAlert.fire({
        title: "Вы удалили свой аккаунт",
        icon: "success",
        toast: true,
        timer: 3000,
        position: "top-right",
        timerProgressBar: true,
        showConfirmButton: false,
      });
    } else {
      const errorData = await response.json();
      logoutUser();
      sweetAlert.fire({
        title: "Ошибка",
        text: errorData.detail,
        icon: "success",
        toast: true,
        timer: 6000,
        position: "top-right",
        timerProgressBar: true,
        showConfirmButton: false,
      });
    }
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
        <Link to={`/user/id/${user.user_id}/confirm-password`}>
          <button className="edit-button">Изменить электронную почту</button>
        </Link>
        <button className="delete-button" onClick={deleteUser}>
          Удалить аккаунт
        </button>
      </div>
    </section>
  );
};

export default Profile;