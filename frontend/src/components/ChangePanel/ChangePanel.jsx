import { useContext, useState, useEffect } from "react"
import { Link } from "react-router-dom"
import sweetAlert from 'sweetalert2'

import { validateFields } from "../../utils/validation"
import AuthContext from "../../context/AuthContext"
import { API_URL } from "../../main"
import useAxios from "../../utils/useAxios"

import "./ChangePanel.css"

const ChangePanel = () => {
	const api = useAxios()
    const {user, loginUser} = useContext(AuthContext)

    const [countryList, setCountryList] = useState([])

    const [username, setUsername] = useState(user.username)
    const [email, setEmail] = useState(user.email)
    const [password, setPassword] = useState("")
    const [firstName, setFirstName] = useState(user.first_name)
    const [lastName, setLastName] = useState(user.last_name)
    const [birthdate, setBirthdate] = useState(user.birthdate)
    const [country, setCountry] = useState("")
    const [image, setImage] = useState("")
    const [avatar, setAvatar] = useState(`${API_URL}/${user.image}`)
	const [errors, setErrors] = useState({
		username: "",
		email: "",
		oldPassword: "",
		firstName: "",
		lastName: "",
		birthdate: "",
		country: "",
	})

    const userDataForChanging = [
        {
            "name": "oldPassword",
            "label": "Введите пароль для подтверждения",
            "type": "password",
            "stateFunction": setPassword
        },
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

    const updateUser = async (formData) => {
        const response = await api.put(`/users/update/${user.user_id}/`, formData)

        if(response.status === 200)
        {
            loginUser(formData.get("email"), formData.get("password"), '/profile')
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
		else if (response.status === 400) setErrors((prevErrors) => ({
			...prevErrors,
			"oldPassword": "Неверный пароль",
		}))
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

    useEffect(() => {
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

        fetchCountry()
    }, [])

	useEffect(() => {
		if (countryList.length > 0) {
			const selectedCountry = countryList.find(
				(item) => item.numeric_code === user.country
			)
			setCountry(selectedCountry ? selectedCountry.name_ru : "")
		}
	}, [countryList])

	const handleCountryInput = (value) => {
		setCountry(value)
	
		const isInList = countryList.some(
			(item) => item.name_ru.toLowerCase() === value.toLowerCase()
		)
		errors.country = isInList ? "" : "Страна не найдена в списке"

		if (isInList) {
			setCountry(value);
		}
	
		if (!value.trim()) {
			setCountryList(countryList)
			return
		}
	
		const filtered = countryList.filter((item) =>
			item.name_ru.toLowerCase().startsWith(value.toLowerCase())
		)
		setCountryList(countryList)
	}

	const handleChange = (e) => {
		const { name, value } = e.target
		
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: validateFields([{ name, value }], password)[name] || "",
        }))

		const stateFunction = userDataForChanging.find(
			(item) => item.name === name
		)?.stateFunction
		if (stateFunction) {
			stateFunction(value)
		}
	}

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
        if (errors.username.length === 0 &&
			errors.email.length === 0 &&
			errors.oldPassword.length === 0 &&
			errors.firstName.length === 0 &&
			errors.lastName.length === 0 &&
			errors.birthdate.length === 0
		) {
            const formData = new FormData()
            if (image) formData.append("image", image)
            formData.append("username", username)
            formData.append("email", email)
            formData.append("password", password)
            formData.append("first_name", firstName)
            formData.append("last_name", lastName)
            formData.append("birthdate", birthdate)
			formData.append("country", country)

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
                        id="image"
                        accept=".png, .jpg, .jpeg" />
                </div>

                {userDataForChanging.map((item) => {
                    return (
                        <div className="form-item" key={item.name}>
                            <label className="form-label" htmlFor={item.name}>{item.label}</label>
                            <input 
                                onChange={handleChange}
                                type={item.type}
                                name={item.name} 
                                id={item.name}
                                value={
									item.name === "username"
									? username
									: item.name === "email"
									? email
									: item.name === "oldPassword"
									? password
									: item.name === "firstName"
									? firstName
									: item.name === "lastName"
									? lastName
									: item.name === "birthdate"
									? birthdate
									: ""
								} />
							<div className="form-error">{errors[item.name] !== "" && <span className="error">{errors[item.name]}</span>}</div>
                        </div>
                    )
                })}

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
						{countryList.map((item) => (
						<option key={item.numeric_code} value={item.name_ru}>
							{item.name_ru}
						</option>
						))}
					</datalist>
					<div className="form-error">{errors.country.length > 0 && (
						<span className="error-message">{errors.country}</span>
					)}</div>
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