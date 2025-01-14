import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { API_URL } from "../../../main"

import "../Authorization.css"

const EmailFieldForResetPassword = () => {
    const navigate = useNavigate()
    const [error, setError] = useState('')

    const onClick = () => {
        navigate("/login")
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const email = event.target.email.value;

        const response = await fetch(`${API_URL}/users/create_reset_code/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: email})
        })

        if (response.ok) navigate('/reset-password/code', {state: email})
        else if (response.status === 404) setError('Пользователь с таким email не найден')
        else console.log(response)
    }

    return (
        <main>
            <form className="authorization-form" action='' method="post" onSubmit={handleSubmit}>
                <h1 className="form-title">Смена пароля</h1>

                <div className="form-item">
                    <label className="form-label" htmlFor="email">Электронная почта</label>
                    <input className="form-input" type="email" name="email" id="email" />
                    {error.length > 0 && <span className="error-message">{error}</span>}
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

export default EmailFieldForResetPassword