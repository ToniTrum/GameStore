import registrationData from "./registrationData"

import '../Authorization.css'
import './RegisterPanel.css'


const RegisterPanel = () => {
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
                    <button className="registration-button" type="submit">Назад</button>
                    <button className="registration-button" type="submit">Зарегистрироваться</button>
                </div>
            </form>
        </main>
    )
}

export default RegisterPanel