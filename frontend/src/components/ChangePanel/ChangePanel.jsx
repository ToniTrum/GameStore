import { useContext, useState, useEffect } from "react"
import { Link } from "react-router-dom"
import dayjs from "dayjs"

import AuthContext from "../../context/AuthContext"
import { API_URL } from "../../main"

import "./ChangePanel.css"

const ChangePanel = () => {
    const {user, changeUser} = useContext(AuthContext)

    const [countryList, setCountryList] = useState([])

    const [username, setUsername] = useState(user.username)
    const [email, setEmail] = useState(user.email)
    const [oldPassword, setOldPassword] = useState("")
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")
    const [firstName, setFirstName] = useState(user.first_name)
    const [lastName, setLastName] = useState(user.last_name)
    const [birthdate, setBirthdate] = useState(user.birthdate)
    const [country, setCountry] = useState(user.country)
    const [image, setImage] = useState("")
    const [avatar, setAvatar] = useState(`${API_URL}/${user.image}`)

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
            "name": "olpPassword",
            "label": "Старый пароль",
            "type": "password",
            "stateFunction": setOldPassword
        },
        {
            "name": "password1",
            "label": "Новый пароль",
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
        const usernameRegExp = /^[a-zA-Z0-9_]{4,64}$/i
        if (!usernameRegExp.test(username)) {
            sendErrorMessage("Имя пользователя должно состоять из букв латинского алфавита, цифр или знака \"_\", а также иметь длину от 4 до 64 символов")
            return false
        }

        const emailRegExp = /^[a-z0-9._%+-]+@[a-z0-9]+\.[a-z]{2,}$/i
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

        const firstNameRegExp = XRegExp("^[\\p{L}\\s\\-'’]{2,64}$", "ui")
        if (!firstNameRegExp.test(firstName)) {
            sendErrorMessage("Имя может состоять только из букв, пробела или символов \"-\" и \"\'\", а также иметь длину от 2 до 64 символов")
            return false
        }

        const lastNameRegExp = XRegExp("^[\\p{L}\\s\\-'’]{2,124}$", "ui")
        if (!lastNameRegExp.test(lastName)) {
            sendErrorMessage("Фамилия должна состоять только из букв, пробела и символов \"-\" и \"\'\", а также иметь длину от 2 до 124 символов")
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

    const handleAvatarChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            const objectUrl = URL.createObjectURL(file)
            setAvatar(objectUrl)
            setImage(file)
        }
    }

    useEffect(() => {
        return () => {
            URL.revokeObjectURL(image)
        }
    }, [avatar])

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (validateForm()) {
            changeUser(email, username, password, password2, firstName, lastName, country, birthdate)
        }
    }

    return (
        <section className="change-panel">
            <form className="authorization-form" action='' method="patch">
                <div className="form-image">
                    <img 
                        className="avatar"
                        src={avatar}
                        alt="avatar" />
                </div>
                    
                <div className="form-item">
                    <label className="form-label" htmlFor="image">
                        Изображение
                    </label>
                    <input 
                        onChange={handleAvatarChange} 
                        type="file"
                        name="image" 
                        id="image"/>
                </div>

                {userDataForChanging.map((item) => {
                    return (
                        <div className="form-item" key={item.name}>
                            <label className="form-label" htmlFor={item.name}>{item.label}</label>
                            <input 
                                onChange={(e) => item.stateFunction(e.target.value)} 
                                type={item.type} 
                                name={item.name} 
                                id={item.name}
                                value={item.text}/>
                        </div>
                    )
                })}

                <div className="form-item">
                    <label className="form-label" htmlFor="country">Страна</label>
                    <select 
                        onChange={(e) => setCountry(e.target.value)} 
                        name="country" 
                        id="country"
                        defaultValue={country}>
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
                    <Link to={`/user/id/${user.user_id}/profile`}>
                        <button>Отмена</button>
                    </Link>
                    <button type="submit">Сохранить</button>
                </div>
            </form>
        </section>
    )
}

export default ChangePanel