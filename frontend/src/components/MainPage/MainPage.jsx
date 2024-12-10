import {Outlet} from "react-router-dom"

import useFetchCountryAndCurrency from "../../utils/useFetchCountryAndCurrency"
import { CountryAndCurrencyProvider } from "../../context/CountryAndCurrencyContext"

const MainPage = () => {
    const { userCountry, countryCurrency, error, loading } = useFetchCountryAndCurrency()

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error.message}</p>

    const contextValue = { userCountry, countryCurrency }

    return (
        <CountryAndCurrencyProvider value={contextValue}>
            <main>
                <Outlet />
            </main>
        </CountryAndCurrencyProvider>
    )
}

export default MainPage