import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

import arrowDown from "../../assets/img/down-arrow.svg"
import yesIcon from "../../assets/img/yes.svg"

import './FiltrationPanel.css'

import { API_URL } from "../../main";

const FiltrationPanel = ({games, setGames}) => {
    const { id, pageNumber } = useParams()

    const [platforms, setPlatforms] = useState([])
    const [genres, setGenres] = useState([])
    const [tags, setTags] = useState([])
    const [developers, setDevelopers] = useState([])

    const [name, setName] = useState("")
    const [selectedPlatforms, setSelectedPlatforms] = useState([])
    const [selectedGenres, setSelectedGenres] = useState([])
    const [selectedTags, setSelectedTags] = useState([])
    const [selectedDevelopers, setSelectedDevelopers] = useState([])

    useEffect(() => {
        const fetchPlatforms = async () => {
            try {
                const response = await fetch(`${API_URL}/games/platform/`, {
                    method: "GET",
                })
                const data = await response.json()
                setPlatforms(data)
            } catch (error) {
                console.error(error)
            }
        }

        fetchPlatforms()
    }, [])

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await fetch(`${API_URL}/games/genre/`, {
                    method: "GET",
                })
                const data = await response.json()
                setGenres(data)
            } catch (error) {
                console.error(error)
            }
        }

        fetchGenres()
    }, [])

    const fetchTags = async () => {
        try {
            const response = await fetch(`${API_URL}/games/tag/`, {
                method: "GET",
            })
            const data = await response.json()
            setTags(data)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchTags()
    }, [])

    useEffect(() => {
        const fetchDevelopers = async () => {
            try {
                const response = await fetch(`${API_URL}/games/developer/`, {
                    method: "GET",
                })
                const data = await response.json()
                setDevelopers(data)
            } catch (error) {
                console.error(error)
            }
        }

        fetchDevelopers()
    }, [])

    const onClick = async () => {
        const platformsQuery = selectedPlatforms.map((platform) => `&platforms=${platform}`).join("")
        const genresQuery = selectedGenres.map((genre) => `&genres=${genre}`).join("")
        const tagsQuery = selectedTags.map((tag) => `&tags=${tag}`).join("")
        const developersQuery = selectedDevelopers.map((developer) => `&developers=${developer}`).join("")
        const nameQuery = name ? `&name=${name}` : ""

        const response = await fetch(`${API_URL}/games/games/get/${id}/?page=${pageNumber}${platformsQuery}${genresQuery}${tagsQuery}${developersQuery}${nameQuery}`, {
            method: "GET",
            credentials: "include",
        })
        const data = await response.json()
        setGames(data.results)
    }

    return (
        <div className="filtration-panel">
            <div className="filtration-panel__part">
                <input
                    type="text"
                    placeholder="Название..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <button onClick={onClick}>Применить изменения</button>
            </div>
            
            <div className="filtration-panel__part">
                <div className="filtration-panel__elements">
                    <SelectPanel elements={platforms} selectedElements={selectedPlatforms} setSelectedElements={setSelectedPlatforms} title="Платформы" />
                    <SelectPanel elements={genres} selectedElements={selectedGenres} setSelectedElements={setSelectedGenres} title="Жанры" />
                </div>
                <div className="filtration-panel__elements">
                    <SelectPanel elements={tags} selectedElements={selectedTags} setSelectedElements={setSelectedTags} title="Тэги" />
                    <SelectPanel elements={developers} selectedElements={selectedDevelopers} setSelectedElements={setSelectedDevelopers} title="Разработчики" />
                </div>
            </div>
        </div>
    )
}

export default FiltrationPanel

const SelectPanel = ({elements, selectedElements, setSelectedElements, title}) => {
    const [isOpen, setIsOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")

    const handleSelect = (id) => {
        if (selectedElements.includes(id)) {
            setSelectedElements(selectedElements.filter((element) => element !== id))
        } else {
            setSelectedElements([...selectedElements, id])
        }
    }

    const filteredElements = elements.filter((element) =>
        element.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className={`select-panel ${isOpen ? "open" : ""}`}>
            <div 
                className="select-panel__header"
                onClick={() => setIsOpen(!isOpen)}
            >
                <h2>{title}</h2>
                <img 
                    src={arrowDown} 
                    alt=""
                    className={isOpen ? "rotate-icon" : ""} />
            </div>

            {isOpen && (
                <div className="select-panel__elements">
                    <input
                        type="text"
                        className="select-panel__search"
                        placeholder="Поиск..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {filteredElements.map((element) => (
                        <div
                            key={element.id}
                            className="select-panel__element"
                            onClick={() => handleSelect(element.id)} 
                        >
                            <p>{element.name}</p>
                            {selectedElements.includes(element.id) && <img src={yesIcon} alt="" />}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}