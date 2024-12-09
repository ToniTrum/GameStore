import  {useNavigate } from "react-router-dom"
import { useContext } from "react";
import AuthContext from "../../../context/AuthContext";

import '../Authorization.css'

const LoginPanel = () => {
    const navigate = useNavigate()
    const {loginUser} = useContext(AuthContext)

    const onClick = (ref) => {
        navigate(ref)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const email = event.target.email.value;
        const password = event.target.password.value;

        if (email.length > 0 && loginUser(email, password)) {
            console.log(email)
        }
    }

    return (
        <main>
            <form className="authorization-form" action='' method="post" onSubmit={handleSubmit}>
                <h1 className="form-title">Вход</h1>

                <div className="form-item">
                    <label className="form-label" htmlFor="email">Электронная почта</label>
                    <input className="form-input" type="email" name="email" id="email" />
                </div>

                <div className="form-item">
                    <label className="form-label" htmlFor="password">Пароль</label>
                    <input className="form-input" type="password" name="password" id="password" />
                </div>

                <div className="form-buttons">
                    <button 
                        type="button"
                        onClick={() => onClick('/register')}>
                            Зарегистрироваться
                    </button>
                    <button 
                        type="submit">
                            Войти
                    </button>
                </div>
            </form>
        </main>
    )
}

export default LoginPanel