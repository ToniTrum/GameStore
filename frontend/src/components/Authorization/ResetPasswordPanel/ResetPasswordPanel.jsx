import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"

import { API_URL } from "../../../main"

import "../Authorization.css"

const ResetPasswordPanel = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const email = location.state.email
    const next = location.state.next

    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [errors, setErrors] = useState({
        password: '',
        password2: '',
    })

    const onClick = () => {
        navigate("/login")
    }

    const validate = (name, value) => {
        switch (name) {
            case 'password':
                const passwordRegExp = /^(?=.*[A-Za-z])(?=.*[0-9])[A-Za-z0-9_]{8,}$/i
                if (!passwordRegExp.test(value)) {
                    errors.password =
                    'Пароль должен состоять из букв латинского алфавита, цифр и знака "_", длиной от 8 символов'
                }
                else errors.password = ''
                break
            case 'password2':
                if (password !== value) {
                    errors.password2 = 'Пароли не совпадают'
                }
                else errors.password2 = ''
                break
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        validate(name, value)

        if (name == "password") setPassword(value)
        else if (name == "password2") setPassword2(value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()        
        
        if (errors.password.length === 0 && errors.password2.length === 0) {
            const response = await fetch(`${API_URL}/users/reset_password/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email, 
                    password: password
                })
            })

            if (response.ok) navigate(next)
            else console.log(response)
        }
    }

    return (
        <main>
            <form className="authorization-form" action='' method="put" onSubmit={handleSubmit}>
                <h1 className="form-title">Новый пароль</h1>

                <div className="form-item">
                    <label className="form-label" htmlFor="password">Новый пароль</label>
                    <input className="form-input" onChange={handleChange} type="password" name="password" id="password" />
                    <div className="form-error">{errors.password.length > 0 && <span className="error-message">{errors.password}</span>}</div>
                </div>

                <div className="form-item">
                    <label className="form-label" htmlFor="password2">Подтвердите пароль</label>
                    <input className="form-input" onChange={handleChange} type="password" name="password2" id="password2" />
                    <div className="form-error">{errors.password2.length > 0 && <span className="error-message">{errors.password2}</span>}</div>
                </div>

                <div className="form-buttons">
                    <button 
                        type="button"
                        onClick={onClick}>
                            Отмена
                    </button>
                    <button
                        type="submit">
                            Изменить пароль
                    </button>
                </div>
            </form>
        </main>
    )
}

export default ResetPasswordPanel