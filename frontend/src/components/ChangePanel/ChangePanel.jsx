import { useContext, useState } from "react"

import AuthContext from "../../context/AuthContext"
import { use } from "react"

const ChangePanel = () => {
    const {user} = useContext(AuthContext)

    const [countryList, setCountryList] = useState([])

    const [username, setUsername] = useState(user.username)
    const [email, setEmail] = useState(user.email)
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")
    const [firstName, setFirstName] = useState(user.first_name)
    const [lastName, setLastName] = useState(user.last_name)
    const [birthdate, setBirthdate] = useState(user.birthdate)
    const [country, setCountry] = useState(user.country)

    const userDataForChanging = [
        {
            "name": "username",
            "label": "Имя пользователя",
            "type": "text",
            "stateFunction": setUsername,
            "text": username
        },
        {
            "name": "email",
            "label": "Электронная почта",
            "type": "email",
            "stateFunction": setEmail,
            "text": email
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
            "stateFunction": setFirstName,
            "text": firstName
        },
        {
            "name": "lastName",
            "label": "Фамилия",
            "type": "text",
            "stateFunction": setLastName,
            "text": lastName
        },
        {
            "name": "birthdate",
            "label": "Дата рождения",
            "type": "date",
            "stateFunction": setBirthdate,
            "text": birthdate
        },
    ]

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

    return (
        <section>
            <form className="authorization-form" action='' method="post" onSubmit={handleSubmit}>
                {userDataForChanging.map((item) => {
                    return (
                        <div className="form-item" key={item.name}>
                            <label className="form-label" htmlFor={item.name}>{item.label}</label>
                            <input 
                                onChange={(e) => item.stateFunction(e.target.value)} 
                                className="form-input" 
                                type={item.type} 
                                name={item.name} 
                                id={item.name}>
                                    {item.text}
                            </input>
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
                                    value={item.numeric_code}
                                    selected={country == item.numeric_code}>
                                        {item.name_ru}
                                </option>
                            )
                        })}
                    </select>
                </div>

                <div className="form-buttons">
                    <button 
                        type="button" 
                        onClick={() => onClick('/profile')}>
                            Отмена
                    </button>
                    <button type="submit" className="form-button">Сохранить</button>
                </div>
            </form>
        </section>
    )
}

export default ChangePanel