import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

import arrowDown from "../../assets/img/down-arrow.svg"
import yesIcon from "../../assets/img/yes.svg"

import './FiltrationPanel.css'

import { API_URL } from "../../main"

const FiltrationPanel = ({setGames, setTotalPages}) => {
    const { id, pageNumber } = useParams()

    const [isStored, setIsStored] = useState(false)

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
        const fetchData = async () => {
            try {
                const [platformsData, genresData, tagsData, developersData] = await Promise.all([
                    fetch(`${API_URL}/games/platform/`).then((res) => res.json()),
                    fetch(`${API_URL}/games/genre/`).then((res) => res.json()),
                    fetch(`${API_URL}/games/tag/`).then((res) => res.json()),
                    fetch(`${API_URL}/games/developer/`).then((res) => res.json()),
                ]);
                setPlatforms(platformsData)
                setGenres(genresData)
                setTags(tagsData)
                setDevelopers(developersData)
            } catch (error) {
                console.error(error)
            }
        }
    
        fetchData()
    }, [])

    const onClick = async () => {
        localStorage.setItem("name", JSON.stringify(""))
        localStorage.setItem("platforms", JSON.stringify([]))
        localStorage.setItem("genres", JSON.stringify([]))
        localStorage.setItem("tags", JSON.stringify([]))
        localStorage.setItem("developers", JSON.stringify([]))

        setName("")
        setSelectedPlatforms([])
        setSelectedGenres([])
        setSelectedTags([])
        setSelectedDevelopers([])
    }

    useEffect(() => {
        if (localStorage.getItem("platforms")) {
            const savedPlatforms = JSON.parse(localStorage.getItem("platforms"))
            setSelectedPlatforms(savedPlatforms)
        }
        if (localStorage.getItem("genres")) {
            const savedGenres = JSON.parse(localStorage.getItem("genres"))
            setSelectedGenres(savedGenres)
        }
        if (localStorage.getItem("tags")) {
            const savedTags = JSON.parse(localStorage.getItem("tags"))
            setSelectedTags(savedTags)
        }
        if (localStorage.getItem("developers")) {
            const savedDevelopers = JSON.parse(localStorage.getItem("developers"))
            setSelectedDevelopers(savedDevelopers)
        }
        if (localStorage.getItem("name")) {
            const savedName = JSON.parse(localStorage.getItem("name"))
            setName(savedName)
        }

        setIsStored(true)
    }, [])

    useEffect(() => {
        if (!isStored) return

        const fetchGames = async () => {
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
            setTotalPages(data.total_pages)
            setGames(data.results)
        }

        fetchGames()
    }, [pageNumber, selectedPlatforms, selectedGenres, selectedTags, selectedDevelopers, name])

    const onChange = (value) => {
        setName(value)
        localStorage.setItem("name", JSON.stringify(value))
    }

    return (
        <div className="filtration-panel">
            <div className="filtration-panel__part">
                <input
                    type="text"
                    placeholder="Название..."
                    value={name}
                    onChange={(e) => onChange(e.target.value)}
                />
                <button onClick={onClick}>Сбросить</button>
            </div>
            
            <div className="filtration-panel__part">
                <div className="filtration-panel__elements">
                    <SelectPanel elements={platforms} selectedElements={selectedPlatforms} setSelectedElements={setSelectedPlatforms} title="Платформы" localName={"platforms"} />
                    <SelectPanel elements={genres} selectedElements={selectedGenres} setSelectedElements={setSelectedGenres} title="Жанры" localName={"genres"} />
                </div>
                <div className="filtration-panel__elements">
                    <SelectPanel elements={tags} selectedElements={selectedTags} setSelectedElements={setSelectedTags} title="Тэги" localName={"tags"} />
                    <SelectPanel elements={developers} selectedElements={selectedDevelopers} setSelectedElements={setSelectedDevelopers} title="Разработчики" localName={"developers"} />
                </div>
            </div>
        </div>
    )
}

export default FiltrationPanel

const SelectPanel = ({elements, selectedElements, setSelectedElements, title, localName}) => {
    const [isOpen, setIsOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")

    const handleSelect = (id) => {
        let updatedElements
        if (selectedElements.includes(id)) {
            updatedElements = selectedElements.filter((element) => element !== id)
        } else {
            updatedElements = [...selectedElements, id]
        }
        setSelectedElements(updatedElements)
        localStorage.setItem(localName, JSON.stringify(updatedElements))
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