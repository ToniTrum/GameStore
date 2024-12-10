import { useState, useEffect, useContext } from "react";
import axios from "axios";

import { API_URL } from "../main";
import AuthContext from "../context/AuthContext";

const useFetchCountry = () => {
    const { user } = useContext(AuthContext)

    const [userCountry, setUserCountry] = useState({})
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try 
            {
                const response = await axios.get(`${API_URL}/currency/country/get/${user.country}`)
                setUserCountry(response.data)
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
            fetchData()
        }
    }, [user?.country])

    return { data: userCountry, error, loading }
}

export default useFetchCountry