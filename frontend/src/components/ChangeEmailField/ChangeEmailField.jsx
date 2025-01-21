import { useState } from "react"
import { useNavigate, useParams, useLocation } from "react-router-dom"

import { API_URL } from "../../main"

const ChangeEmailField = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { id } = useParams()

    const [email, setEmail] = useState('')
    const [error, setError] = useState("")

    const onClick = () => {
        navigate(`/user/id/${id}/profile`)
    }

    const validate = (name, value) => {
        const emailRegExp = /^[a-z0-9._%+-]+@[a-z0-9]+\.[a-z]{2,}$/i
        if (!emailRegExp.test(value)) {
            setError("Некорректная электронная почта")
        }
        else setError("")
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        validate(name, value)

        setEmail(value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()        
        
        if (error.length === 0) {
            const response = await fetch(`${API_URL}/users/check_email/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                })
            })

            if (response.ok) 
            {
                const response = await fetch(`${API_URL}/users/create_confirmation_code/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: email,
                    })
                })

                if (response.ok) navigate('/reset-password/code', {state: {
                    email: email, action: 'change_email', id: id, password: location.state.password
                }})
                else console.log(response)
            }
            else 
            {
                console.log(response)
                setError('Пользователь с таким email уже зарегистрирован')
            }
        }
    }

    return (
        <main>
            <form className="authorization-form" action='' method="put" onSubmit={handleSubmit}>
                <h1 className="form-title">Новая электронная почта</h1>

                <div className="form-item">
                    <label className="form-label" htmlFor="email">Электронная почта</label>
                    <input className="form-input" onChange={handleChange} type="email" name="email" id="email" />
                    <div className="form-error">{error.length > 0 && <span className="error-message">{error}</span>}</div>
                </div>

                <div className="form-buttons">
                    <button 
                        type="button"
                        onClick={onClick}>
                            Отмена
                    </button>
                    <button
                        type="submit">
                            Изменить почту
                    </button>
                </div>
            </form>
        </main>
    )
}

export default ChangeEmailField