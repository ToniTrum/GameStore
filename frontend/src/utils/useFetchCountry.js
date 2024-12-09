import { useContext } from "react"

import { API_URL } from "../main"
import AuthContext from "../context/AuthContext"

const useFetchCountry = async (numeric_code) => {
    const token = localStorage.getItem("authTokens")

    response = await fetch(`${API_URL}/currency/country/get/${numeric_code}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        Authorization: `Bearer ${token.access}`,
    })
    print(response)

    if (!response.ok) {
        throw new Error(`Ошибка обращения к country/get: ${response.status}`);
    }

    const data = await response.json()
    return data
}

export default useFetchCountry