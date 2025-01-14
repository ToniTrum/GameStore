import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"

import { API_URL } from "../../main"
import useCountryAndCurrency from "../../utils/useFetchCountryAndCurrency"

import FiltrationPanel from "../FiltrationPanel/FiltrationPanel"
import GameCard from "../GameCard/GameCard"
import PaginationButtons from "../PaginationButtons/PaginationButtons"

import "./StorePage.css"

const StorePage = () => {
    const navigate = useNavigate()
    const {userCountry, countryCurrency} = useCountryAndCurrency()
    const { id, pageNumber } = useParams()

    const [games, setGames] = useState([])
    const [totalPages, setTotalPages] = useState(1)

    useEffect(() => {
        const fetchGames = async () => {
            try 
            {
                const response = await fetch(`${API_URL}/games/games/get/${id}/?page=${pageNumber}`, {
                    method: 'GET',
                    credentials: 'include',
                })
                const data = await response.json()

                setTotalPages(data.total_pages)
                setGames(data.results)
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
            navigate(`/user/id/${id}/store/page/${page}`)
            scrollToTop()
        }
    }

    return (
        <section className="store">
            <FiltrationPanel />

            <div className="store__games">
                {games.map((game) => (
                    <GameCard 
                        key={game.id} 
                        game={game} 
                        currency={countryCurrency} 
                        symbol={userCountry.currency_symbol} 
                    /> 
                ))}
            </div>

            <PaginationButtons 
                changePage={changePage}
                pageNumber={pageNumber}
                totalPages={totalPages} />
        </section>
    )
}

export default StorePage