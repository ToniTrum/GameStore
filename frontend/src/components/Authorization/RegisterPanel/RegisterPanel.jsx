import { useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { validateFields } from "../../../utils/validation";
import sweetAlert from "sweetalert2";

import PrivacyPolicyPanel from "../../PrivacyPolicyPage/PrivacyPolicyPanel";
import { API_URL } from "../../../main";
import AuthContext from "../../../context/AuthContext";

import "../Authorization.css";
import "./RegisterPanel.css";

const RegisterPanel = () => {
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
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchCountry();
  }, []);

  const fetchCountry = async () => {
    try {
      const response = await fetch(`${API_URL}/currency/country/`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const responseData = await response.json();
      responseData.sort((a, b) => (a.name_ru > b.name_ru ? 1 : -1));
      setCountryList(responseData);
      setFilteredCountries(responseData);
    } catch (error) {
      sendErrorMessage("Ошибка загрузки списка стран");
    }
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

  const handleCountryInput = (value) => {
    setCountry(value);

    const isInList = countryList.some(
      (item) => item.name_ru.toLowerCase() === value.toLowerCase()
    );
    setCountryError(isInList ? "" : "Страна не найдена в списке");

    if (isInList) {
      setCountry(value);
    }

    if (!value.trim()) {
      setFilteredCountries(countryList);
      return;
    }

    const filtered = countryList.filter((item) =>
      item.name_ru.toLowerCase().startsWith(value.toLowerCase())
    );
    setFilteredCountries(filtered);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validateFields([{ name, value }], password)[name] || "",
    }));

    const stateFunction = registrationData.find(
      (item) => item.name === name
    )?.stateFunction;
    if (stateFunction) {
      stateFunction(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const fieldsToValidate = [
      { name: "username", value: username },
      { name: "email", value: email },
      { name: "password", value: password },
      { name: "password2", value: password2 },
      { name: "firstName", value: firstName },
      { name: "lastName", value: lastName },
      { name: "birthdate", value: birthdate },
    ];

    const validationErrors = validateFields(fieldsToValidate, password);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0 || countryError) {
      sendErrorMessage("Пожалуйста, исправьте ошибки в форме");
      return;
    }

    const selectedCountry = filteredCountries.find(
      (item) => item.name_ru === country
    );

    if (!selectedCountry) {
      sendErrorMessage("Выберите страну из списка");
      return;
    }

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
      name: "password",
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

  return (
    <main>
      <form className="authorization-form" onSubmit={handleSubmit}>
        <h1 className="form-title">Регистрация</h1>

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
                  : item.name === "password"
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

        <div className="form-agreement">
          <input type="checkbox" name="terms" id="terms" />
          <label className="form-label" htmlFor="terms">
            Я принимаю условия 
            <span
              className="link">
              пользовательского соглашения
            </span>
          </label>
        </div>

        <div className="form-buttons">
          <button type="button" onClick={() => navigate("/login")}>
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
