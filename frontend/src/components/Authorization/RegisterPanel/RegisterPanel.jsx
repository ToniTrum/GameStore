import {useNavigate} from "react-router-dom"
import { useEffect, useState, useContext } from "react"

import { API_URL } from "../../../main"
import AuthContext from "../../../context/AuthContext"

import '../Authorization.css'
import './RegisterPanel.css'


const RegisterPanel = () => {
    const navigate = useNavigate();
    const {registerUser} = useContext(AuthContext)

    const [countryList, setCountryList] = useState([])
    const [defaultCountry, setDefaultCountry] = useState("")

    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [country, setCountry] = useState("")
    const [birthdate, setBirthdate] = useState(new Date())

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

        const defaultValue = responseData.find((item) => item.name_ru === "Россия")
        setDefaultCountry(defaultValue.numeric_code)
    }

    useEffect(() => {
        fetchCountry()
    }, [])

    const onClick = (ref) => {
        navigate(ref)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        registerUser(email, username, password, password2, firstName, lastName, country, birthdate)
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
                        className="form-button" 
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