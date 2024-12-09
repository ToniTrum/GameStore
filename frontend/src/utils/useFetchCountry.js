import { useContext } from "react"

import { API_URL } from "../main"
import AuthContext from "../context/AuthContext"

const useFetchCountry = async (numeric_code) => {
    response = await fetch(`${API_URL}/currency/country/get/${numeric_code}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    print(response)

    if (!response.ok) {
        throw new Error(`Ошибка обращения к country/get: ${response.status}`);
    }

    const data = await response.json()
    return data
}

export default useFetchCountry