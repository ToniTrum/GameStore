import {useNavigate} from "react-router-dom"

import registrationData from "./registrationData"

import '../Authorization.css'
import './RegisterPanel.css'


const RegisterPanel = () => {
    const navigate = useNavigate();

    const onClick = (ref) => {
        navigate(ref)
    }

    return (
        <main>
            <form className="authorization-form" action='' method="post">
                <h1 className="form-title">Регистрация</h1>

                {registrationData.map((item) => {
                    return (
                        <div className="form-item" key={item.name}>
                            <label className="form-label" htmlFor={item.name}>{item.label}</label>
                            <input className="form-input" type={item.type} name={item.name} id={item.name} />
                        </div>
                    )
                })}

                <div className="form-buttons">
                    <button 
                        type="button" 
                        className="form-button" 
                        onClick={() => onClick('/login')}>
                            Назад
                    </button>
                    <button className="form-button">Зарегистрироваться</button>
                </div>
            </form>
        </main>
    )
}

export default RegisterPanel