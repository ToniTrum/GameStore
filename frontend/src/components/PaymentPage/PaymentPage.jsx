import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js/pure";
import { useLocation } from "react-router-dom";

import useFetchCountryAndCurrency from "../../utils/useFetchCountryAndCurrency";

import PaymentForm from "./PaymentForm/PaymentForm";
import ProfileItem from "../ProfileItem/ProfileItem";

import "./PaymentPage.css";

const stripePromise = loadStripe(
  "pk_test_51QaWj8L7bbq6rfGO6je7d1LFWRQH3VqyC0G6sRVYCr09trrFRUlaou2O6d9n5eVZ0XAJLl96ERh4Mrg9OHPobcM900n1tpx8pU"
);

const PaymentPage = () => {
  const location = useLocation();
  const game = location.state.game;

  return (
    <section className="payment-section">
      <GameInfo game={game} />
      <UserAgreement />

      <Elements stripe={stripePromise}>
        <PaymentForm game={game} />
      </Elements>
    </section>
  );
};

export default PaymentPage;

const GameInfo = ({ game }) => {
  const { userCountry, countryCurrency } = useFetchCountryAndCurrency();
  const formatPrice = (priceInCents) => {
    if (priceInCents === 0) {
      return "Free";
    }
    const price = (priceInCents * countryCurrency.rate) / 100;
    const fractionalPart = price % 1;
    const roundedFraction = fractionalPart <= 0.49 ? 0.49 : 0.99;
    const finalPrice = Math.floor(price) + roundedFraction;
    return finalPrice.toFixed(2);
  };
  const gamePrice = formatPrice(game.price_in_cents);

  return (
    <div className="product-info">
      <h1>Товар:</h1>

      <div className="game-info-check">
        <img
          className="game-info-check__image"
          src={game.background_image}
          alt={game.name}
          loading="lazy"
        />

        <ul className="game-info-check__list">
          <ProfileItem paragraph="Название" value={game.name} />
          <ProfileItem
            paragraph={"Цена"}
            value={
              gamePrice === "Free"
                ? gamePrice
                : `${gamePrice} ${userCountry.currency_symbol}`
            }
          />
          <ProfileItem
            paragraph="Цена в долларах"
            value={`${game.price_in_cents / 100} $`}
          />
        </ul>
      </div>
    </div>
  );
};

const UserAgreement = () => {
  return (
    <div className="user-agreement">
      <h2>Пользовательское соглашение</h2>
      <br />
      <br />

      <p>
        Вы приобретаете цифровую лицензию на этот продукт.
        <br />
        <br />
        Нажимая на кнопку "Оформить заказ" ниже, вы даёте согласие на обработку
        персональных данных и поддтверждаете, что являетесь авторизованным
        пользователем данного метода оплаты.
      </p>
    </div>
  );
};
