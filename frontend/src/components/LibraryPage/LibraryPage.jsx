import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"

import { API_URL } from "../../main"
import useCountryAndCurrency from "../../utils/useFetchCountryAndCurrency"
import useAxios from "../../utils/useAxios"

import GameCard from "../GameCard/GameCard"
import PaginationButtons from "../PaginationButtons/PaginationButtons"

import "./LibraryPage.css"

const LibraryPage = () => {
    const navigate = useNavigate()
    const api = useAxios()
    const {userCountry, countryCurrency} = useCountryAndCurrency()
    const { id, pageNumber } = useParams()

    const [games, setGames] = useState([])
    const [totalPages, setTotalPages] = useState(1)

    useEffect(() => {
        const fetchGames = async () => {
            try 
            {
                const response = await api.get(`library/library/get/${id}/?page=${pageNumber}`)
                setTotalPages(response.data.total_pages)
                setGames(response.data.results)
            } 
            catch (error) 
            {
                console.error(error)
            }
        }

        fetchGames()
    }, [pageNumber])

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        })
    }

    const changePage = (page) => {
        page = parseInt(page)
        if (page > 0 && page <= totalPages) {
            navigate(`/user/id/${id}/library/page/${page}`)
            scrollToTop()
        }
    }

    return (
        <section className="store">
            <div className="store__games">
                {games.map((game) => (
                    <GameCard
                        key={game.id} 
                        game={game}
                        currency={countryCurrency} 
                        symbol={userCountry.currency_symbol} 
                    /> 
                ))}
                {games.length === 0 && <h2 className="store__no-games">В вашей библиотеке нет игр</h2>}
            </div>

            <PaginationButtons 
                changePage={changePage}
                pageNumber={pageNumber}
                totalPages={totalPages} />
        </section>
    )
}

export default LibraryPage