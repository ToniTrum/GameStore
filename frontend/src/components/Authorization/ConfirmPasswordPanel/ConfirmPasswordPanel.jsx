import { useState } from "react"
import { useNavigate, useParams, useLocation } from "react-router-dom"

import { API_URL } from "../../../main"

import "../Authorization.css"

const ConfirmPasswordPanel = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const location = useLocation()
    const [error, setError] = useState('')

    const onClick = () => {
        navigate(`/user/id/${id}/profile`)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const password = event.target.password.value;

        const response = await fetch(`${API_URL}/users/check_password/${id}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ password: password }),
        })

        if (response.ok) 
        {
            if (location.state.action === "code") {
                const response = await fetch(`${API_URL}/users/create_confirmation_code/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email: location.state.email }),
                })

                if (!response.ok) 
                {
                    console.log(response)
                    return
                }
            }
            navigate(location.state.next, {state: {
                password: password, 
                id: id,
                action: "delete",
                email: location.state.email
            }})
        }
        else if (response.status === 400) setError('Неверный пароль')
        else console.log(response)
    }

    return (
        <main>
            <form className="authorization-form" action='' method="post" onSubmit={handleSubmit}>
                <h1 className="form-title">Подтверждение пароля</h1>

                <div className="form-item">
                    <label className="form-label" htmlFor="email">Подтвердите пароль</label>
                    <input className="form-input" type="password" name="password" id="password" />
                    <div className="form-error">{error.length > 0 && <span className="error-message">{error}</span>}</div>
                </div>

                <div className="form-buttons">
                    <button 
                        type="button"
                        onClick={onClick}>
                            Назад
                    </button>
                    <button 
                        type="submit">
                            Далее
                    </button>
                </div>
            </form>
        </main>
    )
}

export default ConfirmPasswordPanel