import { useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import sweetAlert from "sweetalert2";
import XRegExp from "xregexp";

import { API_URL } from "../../../main";
import AuthContext from "../../../context/AuthContext";

import "../Authorization.css";

const RegisterPanel = () => {
  dayjs.extend(isSameOrBefore);
  const navigate = useNavigate();
  const { registerUser } = useContext(AuthContext);

  const [countryList, setCountryList] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [country, setCountry] = useState("");
  const [countryError, setCountryError] = useState("");

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
    firstName: "",
    lastName: "",
    birthdate: "",
  });

  useEffect(() => {
    fetchCountry();
  }, []);

  const fetchCountry = async () => {
    const response = await fetch(`${API_URL}/currency/country/`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const responseData = await response.json();
    responseData.sort((a, b) => (a.name_ru > b.name_ru ? 1 : -1));
    setCountryList(responseData);
    setFilteredCountries(responseData); // изначально список тот же
  };

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

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "username":
        const usernameRegExp = /^[a-zA-Z0-9_]{4,64}$/i;
        if (!usernameRegExp.test(value)) {
          error =
            'Имя пользователя должно состоять из букв латинского алфавита, цифр или знака "_", длиной от 4 до 64 символов';
        }
        break;
      case "email":
        const emailRegExp = /^[a-z0-9._%+-]+@[a-z0-9]+\.[a-z]{2,}$/i;
        if (!emailRegExp.test(value)) {
          error = "Некорректная электронная почта";
        }
        break;
      case "password":
        const passwordRegExp = /^(?=.*[A-Za-z])(?=.*[0-9])[A-Za-z0-9_]{8,}$/i;
        if (!passwordRegExp.test(value)) {
          error =
            'Пароль должен состоять из букв латинского алфавита, цифр и знака "_", длиной от 8 символов';
        }
        break;
      case "password2":
        if (value !== password) {
          error = "Пароли не совпадают";
        }
        break;
      case "firstName":
        const firstNameRegExp = XRegExp("^[\\p{L}\\s\\-'’]{2,64}$", "ui");
        if (!firstNameRegExp.test(value)) {
          error =
            'Имя может содержать только буквы, пробел и символы "-" или "\'", длиной от 2 до 64 символов';
        }
        break;
      case "lastName":
        const lastNameRegExp = XRegExp("^[\\p{L}\\s\\-'’]{2,124}$", "ui");
        if (!lastNameRegExp.test(value)) {
          error =
            'Фамилия может содержать только буквы, пробел и символы "-" или "\'", длиной от 2 до 124 символов';
        }
        break;
      case "birthdate":
        if (!value) {
          error = "Дата рождения не указана";
        } else {
          const date = dayjs(value);
          const today = dayjs();
          if (!date.isSameOrBefore(today)) {
            error = "Дата рождения не может быть в будущем";
          } else if (date.isBefore(today.subtract(100, "years"))) {
            error = "Возраст не может превышать 100 лет";
          }
        }
        break;
      default:
        break;
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const validateCountry = (value) => {
    const isInList = countryList.some(
      (item) => item.name_ru.toLowerCase() === value.toLowerCase()
    );
    setCountryError(isInList ? "" : "Страна не найдена в списке");
  };

  const registrationData = [
    {
      name: "username",
      label: "Имя пользователя",
      type: "text",
      stateFunction: setUsername,
      error: errors.username,
    },
    {
      name: "email",
      label: "Электронная почта",
      type: "email",
      stateFunction: setEmail,
      error: errors.email,
    },
    {
      name: "password1",
      label: "Пароль",
      type: "password",
      stateFunction: setPassword,
      error: errors.password,
    },
    {
      name: "password2",
      label: "Подтвердите пароль",
      type: "password",
      stateFunction: setPassword2,
      error: errors.password2,
    },
    {
      name: "firstName",
      label: "Имя",
      type: "text",
      stateFunction: setFirstName,
      error: errors.firstName,
    },
    {
      name: "lastName",
      label: "Фамилия",
      type: "text",
      stateFunction: setLastName,
      error: errors.lastName,
    },
    {
      name: "birthdate",
      label: "Дата рождения",
      type: "date",
      stateFunction: setBirthdate,
      error: errors.birthdate,
    },
  ];

  // При наборе текста в поле "Страна"
  const handleCountryInput = (value) => {
    setCountry(value);
    validateCountry(value);

    // Если поле пустое — показываем весь список
    if (!value.trim()) {
      setFilteredCountries(countryList);
      return;
    }

    // Фильтруем по началу строки
    const filtered = countryList.filter((item) =>
      item.name_ru.toLowerCase().startsWith(value.toLowerCase())
    );
    setFilteredCountries(filtered);
  };

  // При вводе в остальные поля
  const handleChange = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
    const stateFunction = registrationData.find(
      (item) => item.name === name
    )?.stateFunction;
    if (stateFunction) {
      stateFunction(value);
    }
  };

  const onClick = (ref) => {
    navigate(ref);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // проверяем, нет ли ошибок в других полях и по стране
    const hasNoErrors = Object.values(errors).every((err) => err === "");
    if (hasNoErrors && !countryError) {
      const selectedCountry = filteredCountries.find(
        (item) => item.name_ru === country
      );
      registerUser(
        email,
        username,
        password,
        password2,
        firstName,
        lastName,
        selectedCountry.numeric_code,
        birthdate
      );
    } else {
      sendErrorMessage("Пожалуйста, исправьте ошибки в форме");
    }
  };

  return (
    <main>
      <form className="authorization-form" onSubmit={handleSubmit}>
        <h1 className="form-title">Регистрация</h1>

        {/* Поля регистрации */}
        {registrationData.map((item) => (
          <div className="form-item" key={item.name}>
            <label className="form-label" htmlFor={item.name}>
              {item.label}
            </label>
            <input
              onChange={handleChange}
              className="form-input"
              type={item.type}
              name={item.name}
              id={item.name}
              value={
                item.name === "username"
                  ? username
                  : item.name === "email"
                  ? email
                  : item.name === "password1"
                  ? password
                  : item.name === "password2"
                  ? password2
                  : item.name === "firstName"
                  ? firstName
                  : item.name === "lastName"
                  ? lastName
                  : item.name === "birthdate"
                  ? birthdate
                  : ""
              }
            />
            {item.error && <span className="error-message">{item.error}</span>}
          </div>
        ))}

        {/* Страна: через <datalist> */}
        <div className="form-item">
          <label className="form-label" htmlFor="country">
            Страна
          </label>
          <input
            list="countries"
            onChange={(e) => handleCountryInput(e.target.value)}
            className="form-input"
            name="country"
            id="country"
            value={country}
          />
          <datalist id="countries">
            {filteredCountries.map((item) => (
              <option key={item.numeric_code} value={item.name_ru}>
                {item.name_ru}
              </option>
            ))}
          </datalist>
          {countryError && (
            <span className="error-message">{countryError}</span>
          )}
        </div>

        <div className="form-buttons">
          <button type="button" onClick={() => onClick("/login")}>
            Назад
          </button>
          <button type="submit" className="form-button">
            Зарегистрироваться
          </button>
        </div>
      </form>
    </main>
  );
};

export default RegisterPanel;
