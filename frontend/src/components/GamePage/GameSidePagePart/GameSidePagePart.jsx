import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import {API_URL} from "../../../main"

import "./GameSidePagePart.css"

const GameSidePagePart = ({ game, platforms }) => {
    const { id } = useParams()
    const navigate = useNavigate()

    const [esrbRating, setESRBRating] = useState({})

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

    const onClickBuy = () => {
        const data = { game: game }
        navigate(`/user/id/${id}/payment`, { state: data })
    }

    return (
        <div className="game-side-page-part">
            <div className="game-info">
                <img className="esrb-rating-image" src={`${API_URL}/${esrbRating.image}`} alt="Game image" />

                <ul className="info-table">
                    <PlatformsTableItem platforms={platforms} />
                    <TableItem title={"Возрастной рейтинг"} value={esrbRating.name_ru} />
                    <TableItem title={"Название"} value={game.name} />
                </ul>

                <div className="game-side-page-part__buttons">
                    <button>Добавить в желаемое</button>
                    <button onClick={onClickBuy}>Купить</button>
                </div>
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