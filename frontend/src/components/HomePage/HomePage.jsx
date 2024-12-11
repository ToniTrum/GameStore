import { useContext } from "react"
import {Link} from "react-router-dom"

import GameCard from "../GameCard/GameCard"
import AuthContext from "../../context/AuthContext"
import './HomePage.css'
import { useCountryAndCurrency } from "../../context/CountryAndCurrencyContext"


const HomePage = () => {
    const {user} = useContext(AuthContext)
    const {userCountry, countryCurrency} = useCountryAndCurrency()
    const game = {
        "id": 10089,
        "name": "Ball 3D: Soccer Online",
        "background_image": "https://media.rawg.io/media/screenshots/3a5/3a59c74568a14736d44a1df1660c5282.jpg",
        "description": "In Ball 3D you compete online in 7 sports, against up to 30 opponents. We have Racing Soccer, Racing, Soccer, Basketball, Hockey, Handball and Battle Royale. Already played by over 1 000 000 players.<h3>Features:</h3><br/><ul> <li>7 Sports: Racing Soccer, Racing, Soccer, Basketball, Hockey, Handball, Battle Royale<br/></li><li>12 Game Modes<br/></li><li>23 Stadiums<br/></li><li>100% Control<br/></li><li>Multiplayer<br/></li><li>Realistic Physics<br/></li><li>T-Shirts Customization<br/></li><li>Replays<br/></li><li>Statistics<br/></li><li>Training Bots<br/></li><li>Custom Celebrations</li></ul>",
        "esrb_rating": 6,
        "release_date": "2017-03-31",
        "price_in_cents": 0,
        "platforms": [
            4,
            5
        ],
        "genres": [
            15
        ],
        "tags": [
            4,
            7,
            18,
            79,
            190,
            191,
            397,
            411,
            40832,
            40837
        ],
        "screenshots": [
            76717,
            76718,
            76719,
            76720,
            76721
        ],
        "developers": [
            4073
        ]
    }

    return (
        <section className="home-section">
            <h1 className="home-title">
                Добро пожаловать, <span className="white">{user.username}</span>
            </h1>

            <div className="game-cards">
                <GameCard game={game} currency={countryCurrency} symbol={userCountry.currency_symbol} />
                <GameCard game={game} currency={countryCurrency} symbol={userCountry.currency_symbol} />
                <GameCard game={game} currency={countryCurrency} symbol={userCountry.currency_symbol} />
                <GameCard game={game} currency={countryCurrency} symbol={userCountry.currency_symbol} />
            </div>

        </section>
    )
}

export default HomePage