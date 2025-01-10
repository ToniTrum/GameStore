import { useNavigate, useParams } from "react-router-dom";
import "./GameCard.css";
import ImageWithFallback from "../Common/ImageWithFallback";

const GameCard = ({ game, currency, symbol }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const onClick = () => {
    navigate(`/user/id/${id}/game/id/${game.id}`);
  };

  const price =
    game.price_in_cents === 0
      ? "Free"
      : ((game.price_in_cents * currency.rate) / 100).toFixed(2);

  return (
    <div onClick={onClick} className="game-card">
      <ImageWithFallback
        src={game.background_image}
        alt={game.name}
        className="game-card__image"
      />
      <div className="game-card__info">
        <h1 className="game-card__title">{game.name}</h1>
        <h1 className="game-card__price">
          {price === "Free" ? price : `${price} ${symbol}`}
        </h1>
      </div>
    </div>
  );
};

export default GameCard;