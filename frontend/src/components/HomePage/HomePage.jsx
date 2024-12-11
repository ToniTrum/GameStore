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
        "id": 21666,
        "name": "Ironclads: Schleswig War 1864",
        "background_image": "https://media.rawg.io/media/screenshots/009/00958f83615d4d874a68173cd46442da.jpg",
        "description": "<p>The Danish government wanted to annex the duchy of Schleswig to the Danish kingdom while the Prussian government, for internal political and strategic reasons, wanted Schleswig to finally became a part of Germany.</p>\n<p>A key element of Denmark's war strategy was the blockade of Germany's Baltic sea ports, thereby disrupting German overseas trade and hindering Prussian naval operations in support the Prussian army. The supreme commander of the Prussian army insisted that the navy attempt to breach the blockade.</p>",
        "esrb_rating": 6,
        "release_date": "2011-06-21",
        "price_in_cents": 899,
        "platforms": [
            4
        ],
        "genres": [
            10
        ],
        "tags": [
            31
        ],
        "screenshots": [
            206695,
            206696,
            206697,
            206698,
            206699,
            206700
        ],
        "developers": [
            6560
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