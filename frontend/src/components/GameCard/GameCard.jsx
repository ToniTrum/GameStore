import "./GameCard.css"

const GameCard = ({game, currency, symbol}) => {
    const genres = []
    for (let i = 0; i < game.genres.length; i++) {
        const genre = fetch(`${API_URL}/genres/${game.genres[i]}/`,{method: 'GET'})
            .then(response => response.json())
            .then(data => genres.push(data.name))
    }

    const price = game.price_in_cents * currency.rate / 100

    return(
        <div className="game-card">
            <img className="game-card__image" src={game.background_image} alt={game.name} />
            <div className="game-card__info">
                <h1 className="game-card__title">{game.name}</h1>

                <h1 className="game-card__price">{`${price} ${symbol}`}</h1>
            </div>
        </div>
    )
}

export default GameCard