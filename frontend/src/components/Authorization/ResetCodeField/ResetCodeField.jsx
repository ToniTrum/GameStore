import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"

import { API_URL } from "../../../main"

import "../Authorization.css"
import "./ResetCodeField.css"

const ResetCodeField = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const email = location.state
    const [error, setError] = useState('')

    const onClick = () => {
        navigate("/reset-password/email")
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const digit1 = event.target.digit1.value
        const digit2 = event.target.digit2.value
        const digit3 = event.target.digit3.value
        const digit4 = event.target.digit4.value

        if (digit1.length > 0 && digit2.length > 0 && digit3.length > 0 && digit4.length > 0) {
            const code = digit1 + digit2 + digit3 + digit4
            const response = await fetch(`${API_URL}/users/check_reset_code/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    code: code
                })
            })
    
            if (response.ok) navigate('/reset-password', {state: email})
            else if (response.status === 400) setError('Неверный код')
            else console.log(response)
        }
        else setError('Введите код полностью')
    }

    return (
        <main>
            <form className="authorization-form" action='' method="post" onSubmit={handleSubmit}>
                <h1 className="form-title">Код подтверждения</h1>

                <div className="form-item">
                    <label className="form-label" htmlFor="digits">На вашу почту было отправлено письмо с кодом, пожалйста, введите его</label>
                    <div className="form-code">
                        <input className="form-digit" pattern="[0-9]" maxLength={1} id="digit1" name="digit1" />
                        <input className="form-digit" pattern="[0-9]" maxLength={1} id="digit2" name="digit2" />
                        <input className="form-digit" pattern="[0-9]" maxLength={1} id="digit3" name="digit3" />
                        <input className="form-digit" pattern="[0-9]" maxLength={1} id="digit4" name="digit4" />
                    </div>
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

export default ResetCodeField