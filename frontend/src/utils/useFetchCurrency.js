import { useState, useEffect } from "react"

import axios from "axios"

const useFetchCurrency = (userCountry) => {
    const [userCurrency, setUserCurrency] = useState({})
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try 
            {
                const response = await axios.get(`${API_URL}/currency/currency_rates/get/${userCountry.currency}`)
                setUserCurrency(response.data)
            } 
            catch (err) 
            {
                setError(err)
            }
            finally 
            {
                setLoading(false)
            }
        }

        if (userCountry?.currency) {
            fetchData()
        }
    }, [userCountry?.currency])

    return { userCurrency, error, loading }
}

export default useFetchCurrency