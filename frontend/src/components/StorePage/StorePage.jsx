import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

import { API_URL } from "../../main"
import useCountryAndCurrency from "../../utils/useFetchCountryAndCurrency"

import PaginationButtons from "../PaginationButtons/PaginationButtons"

import "./StorePage.css"

const StorePage = () => {
    const {userCountry, countryCurrency} = useCountryAndCurrency()
    const { id } = useParams()

    const [currentPage, setCurrentPage] = useState(1)
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
            <PaginationButtons 
                currentPage={currentPage} 
                setCurrentPage={setCurrentPage}
                totalPages={100} />
        </section>
    )
}

export default StorePage