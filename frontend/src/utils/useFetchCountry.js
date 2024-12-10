import { useContext } from "react"
import axios from "axios"
import { jwtDecode } from "jwt-decode"

import { API_URL } from "../main"

const useFetchCountry = async (numeric_code) => {
    const authTokens = jwtDecode(localStorage.getItem('authTokens'))

    const response = await axios.get(`${API_URL}/currency/country/get/${numeric_code}`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authTokens.access}`
        }
    })
    print(response)

    if (!response.ok) {
        throw new Error(`Ошибка обращения к country/get: ${response.status}`);
    }

    const data = await response.json()
    return data
}

export default useFetchCountry