import { useContext, useState } from "react"
import { useParams } from "react-router-dom"

import RandomGamesList from "./RandomGamesList/RandomGamesList"
import AuthContext from "../../context/AuthContext"
import './HomePage.css'
import { useCountryAndCurrency } from "../../context/CountryAndCurrencyContext"
import useAxios from "../../utils/useAxios"

const HomePage = () => {
    const api = useAxios()
    const {id} = useParams()

    const {user} = useContext(AuthContext)
    const {userCountry, countryCurrency} = useCountryAndCurrency()
    const [isSubscribed, setIsSubscribed] = useState(user.subscribed)

    const onClickSubscribe = async () => {
        await api.put(`/users/subscribe/${id}/`)
        setIsSubscribed((prev) => !prev)
    }

    return (
        <section className="home-section">
            <h1 className="home-title">
                Добро пожаловать, <span className="white">{user.username}</span>
            </h1>

            <div className="home-subscribe">
                {!isSubscribed
                ? (
                    <>
                    <h2>Подпишитесь на рассылку, чтобы каждый день получать информацию о новых играх!</h2>
                    <button onClick={onClickSubscribe}>Подписаться</button>
                    </>
                ) : (
                    <>
                    <h2>Вы подписаны на рассылку!</h2>
                    <button onClick={onClickSubscribe}>Отписаться</button>
                    </>
                )}
            </div>

            <RandomGamesList currency={countryCurrency} symbol={userCountry.currency_symbol} />

        </section>
    )
}

export default HomePage