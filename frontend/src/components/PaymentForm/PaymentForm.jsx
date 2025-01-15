import {CardNumberElement, CardExpiryElement, CardCvcElement, useElements, useStripe} from "@stripe/react-stripe-js";
import {useState, useContext} from "react";
import { useNavigate } from "react-router-dom";

import useAxios from "../../utils/useAxios";
import AuthContext from "../../context/AuthContext";

import "./PaymentForm.css";

const PaymentForm = ({ game }) => {
    const api = useAxios()
    const navigate = useNavigate()
    const stripe = useStripe()
    const elements = useElements()
    const {user} = useContext(AuthContext)

    const handleSubmit = async (event) => {
        event.preventDefault()
        const cardNumber = elements.getElement(CardNumberElement)

        const {paymentMethod, error} = await stripe.createPaymentMethod({
            type: 'card',
            card: cardNumber
        })
        console.log(paymentMethod)

        await api.post('/payments/save_stripe_info/', {
            email: user.email,
            payment_method_id: paymentMethod.id,
            price: game.price_in_cents
        }).then(response => {
            console.log(response.data)
        }).catch(error => {
            console.log(error)
        })

        await api.post(`library/library/add/${user.user_id}/${game.id}/`)
            .then(response => {
                console.log(response.data)
            })
            .catch(error => {
                console.log(error)
            })

        navigate(`/user/id/${user.user_id}/`)
    }

    return (
        <form onSubmit={handleSubmit} className="stripe-form">
            <div className="card-panel">
                <h1>Введите данные карты</h1>
                <div className="card-form-container">
                    <CardFormElement CardComponent={CardNumberElement} label={"Номер карты"} />
                    <div className="card-form-row">
                        <CardFormElement CardComponent={CardExpiryElement} label={"Срок действия"} />
                        <CardFormElement CardComponent={CardCvcElement} label={"CVC"} />
                    </div>
                </div>
            </div>

            <button type="submit" className="submit-btn">
                Оформить заказ
            </button>
        </form>
    )
}

export default PaymentForm

const CardFormElement = ({ CardComponent, label }) => {
    const cardElementOptions = {
        style: {
            base: {
                color: 'whitesmoke',
                fontSmoothing: 'antialiased',
                fontSize: '1.5rem',
                '::placeholder': {
                    color: '#aab7c4', // Цвет плейсхолдера
                },
            },
        },
    }

    const [error, setError] = useState(null)

    const handleChange = (event) => {
        if (event.error) {
            setError(event.error.message)
        } else {
            setError(null)
        }
    }

    return (
        <div className="card-container">
            <h2>{label}</h2>
            <div className="card-field">
                <CardComponent options={cardElementOptions} onChange={handleChange}/>
            </div>
            <div 
                className={`card-errors${error ? ' visible' : ''}`}
                role="alert"
                >
                    {error}
            </div>
        </div>
    )
}