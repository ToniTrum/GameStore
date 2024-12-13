import { useContext } from "react"

import RandomGamesList from "../RandomGamesList/RandomGamesList"
import AuthContext from "../../context/AuthContext"
import './HomePage.css'
import { useCountryAndCurrency } from "../../context/CountryAndCurrencyContext"


const HomePage = () => {
    const {user} = useContext(AuthContext)
    const {userCountry, countryCurrency} = useCountryAndCurrency()
    

    return (
        <section className="home-section">
            <h1 className="home-title">
                Добро пожаловать, <span className="white">{user.username}</span>
            </h1>

            <RandomGamesList currency={countryCurrency} symbol={userCountry.currency_symbol} />

        </section>
    )
}

export default HomePage