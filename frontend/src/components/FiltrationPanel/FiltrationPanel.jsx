import { useState, useEffect } from "react"

import arrowDown from "../../assets/img/down-arrow.svg"
import yesIcon from "../../assets/img/yes.svg"

import './FiltrationPanel.css'

import { API_URL } from "../../main";

const FiltrationPanel = () => {
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

    return (
        <div className="filtration-panel">
            <input
                type="text"
                placeholder="Название..."
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            
            <div className="filtration-panel__elements">
                <SelectPanel elements={platforms} selectedElements={selectedPlatforms} setSelectedElements={setSelectedPlatforms} title="Платформы" />
                <SelectPanel elements={genres} selectedElements={selectedGenres} setSelectedElements={setSelectedGenres} title="Жанры" />
            </div>
        </div>
    )
}

export default FiltrationPanel

const SelectPanel = ({elements, selectedElements, setSelectedElements, title}) => {
    const [isOpen, setIsOpen] = useState(false)

    const handleSelect = (id) => {
        if (selectedElements.includes(id)) {
            setSelectedElements(selectedElements.filter((element) => element !== id))
        } else {
            setSelectedElements([...selectedElements, id])
        }
    }

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
                    {elements.map((element) => (
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