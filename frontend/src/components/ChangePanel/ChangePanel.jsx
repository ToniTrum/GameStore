import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import sweetAlert from "sweetalert2";

import AuthContext from "../../context/AuthContext";
import { API_URL } from "../../main";
import useAxios from "../../utils/useAxios";
import { validateFields } from "../../utils/validation"; 

import "./ChangePanel.css";

const ChangePanel = () => {
  const api = useAxios();
  const { user, loginUser } = useContext(AuthContext);

  const [countryList, setCountryList] = useState([]);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [firstName, setFirstName] = useState(user.first_name);
  const [lastName, setLastName] = useState(user.last_name);
  const [birthdate, setBirthdate] = useState(user.birthdate);
  const [country, setCountry] = useState(user.country);
  const [image, setImage] = useState(null); 
  const [avatar, setAvatar] = useState(`${API_URL}/${user.image}`);

  const sendErrorMessage = (message) => {
    sweetAlert.fire({
      title: message,
      icon: "error",
      toast: true,
      timer: 6000,
      position: "top-right",
      timerProgressBar: true,
      showConfirmButton: false,
    });
  };

  const validateForm = () => {
    const fieldsToValidate = [
      { name: "username", value: username },
      { name: "country", value: country },
    ];

    const errors = validateFields(fieldsToValidate);

    if (Object.keys(errors).length > 0) {
      const errorMessages = Object.values(errors).join("\n");
      sendErrorMessage(errorMessages);
      return false;
    }

    return true;
  };

  const fetchCountry = async () => {
    const response = await fetch(`${API_URL}/currency/country/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseData = await response.json();
    responseData.sort((a, b) => (a.name_ru > b.name_ru ? 1 : -1));
    setCountryList(responseData);
  };

  // Обновление данных пользователя
  const updateUser = async (formData) => {
    try {
      const response = await api.put(
        `/users/update/${user.user_id}/`,
        formData
      );

      if (response.status === 200) {
        loginUser(email, password || oldPassword);
        sweetAlert.fire({
          title: "Данные успешно обновлены",
          icon: "success",
          toast: true,
          timer: 3000,
          position: "top-right",
          timerProgressBar: true,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      sendErrorMessage("Ошибка обновления данных");
    }
  };

  // Обработчик изменения аватарки
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validImageTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!validImageTypes.includes(file.type)) {
        sendErrorMessage(
          "Можно загружать только изображения форматов JPEG или PNG"
        );
        return;
      }
      const previewUrl = URL.createObjectURL(file);
      setAvatar(previewUrl);
      setImage(file);
    }
  };

  useEffect(() => {
    fetchCountry();
    return () => {
      if (image) {
        URL.revokeObjectURL(image.previewUrl);
      }
    };
  }, [image]);

  // Отправка формы
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      const formData = new FormData();
      if (image) {
        formData.append("image", image);
      }
      formData.append("username", username);
      formData.append("email", email);
      formData.append("old_password", oldPassword);
      formData.append("password", password);
      formData.append("first_name", firstName);
      formData.append("last_name", lastName);
      formData.append("country", country);
      formData.append("birthdate", birthdate);

      updateUser(formData);
    }
  };

  return (
    <section className="change-panel">
      <form
        className="authorization-form"
        action=""
        method="patch"
        onSubmit={handleSubmit}
      >
        <div className="form-item">
          <label className="form-label" htmlFor="image">
            Изображение
          </label>
          <input
            onChange={handleAvatarChange}
            type="file"
            name="image"
            id="image"
            accept="image/jpeg, image/png"
          />
          <img src={avatar} alt="avatar" className="avatar-preview" />
        </div>

        <div className="form-item">
          <label className="form-label" htmlFor="username">
            Имя пользователя
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        {/* Добавляем остальные поля */}
        <div className="form-item">
          <label className="form-label" htmlFor="country">
            Страна
          </label>
          <select
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          >
            {countryList.map((item) => (
              <option key={item.numeric_code} value={item.numeric_code}>
                {item.name_ru}
              </option>
            ))}
          </select>
        </div>

        <div className="form-buttons">
          <Link to={`/user/id/${user.user_id}/profile`}>
            <button type="button">Отмена</button>
          </Link>
          <button type="submit">Сохранить</button>
        </div>
      </form>
    </section>
  );
};

export default ChangePanel;
