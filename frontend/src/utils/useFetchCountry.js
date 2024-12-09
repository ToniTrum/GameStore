import { API_URL } from "../main"

const useFetchCountry = async (numeric_code) => {
    response = await fetch(API_URL + "/currency/country/" + numeric_code, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })

    const data = await response.json()
    return data
}

export default useFetchCountry