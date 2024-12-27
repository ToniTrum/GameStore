import {CardElement, useElements, useStripe} from "@stripe/react-stripe-js"
import {useState, useContext} from "react"

import useAxios from "../../utils/useAxios"
import AuthContext from "../../context/AuthContext"

import "./PaymentForm.css"

const PaymentForm = () => {
    const api = useAxios()
    const stripe = useStripe()
    const elements = useElements()
    const {user} = useContext(AuthContext)

    const [error, setError] = useState(null)

    const handleChange = (event) => {
        if (event.error) {
            setError(event.error.message)
        } else {
            setError(null)
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const card = elements.getElement(CardElement)

        const {paymentMethod, error} = await stripe.createPaymentMethod({
            type: 'card',
            card: card
        })

        await api.post('/payments/save_stripe_info/', {
            email: user.email, 
            payment_method_id: paymentMethod.id
        }).then(response => {
            console.log(response.data);
        }).catch(error => {
            console.log(error)
        })
    }

    return (
    <form onSubmit={handleSubmit} className="stripe-form">
        <div className="form-row">
            <label for="card-element">Данные карты</label>
            <CardElement id="card-element" onChange={handleChange}/>
            <div className="card-errors" role="alert">{error}</div>
        </div>

        <button type="submit" className="submit-btn">
            Оплатить
        </button>
    </form>
    )
}

export default PaymentForm