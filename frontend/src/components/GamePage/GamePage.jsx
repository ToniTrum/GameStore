import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import { API_URL } from "../../main"

import ImageCarousel from "../ImageCarousel/ImageCarousel"

import "./GamePage.css"

const GamePage = () => {
    const { game_id } = useParams()

    const [game, setGame] = useState({})
    const [screenshots, setScreenshots] = useState([])

    useEffect(() => {
        const fetchGame = async () => {
            try 
            {
                const response = await fetch(`${API_URL}/games/game/get/${game_id}`, {method: 'GET'})
                const data = await response.json()
                setGame(data)
                console.log(data)
            }
            catch (error) 
            {
                console.error(error)
            }
        }

        fetchGame()
    }, [])

    useEffect(() => {
        const fetchScreenshots = async () => {
            try
            {
                if (game?.screenshots) {
                    const screenshotList = []
                    for (let i = 0; i < game.screenshots.length; i++) {
                        const screenshotID = game.screenshots[i]
                        const response = await fetch(`${API_URL}/games/screenshot/get/${screenshotID}`, {method: 'GET'})
                        const data = await response.json()
                        screenshotList.push(data.image)
                    }

                    setScreenshots(screenshotList) 
                }
            }
            catch (error) 
            {
                console.error(error)
            }
        }

        if (game) {
            fetchScreenshots()
        }
    }, [game])

    return (
        <section className="game-section">
            <div className="game-main-info">
                <h1 className="game-title">{game.name}</h1>

                <ImageCarousel images={screenshots} />
            </div>
        </section>
    )
}

export default GamePage