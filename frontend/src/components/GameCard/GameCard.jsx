import { useNavigate, useParams } from "react-router-dom";
import "./GameCard.css";
import ImageWithFallback from "../Common/ImageWithFallback";

const GameCard = ({ game, currency, symbol }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const onClick = () => {
    navigate(`/user/id/${id}/game/id/${game.id}`);
  };

  const formatPrice = (priceInCents) => {
    if (priceInCents === 0) {
      return "Free";
    }

    const price = (priceInCents * currency.rate) / 100;
    const fractionalPart = price % 1;
    const roundedFraction = fractionalPart <= 0.49 ? 0.49 : 0.99;
    const finalPrice = Math.floor(price) + roundedFraction;

    return finalPrice.toFixed(2);
  };

  const price = formatPrice(game.price_in_cents);

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
