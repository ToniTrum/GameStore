import {useNavigate} from "react-router-dom"

import '../Authorization.css'

const LoginPanel = () => {
    const navigate = useNavigate();

    const onClick = (ref) => {
        navigate(ref)
    }

    return (
        <main>
            <form className="authorization-form" action='' method="post">
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
                        className="form-button" 
                        onClick={() => onClick('/register')}>
                            Зарегистрироваться
                    </button>
                    <button className="form-button">Войти</button>
                </div>
            </form>
        </main>
    )
}

export default LoginPanel