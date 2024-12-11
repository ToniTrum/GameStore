import { useContext, useState, useEffect } from "react"
import { Link } from "react-router-dom"
import dayjs from "dayjs"
import isSameOrBefore  from "dayjs/plugin/isSameOrBefore"
import sweetAlert from 'sweetalert2';
import XRegExp from "xregexp";

import AuthContext from "../../context/AuthContext"
import { API_URL } from "../../main"
import useAxios from "../../utils/useAxios";

import "./ChangePanel.css"

const ChangePanel = () => {
    const api = useAxios()
    dayjs.extend(isSameOrBefore)
    const {user, loginUser} = useContext(AuthContext)

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

    const updateUser = async (formData) => {
        const response = await api.put(`/users/update/${user.user_id}/`, formData)

        if(response.status === 200)
        {
            if (formData.get("password"))
                loginUser(formData.get("email"), formData.get("password"))
            else
                loginUser(formData.get("email"), formData.get("old_password"))
            sweetAlert.fire({
                title: "Данные успешно обновлены",
                icon: "success",
                toast: true,
                timer: 3000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
            })
        }
        else 
        {
            const errorData = await response.data
            console.log(errorData)

            const errorMessage = Object.entries(errorData)
                .map(([field, messages]) => `${field}: ${messages}`)
                .join("\n")

            console.log(response)
            console.log(response.status)
            sweetAlert.fire({
                title: "Ошибка обновления данных",
                text: errorMessage,
                icon: "error",
                toast: true,
                timer: 6000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
            })
        }
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

        if (!oldPassword) {
            sendErrorMessage("Заполните поле старого пароля")
            return false
        }

        const passwordRegExp = /^(?=.*[A-Za-z])(?=.*[0-9])[A-Za-z0-9_]{8,}$/i
        if (password && !passwordRegExp.test(password)) {
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
            const formData = new FormData()
            if (image) {
                formData.append("image", image)
            }
            formData.append("username", username)
            formData.append("email", email)
            formData.append("old_password", oldPassword)
            formData.append("password", password)
            formData.append("first_name", firstName)
            formData.append("last_name", lastName)
            formData.append("country", country)
            formData.append("birthdate", birthdate)

            updateUser(formData)
        }
    }

    return (
        <section className="change-panel">
            <form className="authorization-form" action='' method="patch" onSubmit={handleSubmit}>
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