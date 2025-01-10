import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import XRegExp from "xregexp";

dayjs.extend(isSameOrBefore);

// Функция для валидации одного поля
export const validateField = (name, value, password = "") => {
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

  return error;
};

// Функция для валидации нескольких полей с указанием, что проверять
export const validateFields = (fieldsToValidate, password = "") => {
  const errors = {};

  fieldsToValidate.forEach(({ name, value }) => {
    const error = validateField(name, value, password);
    if (error) {
      errors[name] = error;
    }
  });

  return errors;
};