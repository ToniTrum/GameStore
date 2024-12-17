import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import { API_URL } from "../../main"

import ImageCarousel from "../ImageCarousel/ImageCarousel"
import WrapListComponent from "../WrapListComponent/WrapListComponent"

import "./GamePage.css"

const GamePage = () => {
    const { game_id } = useParams()

    const [game, setGame] = useState({})
    const [screenshots, setScreenshots] = useState([])
    const [genres, setGenres] = useState([])
    const [tags, setTags] = useState([])
    const [developers, setDevelopers] = useState([])

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

    useEffect(() => {
        const fetchGenres = async () => {
            try
            {
                if (game?.genres) {
                    const genreList = []
                    for (let i = 0; i < game.genres.length; i++) {
                        const genreID = game.genres[i]
                        const response = await fetch(`${API_URL}/games/genre/get/${genreID}`, {method: 'GET'})
                        const data = await response.json()
                        genreList.push(data.name)
                    }

                    setGenres(genreList)
                }
            }
            catch (error) 
            {
                console.error(error)
            }
        }

        if (game) {
            fetchGenres()
        }
    }, [game])

    useEffect(() => {
        const fetchGenres = async () => {
            try
            {
                if (game?.tags) {
                    const tagList = []
                    for (let i = 0; i < game.tags.length; i++) {
                        const tagID = game.tags[i]
                        const response = await fetch(`${API_URL}/games/tag/get/${tagID}`, {method: 'GET'})
                        const data = await response.json()
                        tagList.push(data.name)
                    }

                    setTags(tagList)
                }
            }
            catch (error) 
            {
                console.error(error)
            }
        }

        if (game) {
            fetchGenres()
        }
    }, [game])

    useEffect(() => {
        const fetchDevelopers = async () => {
            try
            {
                if (game?.developers) {
                    const developerList = []
                    for (let i = 0; i < game.developers.length; i++) {
                        const developerID = game.developers[i]
                        const response = await fetch(`${API_URL}/games/developer/get/${developerID}`, {method: 'GET'})
                        const data = await response.json()
                        developerList.push(data.name)
                    }

                    setDevelopers(developerList)
                }
            }
            catch (error) 
            {
                console.error(error)
            }
        }

        if (game) {
            fetchDevelopers()
        }
    }, [game])

    return (
        <section className="game-section">
            <div className="game-main-info">
                <h1 className="game-title">{game.name}</h1>

                <ImageCarousel images={screenshots} />

                <GenreTagTable genres={genres} tags={tags} />

                <DeveloperList developers={developers} />
            </div>
        </section>
    )
}

export default GamePage

const GenreTagTable = ({genres, tags}) => {
    return (
        <div className="genre-tag-table">
            <WrapListComponent elements={genres} title="Жанры" />
            <tr className="vertical-line"></tr>
            <WrapListComponent elements={tags} title="Тэги" />
        </div>
    )
}

const DeveloperList = ({developers}) => {
    return (
        <div className="developer-list-container">
            <h2>Разработчики:</h2>

            <ul className="developer-list">
                {developers.map((developer, index) => (
                    <li key={index}>{developer}</li>
                ))}
            </ul>
        </div>
    )
}