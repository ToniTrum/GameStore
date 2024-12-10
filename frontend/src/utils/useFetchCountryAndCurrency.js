import { useState, useEffect, useContext } from "react";
import axios from "axios";

import { API_URL } from "../main";
import AuthContext from "../context/AuthContext";

const useFetchCountryAndCurrency = () => {
    const { user } = useContext(AuthContext)

    const [userCountry, setUserCountry] = useState({})
    const [countryCurrency, setCountryCurrency] = useState({})
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchCountry = async () => {
            try 
            {
                const responseCountry = await axios.get(`${API_URL}/currency/country/get/${user.country}`)
                setUserCountry(responseCountry.data)
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

        if (user?.country) 
        {
            fetchCountry()
        }
    }, [user?.country])

    useEffect(() => {
        const fetchCurrency = async () => {
            try 
            {
                if (userCountry?.currency) 
                {
                    const responseCurrency = await axios.get(`${API_URL}/currency/currency_rates/get/${userCountry.currency}`)
                    setCountryCurrency(responseCurrency.data)
                }
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

        fetchCurrency();
    }, [userCountry?.currency])

    return { userCountry, countryCurrency, error, loading }
}

export default useFetchCountryAndCurrency