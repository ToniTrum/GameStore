import { useState, useEffect } from "react"

import { API_URL } from "../../main"
import useCountryAndCurrency from "../../utils/useFetchCountryAndCurrency"

import "./StorePage.css"

const StorePage = () => {
    const {userCountry, countryCurrency} = useCountryAndCurrency()

    const [games, setGames] = useState([])

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const response = await fetch(`${API_URL}/games/game`, {method: 'GET'})
                const data = await response.json()
                setGames(data)
            } catch (error) {
                console.error(error)
            }
        }

        fetchGames()
    }, [])

    return (
        <section>

        </section>
    )
}