import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import {API_URL} from '../../../main'

import '../Authorization.css'

const RecoverPanel = () => {
    const navigate = useNavigate()
    const [error, setError] = useState('')

    const onClick = () => {
        navigate('/login')
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const recover = event.target.recover.value;

        if (recover.length > 0) {
            const response = await fetch(`${API_URL}/users/recover/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ recover: recover })
            })

            if (response.ok) navigate('/login')
            else if (response.status === 404) setError('Пользователь с таким email или именем не найден')
            else console.log(response)
        }
        else setError('Заполните поле')
    }

    return (
        <main>
            <form className="authorization-form" action='' method="put" onSubmit={handleSubmit}>
                <h1 className="form-title">Восстановление аккаунта</h1>

                <div className="form-item">
                    <label className="form-label" htmlFor="email">Введите электронную почту или имя пользователя</label>
                    <input className="form-input" type="text" name="recover" id="recover" />
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

export default RecoverPanel