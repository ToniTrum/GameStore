import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

import { API_URL } from "../../main"
import GameCard from "../GameCard/GameCard"

import "./RandomGamesList.css"

const RandomGamesList = ({ currency, symbol }) => {
    const { id } = useParams()

    const [games, setGames] = useState([])

    useEffect(() => {
        const fetchGames = async () => {
            try 
            {
                const response = await fetch(`${API_URL}/games/random_games/${id}`, {method: 'GET'})
                const data = await response.json()
                setGames(data)
            } 
            catch (error) 
            {
                console.error(error)
            }
        }

        fetchGames()
    }, [])

    return (
        <div className="random-games">
            <h1 className="random-games__title">Откройте для себя новые границы</h1>

            <div className="game-cards">
                {games.map((game) => (
                    <GameCard 
                        key={game.id} 
                        game={game} 
                        currency={currency} 
                        symbol={symbol} />
                ))}
            </div>
        </div>
    )
}

export default RandomGamesList