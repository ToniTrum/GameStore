import {useNavigate} from "react-router-dom"
import { useEffect, useState } from "react"
import { API_URL } from "../../../main"

import registrationData from "./registrationData"

import '../Authorization.css'
import './RegisterPanel.css'


const RegisterPanel = () => {
    const navigate = useNavigate();

    const [countryList, setCountryList] = useState([])

    const fetchCountry = async () => {
        const response = await fetch(`${API_URL}/currency/country/`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        })
        const responseData = await response.json()
        responseData.sort((a, b) => a.name_ru > b.name_ru ? 1 : -1)

        setCountryList(responseData)
    }

    useEffect(() => {
        fetchCountry()
    }, [])

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

                <div className="form-item">
                    <label className="form-label" htmlFor="country">Страна</label>
                    <select className="form-input" name="country" id="country">
                        {countryList.map((item) => {
                            return (
                                <option
                                    key={item.numeric_code} 
                                    value={item.numeric_code}
                                    selected={item.name_ru === "Россия"}>
                                        {item.name_ru}
                                </option>
                            )
                        })}
                    </select>
                </div>

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