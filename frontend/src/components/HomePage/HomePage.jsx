import { useContext, useState } from "react";
import { useParams } from "react-router-dom";

import RandomGamesList from "./RandomGamesList/RandomGamesList";
import AuthContext from "../../context/AuthContext";
import "./HomePage.css";
import { useCountryAndCurrency } from "../../context/CountryAndCurrencyContext";
import useAxios from "../../utils/useAxios";

const HomePage = () => {
  const api = useAxios();
  const { id } = useParams();

  const { user } = useContext(AuthContext);
  const { userCountry, countryCurrency } = useCountryAndCurrency();
  const [isSubscribed, setIsSubscribed] = useState(user.subscribed);

  const onClickSubscribe = async () => {
    await api.put(`/users/subscribe/${id}/`);
    setIsSubscribed((prev) => !prev);
  };

  return (
    <section className="home-section">
      <h1 className="home-title">
        Добро пожаловать, <span className="white">{user.username}</span>
      </h1>

      <RandomGamesList
        currency={countryCurrency}
        symbol={userCountry.currency_symbol}
      />

      <div className="home-subscribe">
        {!isSubscribed ? (
          <h2>
            <span className="subscribe-link" onClick={onClickSubscribe}>
              Подпишитесь на рассылку
            </span>
            , чтобы каждый день получать информацию о новых играх!
          </h2>
        ) : (
          <h2>
            Вы подписаны на рассылку!{" "}
            <span className="subscribe-link" onClick={onClickSubscribe}>
              Отписаться
            </span>
          </h2>
        )}
      </div>
    </section>
  );
};

export default HomePage;
