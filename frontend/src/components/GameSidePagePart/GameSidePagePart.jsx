import { useEffect, useState } from "react"

import {API_URL} from "../../main"

import "./GameSidePagePart.css"

const GameSidePagePart = ({ game }) => {
    const [esrbRating, setESRBRating] = useState({})
    const [platforms, setPlatforms] = useState([])

    useEffect(() => {
        const fetchESRBRating = async () => {
            try {
                if (game?.esrb_rating) {
                    const response = await fetch(`${API_URL}/games/esrb_rating/get/${game.esrb_rating}`, {method: 'GET'})
                    const data = await response.json()
                    setESRBRating(data)
                }
            }
            catch (err) 
            {
                console.log(err)
            }
        }

        if (game)
        {
            fetchESRBRating()
        }
    }, [game])

    useEffect(() => {
        const fetchPlatforms = async () => {
            try {
                if (game?.platforms) {
                    const platformList = []
                    for (let i = 0; i < game.platforms.length; i++) {
                        const platformID = game.platforms[i]
                        const response = await fetch(`${API_URL}/games/platform/get/${platformID}`, {method: 'GET'})
                        const data = await response.json()
                        platformList.push(data)
                    }
                    setPlatforms(platformList)
                }
            }
            catch (err) 
            {
                console.log(err)
            }
        }

        if (game)
        {
            fetchPlatforms()
        }
    }, [game])

    return (
        <div className="game-side-page-part">
            <div className="game-info">
                <img className="esrb-rating-image" src={`${API_URL}/${esrbRating.image}`} alt="Game image" />

                <ul className="info-table">
                    <PlatformsTableItem platforms={platforms} />
                    <TableItem title={"Возрастной рейтинг"} value={esrbRating.name_ru} />
                    <TableItem title={"Название"} value={game.name} />
                </ul>
            </div>
        </div>
    )
}

export default GameSidePagePart

const TableItem = ({ title, value }) => {
    return (
        <li className="table-item">
            <p>{title}:</p>
            <p className="white">{value}</p>
        </li>
    )
}

const PlatformsTableItem = ({ platforms }) => {
    return (
        <li className="table-item">
            <p>Платформы:</p>

            <ul className="platforms-list">
                {platforms.map((platform, index) => (
                    <li className="platform-item" key={index}>
                        <img className="platform-item__image" src={`${API_URL}/${platform.icon}`} alt={platform.name} />
                    </li>
                ))}
            </ul>
        </li>
    )
}