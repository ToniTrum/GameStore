import { useState, useContext, act } from "react"
import { useNavigate, useLocation } from "react-router-dom"

import { API_URL } from "../../../main"
import useAxios from "../../../utils/useAxios"
import AuthContext from "../../../context/AuthContext"

import "../Authorization.css"
import "./ResetCodeField.css"

const ResetCodeField = () => {
    const {loginUser, registerUser} = useContext(AuthContext)
    const navigate = useNavigate()
    const api = useAxios()
    const location = useLocation()

    const prev = location.state.prev
    const email = location.state.email
    const action = location.state.action
    const [error, setError] = useState('')
    console.log(location.state)

    const onClick = () => {
        navigate(prev)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const digit1 = event.target.digit1.value
        const digit2 = event.target.digit2.value
        const digit3 = event.target.digit3.value
        const digit4 = event.target.digit4.value

        if (digit1.length > 0 && digit2.length > 0 && digit3.length > 0 && digit4.length > 0) {
            const code = digit1 + digit2 + digit3 + digit4
            const response = await fetch(`${API_URL}/users/check_confirmation_code/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    code: code
                })
            })
            console.log(email)
    
            if (response.ok) 
            {
                if (action === 'reset') navigate('/reset-password', {state: {
                    email: email,
                    next: location.state.next
                }})
                else if (action === 'change_email')
                {
                    const id = location.state.id
                    const response = await api.put(`/users/change_email/${id}/`, {email: email})

                    if (response.status === 200) loginUser(email, location.state.password, `/profile`)
                    else console.log(response)
                }
                else if (action == "delete")
                {
                    const id = location.state.id
                    navigate(`/user/id/${id}/delete/`, {state: "ok"})
                }
                else if (action == "register")
                {
                    const registerResponse = await registerUser(
                        location.state.email,
                        location.state.username,
                        location.state.password,
                        location.state.password2,
                        location.state.firstName,
                        location.state.lastName,
                        location.state.country,
                        location.state.birthdate
                    )

                    if (registerResponse === 201) loginUser(email, location.state.password)
                    else console.log(registerResponse)
                }
            }
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

export default ResetCodeField