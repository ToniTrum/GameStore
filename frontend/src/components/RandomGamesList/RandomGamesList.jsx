const RandomGamesList = ({games}) => {
    return (
        <div>
            {games.map((game) => (
                <div key={game.id}>
                    <h2>{game.name}</h2>
                    <p>{game.description}</p>
                    <img src={game.image} alt={game.title} />
                </div>
            ))}
        </div>
    )
}