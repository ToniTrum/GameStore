import {useNavigate} from "react-router-dom"
import { useEffect, useState, useContext } from "react"
import dayjs from "dayjs"
import isSameOrBefore  from "dayjs/plugin/isSameOrBefore"
import sweetAlert from "sweetalert2"
import XRegExp from "xregexp"

import { API_URL } from "../../../main"
import AuthContext from "../../../context/AuthContext"

import '../Authorization.css'
import './RegisterPanel.css'


const RegisterPanel = () => {
    dayjs.extend(isSameOrBefore)
    const navigate = useNavigate();
    const {registerUser} = useContext(AuthContext)

    const [countryList, setCountryList] = useState([])

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [birthdate, setBirthdate] = useState("")
    const [country, setCountry] = useState("36")

    const registrationData = [
        {
            "name": "username",
            "label": "Имя пользователя",
            "type": "text",
            "stateFunction": setUsername
        },
        {
            "name": "email",
            "label": "Электронная почта",
            "type": "email",
            "stateFunction": setEmail
        },
        {
            "name": "password1",
            "label": "Пароль",
            "type": "password",
            "stateFunction": setPassword
        },
        {
            "name": "password2",
            "label": "Подтвердите пароль",
            "type": "password",
            "stateFunction": setPassword2
        },
        {
            "name": "firstName",
            "label": "Имя",
            "type": "text",
            "stateFunction": setFirstName
        },
        {
            "name": "lastName",
            "label": "Фамилия",
            "type": "text",
            "stateFunction": setLastName
        },
        {
            "name": "birthdate",
            "label": "Дата рождения",
            "type": "date",
            "stateFunction": setBirthdate
        },
    ]

    const fetchCountry = async () => {
        const response = await fetch(`${API_URL}/currency/country/`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        })
        const responseData = await response.json()
        responseData.sort((a, b) => a.name_ru > b.name_ru ? 1 : -1)

        setCountryList(responseData)
    }

    const sendErrorMessage = (message) => {
        sweetAlert.fire({
            title: message,
            icon: "error",
            toast: true,
            timer: 6000,
            position: 'top-right',
            timerProgressBar: true,
            showConfirmButton: false,
        })
    }

    const validateForm = () => {
        const usernameRegExp = /^[a-zA-Z0-9_]{4,}$/i
        if (!usernameRegExp.test(username)) {
            sendErrorMessage("Имя пользователя должно состоять из букв латинского алфавита, цифр или знака \"_\", а также иметь длину от 4 символов")
            return false
        }

        const emailRegExp = /^[a-z0-9._%+-]+@[a-z0-9]+\.[a-z]{2,3}$/i
        if (!emailRegExp.test(email)) {
            sendErrorMessage("Некорректная электронная почта")
            return false
        }

        const passwordRegExp = /^(?=.*[A-Za-z])(?=.*[0-9])[A-Za-z0-9_]{8,}$/i
        if (!passwordRegExp.test(password)) {
            sendErrorMessage("Пароль должен состоять из букв латинского алфавита, цифр и знака \"_\", а также иметь длину от 8 символов")
            return false
        }
        
        if (password !== password2) {
            sendErrorMessage("Пароли не совпадают")
            return false
        }

        const nameRegExp = XRegExp("^[\\p{L}\\s\\-'’]{2,}$", "ui")
        if (!nameRegExp.test(firstName)) {
            sendErrorMessage("Имя может состоять только из букв, пробела или символов \"-\" и \"\'\"")
            return false
        }
        if (!nameRegExp.test(lastName)) {
            sendErrorMessage("Фамилия должна состоять только из букв, пробела и символов \"-\" и \"\'\"")
            return false
        }

        if (!birthdate) {
            sendErrorMessage("Дата рождения не указана")
            return false
        }
        const date = dayjs(birthdate)
        if (!date.isSameOrBefore(dayjs())) {
            sendErrorMessage("Дата рождения не может быть в будущем")
            return false
        }

        return true
    }

    useEffect(() => {
        fetchCountry()
    }, [])

    const onClick = (ref) => {
        navigate(ref)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (validateForm()) {
            registerUser(email, username, password, password2, firstName, lastName, country, birthdate)
        }
    }

    return (
        <main>
            <form className="authorization-form" action='' method="post" onSubmit={handleSubmit}>
                <h1 className="form-title">Регистрация</h1>

                {registrationData.map((item) => {
                    return (
                        <div className="form-item" key={item.name}>
                            <label className="form-label" htmlFor={item.name}>{item.label}</label>
                            <input 
                                onChange={(e) => item.stateFunction(e.target.value)} 
                                className="form-input" 
                                type={item.type} 
                                name={item.name} 
                                id={item.name} />
                        </div>
                    )
                })}

                <div className="form-item">
                    <label className="form-label" htmlFor="country">Страна</label>
                    <select 
                        onChange={(e) => setCountry(e.target.value)} 
                        className="form-input" 
                        name="country" 
                        id="country">
                        {countryList.map((item) => {
                            return (
                                <option
                                    key={item.numeric_code} 
                                    value={item.numeric_code}>
                                        {item.name_ru}
                                </option>
                            )
                        })}
                    </select>
                </div>

                <div className="form-buttons">
                    <button 
                        type="button" 
                        onClick={() => onClick('/login')}>
                            Назад
                    </button>
                    <button type="submit" className="form-button">Зарегистрироваться</button>
                </div>
            </form>
        </main>
    )
}

export default RegisterPanel